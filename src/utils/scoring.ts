import type { VPState, AttireState, BonusState, Settings, ScoreBreakdown } from '../types';

/**
 * Pure function that computes score breakdown from state objects.
 * No DOM reads. This is the single source of truth for score computation.
 */
export function calculateLiveScore(
  vpState: VPState,
  attire: AttireState,
  bonus: BonusState,
  settings: Settings,
): ScoreBreakdown {
  const vpPoints: Record<number, number> = {
    1: settings.vp1Points,
    2: settings.vp2Points,
    3: settings.vp3Points,
  };

  const gradePercentages: Record<string, number> = {
    V: settings.gradeV / 100,
    SG: settings.gradeSG / 100,
    G: settings.gradeG / 100,
    B: settings.gradeB / 100,
    M: settings.gradeM / 100,
  };

  let vpScore = 0;
  for (let i = 1; i <= 3; i++) {
    const vp = vpState[i as 1 | 2 | 3];
    if (vp.found) {
      const pct = gradePercentages[vp.grade] ?? 0;
      vpScore += (vpPoints[i] ?? 0) * pct;
    }
  }

  // Attire: required items (shoes, shirt, pants) + bonus items (hat, gloves)
  const requiredCount = [attire.shoes, attire.shirt, attire.pants].filter(Boolean).length;
  const bonusItemCount = [attire.hat, attire.gloves].filter(Boolean).length;

  let attireScore =
    requiredCount * settings.attireRequired + bonusItemCount * settings.attireBonus;
  if (attireScore > settings.attireMax) attireScore = settings.attireMax;

  // Bonus
  let bonusScore = 0;
  if (bonus.vp1) bonusScore += settings.bonusVp1;
  if (bonus.vp2) bonusScore += settings.bonusVp2;
  if (bonus.allFound) bonusScore += settings.bonusAll;
  if (bonus.down) bonusScore += settings.bonusDown;

  const totalScore = vpScore + attireScore + bonusScore;

  return { vpScore, attireScore, bonusScore, totalScore };
}
