import type { SheetDog } from '../../types';

interface SheetRegistrationsProps {
  sheetDogs: SheetDog[];
  fetchSheetData: () => void;
  isFetching: boolean;
  fetchError: string | null;
  sheetLastFetch: string | null;
}

function formatLastFetch(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return 'อัพเดทล่าสุด: ' + d.toLocaleTimeString('th-TH');
}

function getSexIcon(sex: string): string {
  if (sex.includes('Female') || sex.includes('เมีย')) return '♀️';
  return '♂️';
}

function SkeletonCard() {
  return (
    <div className="sheet-dog-card skeleton" aria-hidden="true">
      <div className="sheet-dog-header">
        <span className="sheet-dog-name skeleton-bar" style={{ width: '60%' }} />
        <span className="sheet-badge skeleton-badge">...</span>
      </div>
      <div className="sheet-dog-info">
        <span className="skeleton-bar" style={{ width: '75%' }} />
        <span className="skeleton-bar" style={{ width: '50%' }} />
      </div>
    </div>
  );
}

export default function SheetRegistrations({
  sheetDogs,
  fetchSheetData,
  isFetching,
  fetchError,
  sheetLastFetch,
}: SheetRegistrationsProps) {
  let statusClass = 'sheet-status';
  let statusText = '';
  if (isFetching) {
    statusClass = 'sheet-status loading';
    statusText = 'กำลังโหลดข้อมูล...';
  } else if (fetchError) {
    statusClass = 'sheet-status error';
    statusText = 'ไม่สามารถโหลดข้อมูล: ' + fetchError;
  } else if (sheetDogs.length > 0) {
    statusText = 'โหลดสำเร็จ — ' + sheetDogs.length + ' สุนัข';
  }

  const showSkeleton = isFetching && sheetDogs.length === 0;

  return (
    <div className="sheet-registrations-card">
      <div className="sheet-header">
        <h3>📋 ลงทะเบียนผ่าน Google Form</h3>
        <div className="sheet-controls">
          <span className="sheet-last-fetch">{formatLastFetch(sheetLastFetch)}</span>
          <button
            className={fetchError ? 'btn btn-primary' : 'icon-btn'}
            onClick={fetchSheetData}
            disabled={isFetching}
          >
            🔄 {fetchError ? 'ลองอีกครั้ง' : 'รีเฟรช'}
          </button>
        </div>
      </div>

      <div className={statusClass}>{statusText}</div>

      <div className="sheet-dogs-container">
        {showSkeleton ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : sheetDogs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <div className="empty-state-text">ยังไม่มีข้อมูลจาก Google Form</div>
          </div>
        ) : (
          sheetDogs.map((dog) => (
            <div className="sheet-dog-card" key={String(dog.id)}>
              <div className="sheet-dog-header">
                <span className="sheet-dog-name">🐕 {dog.dogName}</span>
                <span className="sheet-badge">Google Form</span>
              </div>
              <div className="sheet-dog-info">
                <span>
                  🦮 {dog.dogBreed}
                  {dog.extra.dogAge ? ' · ' + dog.extra.dogAge : ''}{' '}
                  {getSexIcon(dog.extra.dogSex)}
                </span>
                <span>👤 {dog.handlerName}</span>
                {dog.extra.phone && <span>📱 {dog.extra.phone}</span>}
                {dog.extra.lineId && <span>💬 LINE: {dog.extra.lineId}</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
