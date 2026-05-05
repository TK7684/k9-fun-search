import { useApp } from '../../context/AppContext';

export default function MobileNav() {
  const { activeTab, setActiveTab, setShowSettings, leaderboardRef } = useApp();

  function handleLeaderboardClick() {
    setActiveTab('judge');
    leaderboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

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
        className="mobile-nav-item"
        onClick={handleLeaderboardClick}
      >
        <span className="nav-icon">🏆</span>
        <span className="nav-label">ตารางคะแนน</span>
      </button>
      <button
        className="mobile-nav-item"
        onClick={() => setShowSettings(true)}
      >
        <span className="nav-icon">⚙️</span>
        <span className="nav-label">ตั้งค่า</span>
      </button>
    </nav>
  );
}
