import type { AttireState, BonusState } from '../../types';

interface ChecklistCardProps {
  attire: AttireState;
  bonus: BonusState;
  onAttireChange: (key: keyof AttireState, checked: boolean) => void;
  onBonusChange: (key: keyof BonusState, checked: boolean) => void;
}

const ATTIRE_ITEMS: { key: keyof AttireState; label: string; icon: string; required: boolean }[] = [
  { key: 'shoes', label: 'รองเท้า', icon: '👟', required: true },
  { key: 'shirt', label: 'เสื้อแขนยาว', icon: '👕', required: true },
  { key: 'pants', label: 'กางเกงขายาว', icon: '👖', required: true },
  { key: 'hat', label: 'หมวก', icon: '🧢', required: false },
  { key: 'gloves', label: 'ถุงมือ', icon: '🧤', required: false },
];

export default function ChecklistCard({
  attire,
  bonus,
  onAttireChange,
  onBonusChange,
}: ChecklistCardProps) {
  return (
    <div className="quick-checklist-card">
      <h3>✅ รายการตรวจสอบ</h3>
      <div className="checklist-grid">
        <div className="checklist-section">
          <h4>👕 การแต่งกาย (ตรวจก่อนเริ่ม)</h4>
          <div className="checklist-items">
            {ATTIRE_ITEMS.map(({ key, label, icon, required }) => (
              <label className="checklist-item" key={key}>
                <input
                  type="checkbox"
                  checked={attire[key]}
                  onChange={(e) => onAttireChange(key, e.target.checked)}
                />
                <span>
                  {icon} {label}
                </span>
                {required && <span className="points-badge required">จำเป็น</span>}
              </label>
            ))}
          </div>
        </div>

        <div className="checklist-section">
          <h4>🐕 การเชื่อฟัง</h4>
          <div className="checklist-items">
            <label className="checklist-item">
              <input
                type="checkbox"
                checked={bonus.down}
                onChange={(e) => onBonusChange('down', e.target.checked)}
              />
              <span>🐕 เรียกกลับ + หมอบรอ</span>
              <span className="points-badge bonus">+5</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
