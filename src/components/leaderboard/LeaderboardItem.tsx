import type { Score } from '../../types';

interface LeaderboardItemProps {
  score: Score;
  rank: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function LeaderboardItem({ score, rank, onEdit, onDelete }: LeaderboardItemProps) {
  let rankClass = 'rank-other';
  if (rank === 1) rankClass = 'rank-1';
  else if (rank === 2) rankClass = 'rank-2';
  else if (rank === 3) rankClass = 'rank-3';

  const minutes = Math.floor(score.timeInSeconds / 60);
  const seconds = score.timeInSeconds % 60;
  const timeDisplay =
    score.timeInSeconds > 0
      ? `${minutes}:${String(seconds).padStart(2, '0')}`
      : '-';

  const vpCount = Object.values(score.vpDetails).filter((vp) => vp.found).length;

  return (
    <div className="leaderboard-item">
      <div className={`leaderboard-rank ${rankClass}`}>{rank}</div>
      <div className="leaderboard-info">
        <div className="leaderboard-team">{score.dogName}</div>
        <div className="leaderboard-details">
          🐕 {score.dogName} ({score.dogBreed || '-'}) | 👤 {score.handlerName} | 🎯 พบ {vpCount}/3
          VP | ⏱️ {timeDisplay}
        </div>
      </div>
      <div className="leaderboard-score">
        <div className="leaderboard-total">{score.totalScore.toFixed(1)}</div>
        <div className="leaderboard-bonus">+{score.bonusScore} โบนัส</div>
      </div>
      <div className="leaderboard-actions-btn">
        <button className="edit-btn" onClick={() => onEdit(score.id as number)}>
          ✏️ แก้ไข
        </button>
        <button className="delete-btn" onClick={() => onDelete(score.id as number)}>
          🗑️ ลบ
        </button>
      </div>
    </div>
  );
}
