import { useApp } from '../../context/AppContext';

export default function MobileNav() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="mobile-nav">
      <button
        className={`mobile-nav-item${activeTab === 'register' ? ' active' : ''}`}
        onClick={() => setActiveTab('register')}
      >
        <span className="nav-icon">📝</span>
        <span className="nav-label">ลงทะเบียน</span>
      </button>
      <button
        className={`mobile-nav-item${activeTab === 'judge' ? ' active' : ''}`}
        onClick={() => setActiveTab('judge')}
      >
        <span className="nav-icon">⚖️</span>
        <span className="nav-label">คิดคะแนน</span>
      </button>
      <button
        className={`mobile-nav-item${activeTab === 'leaderboard' ? ' active' : ''}`}
        onClick={() => setActiveTab('leaderboard')}
      >
        <span className="nav-icon">🏆</span>
        <span className="nav-label">ตารางคะแนน</span>
      </button>
      <button
        className={`mobile-nav-item${activeTab === 'settings' ? ' active' : ''}`}
        onClick={() => setActiveTab('settings')}
      >
        <span className="nav-icon">⚙️</span>
        <span className="nav-label">ตั้งค่า</span>
      </button>
    </nav>
  );
}
