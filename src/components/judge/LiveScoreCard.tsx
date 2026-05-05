interface LiveScoreCardProps {
  vpScore: number;
  attireScore: number;
  bonusScore: number;
  totalScore: number;
}

export default function LiveScoreCard({
  vpScore,
  attireScore,
  bonusScore,
  totalScore,
}: LiveScoreCardProps) {
  return (
    <div className="live-score-card">
      <h3>📊 คะแนนสด</h3>
      <div className="score-grid">
        <div className="score-item">
          <span className="score-label">🎯 VP</span>
          <span className="score-value">{vpScore.toFixed(1)}</span>
        </div>
        <div className="score-item">
          <span className="score-label">👕 การแต่งกาย</span>
          <span className="score-value">{attireScore}</span>
        </div>
        <div className="score-item">
          <span className="score-label">🎁 โบนัส</span>
          <span className="score-value">{bonusScore}</span>
        </div>
        <div className="score-item">
          <span className="score-label">🏅 รวม</span>
          <span className="score-value total">{totalScore.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
