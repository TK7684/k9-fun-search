import type { Score } from '../types';

export function exportCSV(scores: Score[]): void {
  if (scores.length === 0) return;

  const sortedScores = [...scores].sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    return a.timeInSeconds - b.timeInSeconds;
  });

  const header =
    '﻿' +
    'ลำดับ,สุนัข,สายพันธุ์,ผู้ควบคุม,VP1,VP2,VP3,การแต่งกาย,โบนัส,รวม,เวลา(นาที),หมายเหตุ\n';

  const rows = sortedScores
    .map((score, index) => {
      const minutes = (score.timeInSeconds / 60).toFixed(2);
      return (
        `${index + 1},"${score.dogName}","${score.dogBreed || '-'}","${score.handlerName}",` +
        `${score.vpDetails['1']?.score.toFixed(1) ?? '0.0'},${score.vpDetails['2']?.score.toFixed(1) ?? '0.0'},` +
        `${score.vpDetails['3']?.score.toFixed(1) ?? '0.0'},${score.attireScore},${score.bonusScore},` +
        `${score.totalScore.toFixed(1)},${minutes},"${score.notes || ''}"`
      );
    })
    .join('\n');

  const csv = header + rows;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `k9_scores_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}
