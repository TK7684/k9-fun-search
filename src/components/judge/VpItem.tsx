import { getGradeVpPoints } from '../../utils/scoring';

interface VpItemProps {
  vpNum: 1 | 2 | 3;
  label: string;
  difficulty: 'easy' | 'medium' | 'hard';
  found: boolean;
  grade: string;
  onFoundChange: (found: boolean) => void;
  onGradeChange: (grade: string) => void;
}

const GRADE_OPTIONS = [
  { value: 'V', label: 'V — เฝ้าเห่าดังต่อเนื่อง (Stay & Bark)' },
  { value: 'V-', label: 'V- — เกือบสมบูรณ์' },
  { value: 'SG+', label: 'SG+ — เฝ้าต่อเนื่อง เห่าไม่ดัง' },
  { value: 'SG', label: 'SG — เฝ้าต่อเนื่อง เห่าไม่ดัง ไม่ต่อเนื่อง' },
  { value: 'SG-', label: 'SG- — เฝ้าบ้าง เห่าบ้าง' },
  { value: 'G+', label: 'G+ — เฝ้าไม่ต่อเนื่อง ระบุจุดชัด' },
  { value: 'G', label: 'G — เฝ้าไม่ต่อเนื่อง ระบุจุดได้' },
  { value: 'G-', label: 'G- — รู้ว่ามี แต่ขาดความมั่นใจ' },
  { value: 'B+', label: 'B+ — ไม่เฝ้า ไม่เห่า ชี้นำเล็กน้อย' },
  { value: 'B', label: 'B — ไม่เฝ้า ไม่เห่า สั่งเห่า' },
  { value: 'B-', label: 'B- — ไม่เฝ้า ไม่เห่า สั่งหลายครั้ง' },
  { value: 'M+', label: 'M+ — พบแต่ไม่แจ้งเตือน' },
  { value: 'M-', label: 'M- — ไม่พบ' },
];

export default function VpItem({
  vpNum,
  label,
  difficulty,
  found,
  grade,
  onFoundChange,
  onGradeChange,
}: VpItemProps) {
  const points = getGradeVpPoints(grade, vpNum);

  return (
    <div className={`vp-item${found ? ' found' : ''}`}>
      <div className="vp-header">
        <span className={`vp-badge ${difficulty}`}>
          {difficulty === 'easy' ? 'เปิด' : difficulty === 'medium' ? 'สูง' : 'ปิด'}
        </span>
        <span className="vp-points">{points} คะแนน</span>
      </div>
      <div className="vp-desc">{label}</div>
      <div className="vp-controls">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={found}
            onChange={(e) => onFoundChange(e.target.checked)}
          />
          <span className="toggle-slider" />
          พบแล้ว
        </label>
        <select
          className="grade-select"
          value={grade}
          onChange={(e) => onGradeChange(e.target.value)}
        >
          {GRADE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
