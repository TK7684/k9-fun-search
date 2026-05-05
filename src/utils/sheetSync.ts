import type { Score } from '../types';
import { SCORES_SHEET_URL } from './constants';

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

export async function appendScoreToSheet(score: Score): Promise<void> {
  await postToSheet({ action: 'append', row: scoreToRow(score) });
}

export async function syncScoresToSheet(scores: Score[]): Promise<void> {
  const rows = scores.map(scoreToRow);
  await postToSheet({ action: 'sync', rows });
}

export async function clearSheetScores(): Promise<void> {
  await postToSheet({ action: 'clear' });
}
