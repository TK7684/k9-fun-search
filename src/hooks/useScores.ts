import { useState, useCallback, useMemo } from 'react';
import type { Score, VPState, AttireState, BonusState, Settings, MergedDog, VPDetail } from '../types';
import { calculateLiveScore } from '../utils/scoring';
import { safeParse, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'k9_scores';

export function useScores() {
  const [scores, setScores] = useState<Score[]>(() => safeParse<Score[]>(STORAGE_KEY) ?? []);

  const persist = (next: Score[]) => {
    setScores(next);
    saveToStorage(STORAGE_KEY, next);
  };

  const saveScore = useCallback(
    (
      dog: MergedDog,
      vpState: VPState,
      attire: AttireState,
      bonus: BonusState,
      settings: Settings,
      timeInSeconds: number,
      notes: string,
    ): Score => {
      const breakdown = calculateLiveScore(vpState, attire, bonus, settings);

      const gradePercentages: Record<string, number> = {
        V: settings.gradeV / 100,
        SG: settings.gradeSG / 100,
        G: settings.gradeG / 100,
        B: settings.gradeB / 100,
        M: settings.gradeM / 100,
      };

      const vpPoints: Record<number, number> = {
        1: settings.vp1Points,
        2: settings.vp2Points,
        3: settings.vp3Points,
      };

      const vpDetails: Record<string, VPDetail> = {};
      for (let i = 1; i <= 3; i++) {
        const vp = vpState[i as 1 | 2 | 3];
        const earnedScore = vp.found ? (vpPoints[i] ?? 0) * (gradePercentages[vp.grade] ?? 0) : 0;
        vpDetails[i] = { found: vp.found, grade: vp.grade, score: earnedScore };
      }

      const scoreRecord: Score = {
        id: Date.now(),
        dogId: dog.id,
        dogName: dog.dogName,
        dogBreed: dog.dogBreed,
        handlerName: dog.handlerName,
        vpDetails,
        vpScore: breakdown.vpScore,
        attireScore: breakdown.attireScore,
        bonusScore: breakdown.bonusScore,
        totalScore: breakdown.totalScore,
        timeInSeconds,
        notes,
        scoredAt: new Date().toISOString(),
      };

      persist([...scores, scoreRecord]);
      return scoreRecord;
    },
    [scores],
  );

  const editScore = useCallback(
    (id: number, updates: Partial<Pick<Score, 'vpScore' | 'attireScore' | 'bonusScore' | 'timeInSeconds' | 'notes'>>) => {
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
        attireScore: updates.attireScore ?? existing.attireScore,
        bonusScore: updates.bonusScore ?? existing.bonusScore,
        timeInSeconds: updates.timeInSeconds ?? existing.timeInSeconds,
        notes: updates.notes ?? existing.notes,
        totalScore: (updates.vpScore ?? existing.vpScore) + (updates.attireScore ?? existing.attireScore) + (updates.bonusScore ?? existing.bonusScore),
      };

      const next = [...scores];
      next[idx] = updated;
      persist(next);
    },
    [scores],
  );

  const deleteScoreWithUndo = useCallback(
    (id: number) => {
      const score = scores.find((s) => s.id === id);
      if (!score) return null;

      const updated = scores.filter((s) => s.id !== id);
      persist(updated);

      return {
        score,
        undo: () => persist([...updated, score]),
      };
    },
    [scores],
  );

  const deleteScoresByDogId = useCallback(
    (dogId: number | string) => {
      const removed = scores.filter((s) => s.dogId === dogId);
      const updated = scores.filter((s) => s.dogId !== dogId);
      persist(updated);

      return {
        removed,
        undo: () => persist([...updated, ...removed]),
      };
    },
    [scores],
  );

  const clearAll = useCallback(() => {
    const prev = scores;
    persist([]);
    return {
      undo: () => persist(prev),
    };
  }, [scores]);

  const getSortedScores = useCallback(
    () =>
      [...scores].sort((a, b) => {
        if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
        return a.timeInSeconds - b.timeInSeconds;
      }),
    [scores],
  );

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
    getSortedScores,
    scoredDogIds,
  };
}
