interface VpItemProps {
  vpNum: 1 | 2 | 3;
  label: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  found: boolean;
  grade: string;
  onFoundChange: (found: boolean) => void;
  onGradeChange: (grade: string) => void;
}

const GRADE_OPTIONS = [
  { value: 'V', label: 'V ⭐⭐⭐⭐' },
  { value: 'SG', label: 'SG ⭐⭐⭐' },
  { value: 'G', label: 'G ⭐⭐' },
  { value: 'B', label: 'B ⭐' },
  { value: 'M', label: 'M' },
];

export default function VpItem({
  label,
  difficulty,
  points,
  found,
  grade,
  onFoundChange,
  onGradeChange,
}: VpItemProps) {
  return (
    <div className={`vp-item${found ? ' found' : ''}`}>
      <div className="vp-header">
        <span className={`vp-badge ${difficulty}`}>
          {difficulty === 'easy' ? 'ง่าย' : difficulty === 'medium' ? 'ปานกลาง' : 'ยาก'}
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
