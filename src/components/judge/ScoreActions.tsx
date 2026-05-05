interface ScoreActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function ScoreActions({ onSave, onCancel }: ScoreActionsProps) {
  return (
    <div className="action-buttons">
      <button className="action-btn-save" onClick={onSave}>
        💾 บันทึกคะแนน
      </button>
      <button className="action-btn-cancel" onClick={onCancel}>
        ❌ ยกเลิก
      </button>
    </div>
  );
}
