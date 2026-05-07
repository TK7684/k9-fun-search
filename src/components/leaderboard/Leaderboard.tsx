import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { sortScores } from '../../utils/scoring';
import LeaderboardItem from './LeaderboardItem';
import LeaderboardActions from './LeaderboardActions';
import EditScoreModal from './EditScoreModal';

export default function Leaderboard() {
  const { scores, deleteScoreWithUndo, setEditingScoreId } = useApp();
  const [editId, setEditId] = useState<number | null>(null);

  const sortedScores = useMemo(() => sortScores(scores), [scores]);

  const handleEdit = (id: number) => {
    setEditId(id);
    setEditingScoreId(id);
  };

  const handleCloseEdit = () => {
    setEditId(null);
    setEditingScoreId(null);
  };

  return (
    <div id="dashboard" className="dashboard-section">
      <h2>🏆 ตารางคะแนนสุนัข</h2>

      <LeaderboardActions />

      {scores.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏆</div>
          <div className="empty-state-text">ยังไม่มีคะแนน</div>
        </div>
      ) : (
        <div className="leaderboard-table">
          {sortedScores.map((score, index) => (
            <LeaderboardItem
              key={score.id}
              score={score}
              rank={index + 1}
              onEdit={handleEdit}
              onDelete={(id) => deleteScoreWithUndo(id)}
            />
          ))}
        </div>
      )}

      <EditScoreModal editingScoreId={editId} onClose={handleCloseEdit} />
    </div>
  );
}
