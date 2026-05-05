import type { AttireState, BonusState, Settings } from '../../types';

interface ChecklistCardProps {
  attire: AttireState;
  bonus: BonusState;
  settings: Settings;
  onAttireChange: (key: keyof AttireState, checked: boolean) => void;
  onBonusChange: (key: keyof BonusState, checked: boolean) => void;
}

const ATTIRE_ITEMS: { key: keyof AttireState; label: string; icon: string; required: boolean }[] = [
  { key: 'shoes', label: 'รองเท้า', icon: '👟', required: true },
  { key: 'shirt', label: 'เสื้อ', icon: '👕', required: true },
  { key: 'pants', label: 'กางเกง', icon: '👖', required: true },
  { key: 'hat', label: 'หมวก', icon: '🧢', required: false },
  { key: 'gloves', label: 'ถุงมือ', icon: '🧤', required: false },
];

const BONUS_ITEMS: { key: keyof BonusState; label: string; icon: string; settingsKey: keyof Settings }[] = [
  { key: 'vp1', label: 'พบ VP1 ใน 1 นาที', icon: '⚡', settingsKey: 'bonusVp1' },
  { key: 'vp2', label: 'พบ VP2 ใน 2 นาที', icon: '⚡', settingsKey: 'bonusVp2' },
  { key: 'allFound', label: 'พบทั้ง 3 VP ใน 3 นาที', icon: '🏆', settingsKey: 'bonusAll' },
  { key: 'down', label: 'คำสั่ง Down', icon: '🐕', settingsKey: 'bonusDown' },
];

export default function ChecklistCard({
  attire,
  bonus,
  settings,
  onAttireChange,
  onBonusChange,
}: ChecklistCardProps) {
  return (
    <div className="quick-checklist-card">
      <h3>✅ รายการตรวจสอบ</h3>
      <div className="checklist-grid">
        <div className="checklist-section">
          <h4>👕 การแต่งกาย</h4>
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
                <span className={`points-badge${required ? '' : ' bonus'}`}>
                  +{required ? settings.attireRequired : settings.attireBonus}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="checklist-section">
          <h4>🎁 โบนัสพิเศษ</h4>
          <div className="checklist-items">
            {BONUS_ITEMS.map(({ key, label, icon, settingsKey }) => (
              <label className="checklist-item" key={key}>
                <input
                  type="checkbox"
                  checked={bonus[key]}
                  onChange={(e) => onBonusChange(key, e.target.checked)}
                />
                <span>
                  {icon} {label}
                </span>
                <span className="points-badge bonus">
                  +{settings[settingsKey]}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
