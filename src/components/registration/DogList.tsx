import { useApp } from '../../context/AppContext';
import type { MergedDog } from '../../types';

function isSheetDog(dog: MergedDog): dog is typeof dog & { source: 'sheet' } {
  return 'source' in dog && dog.source === 'sheet';
}

export default function DogList() {
  const { mergedDogs, deleteDogWithUndo } = useApp();

  return (
    <div className="teams-list-card">
      <h3>รายชื่อสุนัขทั้งหมด ({mergedDogs.length})</h3>
      <div className="teams-container">
        {mergedDogs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🐕</div>
            <div className="empty-state-text">ยังไม่มีสุนัขลงทะเบียน</div>
          </div>
        ) : (
          mergedDogs.map((dog) => {
            const sheet = isSheetDog(dog);
            return (
              <div
                className={`team-card${sheet ? ' sheet-origin' : ''}`}
                key={String(dog.id)}
              >
                <div className="team-card-header">
                  <div className="team-name">
                    {dog.dogName}{' '}
                    {sheet && <span className="sheet-badge-inline">Form</span>}
                  </div>
                  {!sheet && (
                    <button
                      className="team-delete"
                      onClick={() => deleteDogWithUndo(dog.id)}
                      title="ลบสุนัข"
                    >
                      🗑️
                    </button>
                  )}
                </div>
                <div className="team-info">
                  <span>🐕 {dog.dogName} ({dog.dogBreed})</span>
                  <span>👤 {dog.handlerName}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
