import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { exportCSV } from '../../utils/exportCsv';
import LeaderboardItem from './LeaderboardItem';
import LeaderboardActions from './LeaderboardActions';
import EditScoreModal from './EditScoreModal';

export default function Leaderboard() {
  const { scores, deleteScoreWithUndo, showToast, setEditingScoreId } = useApp();
  const [editId, setEditId] = useState<number | null>(null);

  const sortedScores = [...scores].sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    return a.timeInSeconds - b.timeInSeconds;
  });

  const handleExport = () => {
    if (scores.length === 0) {
      showToast('ไม่มีข้อมูลสำหรับส่งออก', 'error');
      return;
    }
    exportCSV(scores);
    showToast('ส่งออก CSV สำเร็จ!', 'success');
  };

  const handleClearAll = () => {
    // Double confirmation is handled inside LeaderboardActions
    // This callback fires only after both confirms pass
    showToast('ลบข้อมูลทั้งหมดเรียบร้อย', 'success');
  };

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

      <LeaderboardActions onExport={handleExport} onClearAll={handleClearAll} />

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
