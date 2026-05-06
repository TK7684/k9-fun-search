import { useApp } from '../../context/AppContext';
import type { MergedDog } from '../../types';

function isSheetDog(dog: MergedDog): dog is typeof dog & { source: 'sheet' } {
  return 'source' in dog && dog.source === 'sheet';
}

export default function DogList() {
  const { mergedDogs, deleteDogWithUndo } = useApp();

  return (
    <div className="dogs-list-card">
      <h3>รายชื่อสุนัขทั้งหมด ({mergedDogs.length})</h3>
      <div className="dogs-container">
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
                className={`dog-card${sheet ? ' sheet-origin' : ''}`}
                key={String(dog.id)}
              >
                <div className="dog-card-header">
                  <div className="dog-name">
                    {dog.dogName}{' '}
                    {sheet && <span className="sheet-badge-inline">Form</span>}
                  </div>
                  {!sheet && (
                    <button
                      className="dog-delete"
                      onClick={() => deleteDogWithUndo(dog.id)}
                      title="ลบสุนัข"
                    >
                      🗑️
                    </button>
                  )}
                </div>
                <div className="dog-info">
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
