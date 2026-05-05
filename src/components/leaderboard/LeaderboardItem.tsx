import { useState } from 'react';
import type { Score } from '../../types';

interface LeaderboardItemProps {
  score: Score;
  rank: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function LeaderboardItem({ score, rank, onEdit, onDelete }: LeaderboardItemProps) {
  const [expanded, setExpanded] = useState(false);

  let rankClass = 'rank-other';
  if (rank === 1) rankClass = 'rank-1';
  else if (rank === 2) rankClass = 'rank-2';
  else if (rank === 3) rankClass = 'rank-3';

  const minutes = Math.floor(score.timeInSeconds / 60);
  const seconds = score.timeInSeconds % 60;
  const timeDisplay = score.timeInSeconds > 0 ? `${minutes}:${String(seconds).padStart(2, '0')}` : '-';

  const vpCount = Object.values(score.vpDetails).filter((vp) => vp.found).length;

  return (
    <div className={`lb-row ${expanded ? 'lb-row-expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
      <div className="lb-main">
        <div className={`lb-rank ${rankClass}`}>{rank}</div>
        <div className="lb-center">
          <div className="lb-name">{score.dogName}</div>
          <div className="lb-meta">
            {score.dogBreed} · 👤 {score.handlerName} · 🎯 {vpCount}/3 · ⏱️ {timeDisplay}
          </div>
        </div>
        <div className="lb-score-col">
          <div className="lb-total">{score.totalScore.toFixed(1)}</div>
          <div className="lb-sub">{score.vpScore.toFixed(0)}+{score.attireScore}+{score.bonusScore}</div>
        </div>
      </div>
      {expanded && (
        <div className="lb-expanded" onClick={(e) => e.stopPropagation()}>
          <div className="lb-vp-grid">
            {[1, 2, 3].map((vp) => {
              const d = score.vpDetails[String(vp) as '1' | '2' | '3'];
              return (
                <div key={vp} className={`lb-vp ${d?.found ? '' : 'lb-vp-miss'}`}>
                  <span className="lb-vp-label">VP{vp}</span>
                  <span className="lb-vp-grade">{d?.found ? d.grade : '-'}</span>
                  <span className="lb-vp-pts">{d?.found ? d.score.toFixed(1) : '0'}</span>
                </div>
              );
            })}
          </div>
          <div className="lb-actions">
            <button className="lb-edit-btn" onClick={() => onEdit(score.id as number)}>✏️ แก้ไข</button>
            <button className="lb-del-btn" onClick={() => onDelete(score.id as number)}>🗑️ ลบ</button>
          </div>
        </div>
      )}
    </div>
  );
}
