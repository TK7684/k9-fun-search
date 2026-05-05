interface TimerProps {
  seconds: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
}

export default function Timer({ seconds, isRunning, onStart, onPause, onReset }: TimerProps) {
  return (
    <div className="timer-card">
      <h3>⏱️ เวลา</h3>
      <div className="timer-display">
        <span className="timer-value">{formatTime(seconds)}</span>
        <div className="timer-controls">
          <button
            className="timer-btn"
            onClick={onStart}
            disabled={isRunning}
          >
            ▶️ เริ่ม
          </button>
          <button
            className="timer-btn"
            onClick={onPause}
            disabled={!isRunning}
          >
            ⏸️ หยุด
          </button>
          <button
            className="timer-btn"
            onClick={onReset}
          >
            🔄 รีเซ็ต
          </button>
        </div>
      </div>
    </div>
  );
}
