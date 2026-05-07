import { useState, useCallback, useMemo, useRef } from 'react';
import type { Score, VPState, AttireState, BonusState, MergedDog, VPDetail } from '../types';
import { calculateLiveScore, getGradeVpPoints, sortScores } from '../utils/scoring';
import { safeParse, saveToStorage, getSyncQueue } from '../utils/storage';
import { appendScoreToSheet, syncScoresToSheet, clearSheetScores, processSyncQueue } from '../utils/sheetSync';

const STORAGE_KEY = 'k9_scores';

export function useScores() {
  const [scores, setScores] = useState<Score[]>(() => safeParse<Score[]>(STORAGE_KEY) ?? []);
  const syncErrorRef = useRef<((msg: string) => void) | null>(null);
  const [pendingSyncs, setPendingSyncs] = useState(() => getSyncQueue().length);

  const persist = (next: Score[]) => {
    setScores(next);
    saveToStorage(STORAGE_KEY, next);
  };

  const setSyncErrorHandler = useCallback((handler: (msg: string) => void) => {
    syncErrorRef.current = handler;
  }, []);

  const handleSyncError = (err: unknown) => {
    console.error('Sheet sync failed:', err);
    syncErrorRef.current?.('ซิงค์ไป Google Sheet ไม่สำเร็จ');
    setPendingSyncs(getSyncQueue().length);
  };

  const saveScore = useCallback(
    (
      dog: MergedDog,
      vpState: VPState,
      attire: AttireState,
      bonus: BonusState,
      timeInSeconds: number,
      notes: string,
    ): Score => {
      const vpDetails: Record<string, VPDetail> = {};
      for (let i = 1; i <= 3; i++) {
        const vp = vpState[i as 1 | 2 | 3];
        const earnedScore = vp.found ? getGradeVpPoints(vp.grade, i as 1 | 2 | 3) : 0;
        vpDetails[i] = { found: vp.found, grade: vp.grade, score: earnedScore };
      }

      const breakdown = calculateLiveScore(vpState, attire, bonus);

      const scoreRecord: Score = {
        id: Date.now(),
        dogId: dog.id,
        dogName: dog.dogName,
        dogBreed: dog.dogBreed,
        handlerName: dog.handlerName,
        vpDetails,
        vpScore: breakdown.vpScore,
        attireScore: breakdown.attireScore,
        timeBonus: breakdown.timeBonus,
        bonusScore: breakdown.bonusScore,
        totalScore: breakdown.totalScore,
        timeInSeconds,
        notes,
        scoredAt: new Date().toISOString(),
      };

      const next = [...scores, scoreRecord];
      persist(next);

      appendScoreToSheet(scoreRecord).catch(handleSyncError);

      return scoreRecord;
    },
    [scores],
  );

  const editScore = useCallback(
    (id: number, updates: Partial<Pick<Score, 'vpScore' | 'bonusScore' | 'timeInSeconds' | 'notes'>>) => {
      const idx = scores.findIndex((s) => s.id === id);
      if (idx === -1) return;

      const existing = scores[idx]!;

      const updated: Score = {
        id: existing.id,
        dogId: existing.dogId,
        dogName: existing.dogName,
        dogBreed: existing.dogBreed,
        handlerName: existing.handlerName,
        vpDetails: existing.vpDetails,
        scoredAt: existing.scoredAt,
        vpScore: updates.vpScore ?? existing.vpScore,
        attireScore: existing.attireScore ?? 0,
        timeBonus: existing.timeBonus ?? 0,
        bonusScore: updates.bonusScore ?? existing.bonusScore,
        timeInSeconds: updates.timeInSeconds ?? existing.timeInSeconds,
        notes: updates.notes ?? existing.notes,
        totalScore: (updates.vpScore ?? existing.vpScore) + (existing.attireScore ?? 0) + (existing.timeBonus ?? 0) + (updates.bonusScore ?? existing.bonusScore),
      };

      const next = [...scores];
      next[idx] = updated;
      persist(next);

      syncScoresToSheet(next).catch(handleSyncError);
    },
    [scores],
  );

  const deleteScoreWithUndo = useCallback(
    (id: number) => {
      const score = scores.find((s) => s.id === id);
      if (!score) return null;

      const updated = scores.filter((s) => s.id !== id);
      persist(updated);

      syncScoresToSheet(updated).catch(handleSyncError);

      return {
        score,
        undo: () => {
          const restored = [...updated, score];
          persist(restored);
          syncScoresToSheet(restored).catch(handleSyncError);
        },
      };
    },
    [scores],
  );

  const deleteScoresByDogId = useCallback(
    (dogId: number | string) => {
      const removed = scores.filter((s) => s.dogId === dogId);
      const updated = scores.filter((s) => s.dogId !== dogId);
      persist(updated);

      syncScoresToSheet(updated).catch(handleSyncError);

      return {
        removed,
        undo: () => {
          const restored = [...updated, ...removed];
          persist(restored);
          syncScoresToSheet(restored).catch(handleSyncError);
        },
      };
    },
    [scores],
  );

  const clearAll = useCallback(() => {
    const prev = scores;
    persist([]);

    clearSheetScores().catch(handleSyncError);

    return {
      undo: () => {
        persist(prev);
        syncScoresToSheet(prev).catch(handleSyncError);
      },
    };
  }, [scores]);

  const manualSync = useCallback(async () => {
    const result = await processSyncQueue();
    setPendingSyncs(getSyncQueue().length);
    return result;
  }, []);

  const setScoresWithUndo = useCallback(
    (newScores: Score[]) => {
      const prev = scores;
      persist(newScores);
      return { undo: () => persist(prev) };
    },
    [scores],
  );

  const getSortedScores = useCallback(() => sortScores(scores), [scores]);

  const scoredDogIds = useMemo(
    () => new Set(scores.map((s) => s.dogId)),
    [scores],
  );

  return {
    scores,
    saveScore,
    editScore,
    deleteScoreWithUndo,
    deleteScoresByDogId,
    clearAll,
    manualSync,
    setScoresWithUndo,
    setSyncErrorHandler,
    getSortedScores,
    scoredDogIds,
    hasPendingSyncs: pendingSyncs > 0,
    syncQueueLength: pendingSyncs,
  };
}
