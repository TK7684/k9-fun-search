import { useApp } from '../../context/AppContext';

export default function DesktopNav() {
  const { activeTab, setActiveTab } = useApp();

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
        className={`action-btn${activeTab === 'leaderboard' ? ' active' : ''}`}
        onClick={() => setActiveTab('leaderboard')}
      >
        <span className="btn-icon">🏆</span>
        <span>ตารางคะแนน</span>
      </button>
      <button
        className={`action-btn${activeTab === 'settings' ? ' active' : ''}`}
        onClick={() => setActiveTab('settings')}
      >
        <span className="btn-icon">⚙️</span>
        <span>ตั้งค่า</span>
      </button>
    </div>
  );
}
