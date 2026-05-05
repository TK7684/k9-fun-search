interface ProgressBarProps {
  scored: number;
  total: number;
}

export default function ProgressBar({ scored, total }: ProgressBarProps) {
  const percent = total > 0 ? Math.min((scored / total) * 100, 100) : 0;

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${percent}%` }}
      />
      <span className="progress-bar-text">
        {scored}/{total} สุนัข
      </span>
    </div>
  );
}
