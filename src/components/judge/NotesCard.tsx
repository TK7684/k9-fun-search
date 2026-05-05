interface NotesCardProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NotesCard({ value, onChange }: NotesCardProps) {
  return (
    <div className="notes-card">
      <h3>📝 หมายเหตุ</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="บันทึกหมายเหตุเพิ่มเติม..."
      />
    </div>
  );
}
