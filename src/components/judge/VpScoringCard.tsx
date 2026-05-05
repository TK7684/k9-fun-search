import type { VPState, Settings } from '../../types';
import VpItem from './VpItem';

interface VpScoringCardProps {
  vpState: VPState;
  settings: Settings;
  onVpChange: (vpNum: 1 | 2 | 3, found: boolean) => void;
  onGradeChange: (vpNum: 1 | 2 | 3, grade: string) => void;
}

const VP_CONFIG: { num: 1 | 2 | 3; label: string; difficulty: 'easy' | 'medium' | 'hard'; pointsKey: 'vp1Points' | 'vp2Points' | 'vp3Points' }[] = [
  { num: 1, label: 'VP1 — เหยื่อง่าย', difficulty: 'easy', pointsKey: 'vp1Points' },
  { num: 2, label: 'VP2 — เหยื่อปานกลาง', difficulty: 'medium', pointsKey: 'vp2Points' },
  { num: 3, label: 'VP3 — เหยื่อยาก', difficulty: 'hard', pointsKey: 'vp3Points' },
];

export default function VpScoringCard({
  vpState,
  settings,
  onVpChange,
  onGradeChange,
}: VpScoringCardProps) {
  return (
    <div className="vp-scoring-card">
      <h3>🎯 คะแนน VP (Victim Person)</h3>
      <div className="vp-grid">
        {VP_CONFIG.map(({ num, label, difficulty, pointsKey }) => (
          <VpItem
            key={num}
            vpNum={num}
            label={label}
            difficulty={difficulty}
            points={settings[pointsKey]}
            found={vpState[num].found}
            grade={vpState[num].grade}
            onFoundChange={(found) => onVpChange(num, found)}
            onGradeChange={(grade) => onGradeChange(num, grade)}
          />
        ))}
      </div>
    </div>
  );
}
