interface StickyScoreBarProps {
  vpScore: number;
  timeBonus: number;
  bonusScore: number;
  totalScore: number;
}

export default function StickyScoreBar({
  vpScore,
  timeBonus,
  bonusScore,
  totalScore,
}: StickyScoreBarProps) {
  return (
    <div className="sticky-score-bar">
      <div className="sticky-score-info">
        <span className="sticky-label">คะแนนรวม</span>
        <span className="sticky-score-value">{totalScore.toFixed(1)}</span>
      </div>
      <div className="sticky-score-breakdown">
        <div className="breakdown-item">
          <span className="breakdown-icon">🎯</span>
          VP {vpScore.toFixed(1)}
        </div>
        <div className="breakdown-item">
          <span className="breakdown-icon">⏱️</span>
          {timeBonus}
        </div>
        <div className="breakdown-item">
          <span className="breakdown-icon">🐕</span>
          {bonusScore}
        </div>
      </div>
    </div>
  );
}
