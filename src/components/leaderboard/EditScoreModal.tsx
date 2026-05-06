import { useState, useMemo, useEffect } from 'react';
import Modal from '../shared/Modal';
import { useApp } from '../../context/AppContext';
import type { Score } from '../../types';

interface EditScoreModalProps {
  editingScoreId: number | null;
  onClose: () => void;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export default function EditScoreModal({ editingScoreId, onClose }: EditScoreModalProps) {
  const { scores, editScore, showToast } = useApp();

  const [vpScore, setVpScore] = useState(0);
  const [bonusScore, setBonusScore] = useState(0);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [notes, setNotes] = useState('');

  const score: Score | undefined = editingScoreId
    ? scores.find((s) => s.id === editingScoreId)
    : undefined;

  useEffect(() => {
    if (score) {
      setVpScore(score.vpScore);
      setBonusScore(score.bonusScore);
      setTimeInSeconds(score.timeInSeconds);
      setNotes(score.notes || '');
    }
  }, [score?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasErrors = useMemo(() => {
    const vpOutOfRange = vpScore < 0 || vpScore > 100;
    const bonusOutOfRange = bonusScore < 0 || bonusScore > 100;
    const timeOutOfRange = timeInSeconds < 0 || timeInSeconds > 600;
    return vpOutOfRange || bonusOutOfRange || timeOutOfRange;
  }, [vpScore, bonusScore, timeInSeconds]);

  if (!editingScoreId || !score) return null;

  const handleSave = () => {
    if (hasErrors) return;

    editScore(editingScoreId, {
      vpScore: clamp(vpScore, 0, 100),
      bonusScore: clamp(bonusScore, 0, 100),
      timeInSeconds: clamp(timeInSeconds, 0, 600),
      notes,
    });
    showToast('แก้ไขคะแนนสำเร็จ!', 'success');
    onClose();
  };

  const vpOutOfRange = vpScore < 0 || vpScore > 100;
  const bonusOutOfRange = bonusScore < 0 || bonusScore > 100;
  const timeOutOfRange = timeInSeconds < 0 || timeInSeconds > 600;

  return (
    <Modal
      active={!!editingScoreId}
      onClose={onClose}
      title="✏️ แก้ไขคะแนน"
      footer={
        <>
          <button className="btn btn-primary" onClick={handleSave} disabled={hasErrors}>
            💾 บันทึก
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            ยกเลิก
          </button>
        </>
      }
    >
      <div className="edit-form">
        <div className="input-group">
          <label>สุนัข</label>
          <input type="text" value={score.dogName} disabled />
        </div>
        <div className="input-group">
          <label>ผู้ควบคุม</label>
          <input type="text" value={score.handlerName} disabled />
        </div>
        <div className="input-group">
          <label>คะแนน VP</label>
          <input
            type="number"
            value={vpScore}
            step="0.1"
            min="0"
            max="100"
            onChange={(e) => setVpScore(parseFloat(e.target.value) || 0)}
          />
          {vpOutOfRange && (
            <span className="field-error">คะแนน VP ต้องอยู่ระหว่าง 0-100</span>
          )}
          <span className="field-hint">0 - 100</span>
        </div>
        <div className="input-group">
          <label>คะแนนเชื่อฟัง</label>
          <input
            type="number"
            value={bonusScore}
            step="0.1"
            min="0"
            max="100"
            onChange={(e) => setBonusScore(parseFloat(e.target.value) || 0)}
          />
          {bonusOutOfRange && (
            <span className="field-error">คะแนนเชื่อฟัง ต้องอยู่ระหว่าง 0-100</span>
          )}
          <span className="field-hint">0 - 100</span>
        </div>
        <div className="input-group">
          <label>เวลา (วินาที)</label>
          <input
            type="number"
            value={timeInSeconds}
            min="0"
            max="600"
            onChange={(e) => setTimeInSeconds(parseInt(e.target.value) || 0)}
          />
          {timeOutOfRange && (
            <span className="field-error">เวลาต้องอยู่ระหว่าง 0-600 วินาที</span>
          )}
          <span className="field-hint">0 - 600 วินาที (10 นาที)</span>
        </div>
        <div className="input-group">
          <label>หมายเหตุ</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
}
