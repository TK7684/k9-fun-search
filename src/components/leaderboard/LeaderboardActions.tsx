import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { exportCSV } from '../../utils/exportCsv';

export default function LeaderboardActions() {
  const { scores, clearAllScores, manualSync, showToast } = useApp();
  const [syncing, setSyncing] = useState(false);

  const handleClearAll = () => {
    if (confirm('⚠️ คำเตือน: การกระทำนี้จะลบข้อมูลทั้งหมด')) {
      if (confirm('ยืนยันที่จะลบข้อมูลทั้งหมด? ไม่สามารถย้อนกลับได้')) {
        clearAllScores();
        showToast('ลบข้อมูลทั้งหมดเรียบร้อย', 'success');
      }
    }
  };

  const handleExport = () => {
    if (scores.length === 0) {
      showToast('ไม่มีข้อมูลสำหรับส่งออก', 'error');
      return;
    }
    exportCSV(scores);
    showToast('ส่งออก CSV สำเร็จ!', 'success');
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await manualSync();
      showToast('ซิงค์ไป Google Sheet สำเร็จ!', 'success');
    } catch {
      showToast('ซิงค์ไม่สำเร็จ', 'error');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="leaderboard-actions">
      <button className="icon-btn" onClick={handleSync} disabled={syncing}>
        {syncing ? '⏳ กำลังซิงค์...' : '☁️ ซิงค์ Sheet'}
      </button>
      <button className="icon-btn" onClick={handleExport}>
        📥 ส่งออก CSV
      </button>
      <button className="icon-btn danger" onClick={handleClearAll}>
        🗑️ ล้างข้อมูล
      </button>
    </div>
  );
}
