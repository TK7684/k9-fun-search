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

const BONUS_ITEMS: { key: keyof BonusState; label: string; points: number }[] = [
  { key: 'vp1', label: 'หา VP1 ภายใน 1 นาที', points: 10 },
  { key: 'vp2', label: 'หา VP2 ภายใน 2 นาที', points: 10 },
  { key: 'allFound', label: 'หาครบ 3 VP ภายใน 3 นาที', points: 10 },
  { key: 'down', label: 'เรียกกลับ + หมอบรอ', points: 5 },
];

export default function ChecklistCard({
  attire,
  bonus,
  onAttireChange,
  onBonusChange,
}: ChecklistCardProps) {
  const attireCount = Object.values(attire).filter(Boolean).length;
  const attirePoints = Math.min(attireCount * 2, 10);

  return (
    <div className="quick-checklist-card">
      <h3>✅ รายการตรวจสอบ</h3>
      <div className="checklist-grid">
        <div className="checklist-section">
          <h4>👕 การแต่งกาย ({attirePoints}/10)</h4>
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
                {!required && <span className="points-badge bonus">+2</span>}
              </label>
            ))}
          </div>
        </div>

        <div className="checklist-section">
          <h4>⏱️ โบนัสเวลา + การเชื่อฟัง</h4>
          <div className="checklist-items">
            {BONUS_ITEMS.map(({ key, label, points }) => (
              <label className="checklist-item" key={key}>
                <input
                  type="checkbox"
                  checked={bonus[key]}
                  onChange={(e) => onBonusChange(key, e.target.checked)}
                />
                <span>⏱️ {label}</span>
                <span className="points-badge bonus">+{points}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
