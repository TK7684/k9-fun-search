import type { VPState, BonusState, ScoreBreakdown } from '../types';

// Fixed point lookup table from official scoring guide
// [VP1 max 20, VP2 max 30, VP3 max 40]
const GRADE_VP_POINTS: Record<string, [number, number, number]> = {
  'V':   [20, 30, 40],
  'V-':  [19.5, 29, 39],
  'SG+': [19, 28.5, 38],
  'SG':  [18.5, 28, 37],
  'SG-': [18, 27, 36],
  'G+':  [17.5, 26, 35],
  'G':   [17, 25, 34],
  'G-':  [16, 24, 32],
  'B+':  [15.5, 23, 31],
  'B':   [15, 22, 30],
  'B-':  [14, 21, 28],
  'M+':  [13.5, 20.5, 27],
  'M-':  [0, 0, 0],
};

const DOWN_BONUS = 5;

export function getGradeVpPoints(grade: string, vpNum: 1 | 2 | 3): number {
  const points = GRADE_VP_POINTS[grade];
  if (!points) return 0;
  return points[vpNum - 1] ?? 0;
}

export function getTimeBonus(timeInSeconds: number): number {
  if (timeInSeconds <= 120) return 10;   // 0-2 min
  if (timeInSeconds <= 240) return 2.5;  // 3-4 min
  return 0;
}

export function calculateLiveScore(
  vpState: VPState,
  bonus: BonusState,
  timeInSeconds: number,
): ScoreBreakdown {
  let vpScore = 0;
  for (let i = 1; i <= 3; i++) {
    const vp = vpState[i as 1 | 2 | 3];
    if (vp.found) {
      vpScore += getGradeVpPoints(vp.grade, i as 1 | 2 | 3);
    }
  }

  const timeBonus = getTimeBonus(timeInSeconds);
  const bonusScore = bonus.down ? DOWN_BONUS : 0;
  const totalScore = vpScore + timeBonus + bonusScore;

  return { vpScore, timeBonus, bonusScore, totalScore };
}
