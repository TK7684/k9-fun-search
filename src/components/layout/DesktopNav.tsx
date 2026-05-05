import { useApp } from '../../context/AppContext';

export default function DesktopNav() {
  const { activeTab, setActiveTab, leaderboardRef } = useApp();

  function handleLeaderboardClick() {
    setActiveTab('judge');
    leaderboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="quick-actions">
      <button
        className={`action-btn${activeTab === 'register' ? ' active' : ''}`}
        onClick={() => setActiveTab('register')}
      >
        <span className="btn-icon">📝</span>
        <span>ลงทะเบียน</span>
      </button>
      <button
        className={`action-btn${activeTab === 'judge' ? ' active' : ''}`}
        onClick={() => setActiveTab('judge')}
      >
        <span className="btn-icon">⚖️</span>
        <span>คิดคะแนน</span>
      </button>
      <button
        className="action-btn"
        onClick={handleLeaderboardClick}
      >
        <span className="btn-icon">🏆</span>
        <span>ตารางคะแนน</span>
      </button>
    </div>
  );
}
