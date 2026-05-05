interface LeaderboardActionsProps {
  onExport: () => void;
  onClearAll: () => void;
}

export default function LeaderboardActions({ onExport, onClearAll }: LeaderboardActionsProps) {
  const handleClearAll = () => {
    if (confirm('⚠️ คำเตือน: การกระทำนี้จะลบข้อมูลทั้งหมด')) {
      if (confirm('ยืนยันที่จะลบข้อมูลทั้งหมด? ไม่สามารถย้อนกลับได้')) {
        onClearAll();
      }
    }
  };

  return (
    <div className="leaderboard-actions">
      <button className="icon-btn" onClick={onExport}>
        📥 ส่งออก CSV
      </button>
      <button className="icon-btn danger" onClick={handleClearAll}>
        🗑️ ล้างข้อมูล
      </button>
    </div>
  );
}
