import type { Score } from '../types';
import { SCORES_SHEET_URL } from './constants';
import { getSyncQueue, addToSyncQueue, removeFromSyncQueue, saveToStorage } from './storage';

const SYNC_QUEUE_KEY = 'k9_sync_queue';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function scoreToRow(score: Score): (string | number)[] {
  return [
    score.scoredAt,
    score.dogName,
    score.dogBreed,
    score.handlerName,
    score.vpDetails['1']?.score ?? 0,
    score.vpDetails['1']?.grade ?? '-',
    score.vpDetails['2']?.score ?? 0,
    score.vpDetails['2']?.grade ?? '-',
    score.vpDetails['3']?.score ?? 0,
    score.vpDetails['3']?.grade ?? '-',
    score.vpScore,
    score.attireScore ?? 0,
    score.timeBonus ?? 0,
    score.bonusScore,
    score.totalScore,
    score.timeInSeconds,
    formatTime(score.timeInSeconds),
    score.notes || '',
  ];
}

async function postToSheet(body: object): Promise<{ status: string }> {
  const res = await fetch(SCORES_SHEET_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function postToSheetWithRetry(body: object, maxRetries = 3): Promise<{ status: string }> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await postToSheet(body);
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
    }
  }
  throw new Error('unreachable');
}

export async function appendScoreToSheet(score: Score): Promise<void> {
  const body = { action: 'append', row: scoreToRow(score) };
  try {
    await postToSheetWithRetry(body);
  } catch {
    addToSyncQueue({ action: 'append', payload: body });
  }
}

export async function syncScoresToSheet(scores: Score[]): Promise<void> {
  const rows = scores.map(scoreToRow);
  const body = { action: 'sync', rows };
  try {
    await postToSheetWithRetry(body);
  } catch {
    addToSyncQueue({ action: 'sync', payload: body });
  }
}

export async function clearSheetScores(): Promise<void> {
  const body = { action: 'clear' };
  try {
    await postToSheetWithRetry(body);
  } catch {
    addToSyncQueue({ action: 'clear', payload: body });
  }
}

export async function processSyncQueue(): Promise<{ processed: number; failed: number }> {
  const queue = getSyncQueue();
  let processed = 0;
  let failed = 0;

  for (const entry of queue) {
    try {
      await postToSheetWithRetry(entry.payload as object);
      removeFromSyncQueue(entry.id);
      processed++;
    } catch {
      // Increment retry count
      const q = getSyncQueue();
      const idx = q.findIndex((e) => e.id === entry.id);
      if (idx >= 0) {
        q[idx]!.retryCount++;
        saveToStorage(SYNC_QUEUE_KEY, q);
      }
      failed++;
    }
  }
  return { processed, failed };
}
