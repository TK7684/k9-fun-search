import { useState, useEffect, useCallback } from 'react';

const CONFETTI_COLORS = [
  '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff',
  '#ff6b9d', '#c084fc', '#fb923c', '#22d3ee',
  '#f472b6', '#a3e635',
];

const CONFETTI_COUNT = 50;
const CONFETTI_DURATION = 4000;

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
}

function generatePieces(): ConfettiPiece[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)] as string,
    delay: Math.random() * 2,
    size: Math.random() * 8 + 6,
  }));
}

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export default function Confetti({ trigger, onComplete }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const start = useCallback(() => {
    setPieces(generatePieces());
  }, []);

  useEffect(() => {
    if (trigger) {
      start();
      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, CONFETTI_DURATION);
      return () => clearTimeout(timer);
    }
  }, [trigger, start, onComplete]);

  if (pieces.length === 0) return null;

  return (
    <div className="confetti-container">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            animationDelay: `${piece.delay}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}
