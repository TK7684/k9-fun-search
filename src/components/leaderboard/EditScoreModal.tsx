import { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import { useApp } from '../../context/AppContext';
import type { Score } from '../../types';

interface EditScoreModalProps {
  editingScoreId: number | null;
  onClose: () => void;
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

  if (!editingScoreId || !score) return null;

  const handleSave = () => {
    editScore(editingScoreId, {
      vpScore,
      bonusScore,
      timeInSeconds,
      notes,
    });
    showToast('แก้ไขคะแนนสำเร็จ!', 'success');
    onClose();
  };

  return (
    <Modal
      active={!!editingScoreId}
      onClose={onClose}
      title="✏️ แก้ไขคะแนน"
      footer={
        <>
          <button className="btn btn-primary" onClick={handleSave}>
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
            onChange={(e) => setVpScore(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="input-group">
          <label>คะแนนเชื่อฟัง</label>
          <input
            type="number"
            value={bonusScore}
            step="0.1"
            min="0"
            onChange={(e) => setBonusScore(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="input-group">
          <label>เวลา (วินาที)</label>
          <input
            type="number"
            value={timeInSeconds}
            min="0"
            onChange={(e) => setTimeInSeconds(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="input-group">
          <label>หมายเหตุ</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
}
