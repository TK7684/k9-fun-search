import { useApp } from '../../context/AppContext';

export default function Header() {
  const {
    mergedDogs,
    scores,
    darkMode,
  } = useApp();

  const totalDogs = mergedDogs.length;
  const completedScores = scores.length;
  const progressPercent = totalDogs > 0 ? Math.min((completedScores / totalDogs) * 100, 100) : 0;

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="dog-icon">🐕</div>
          <div className="header-text">
            <h1>Fun Search</h1>
            <div className="subtitle">by United SAR K9</div>
          </div>
        </div>

        <div className="header-right">
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-icon">🐕</span>
              <div className="stat-info">
                <span className="stat-number">{totalDogs}</span>
                <span className="stat-label">สุนัข</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">✅</span>
              <div className="stat-info">
                <span className="stat-number">{completedScores}</span>
                <span className="stat-label">คะแนน</span>
              </div>
            </div>
          </div>

          <div className="header-buttons">
            <button
              className="icon-btn-round"
              onClick={darkMode.toggle}
              aria-label={darkMode.isDark ? 'โหมดสว่าง' : 'โหมดมืด'}
            >
              {darkMode.isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
        <span className="progress-bar-text">
          {completedScores}/{totalDogs} สุนัข
        </span>
      </div>
    </header>
  );
}
