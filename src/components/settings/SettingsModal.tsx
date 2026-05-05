import { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import { useApp } from '../../context/AppContext';
import type { Settings } from '../../types';
import { DEFAULT_SETTINGS } from '../../utils/constants';

interface SettingsModalProps {
  active: boolean;
  onClose: () => void;
}

export default function SettingsModal({ active, onClose }: SettingsModalProps) {
  const { settings, updateSettings, resetSettings, showToast } = useApp();

  const [form, setForm] = useState<Settings>({ ...settings });

  useEffect(() => {
    if (active) {
      setForm({ ...settings });
    }
  }, [active, settings]);

  const update = <K extends keyof Settings>(key: K, value: number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const gradeFields: (keyof Settings)[] = ['gradeV', 'gradeSG', 'gradeG', 'gradeB', 'gradeM'];
    for (const key of gradeFields) {
      if (form[key] < 0 || form[key] > 100) {
        showToast(`เกรดต้องอยู่ระหว่าง 0-100%`, 'error');
        return;
      }
    }

    const nonNegativeFields: (keyof Settings)[] = [
      'vp1Points', 'vp2Points', 'vp3Points',
      'attireRequired', 'attireBonus', 'attireMax',
      'bonusVp1', 'bonusVp2', 'bonusAll', 'bonusDown',
    ];
    for (const key of nonNegativeFields) {
      if (form[key] < 0) {
        showToast(`ค่าไม่สามารถติดลบได้`, 'error');
        return;
      }
    }

    updateSettings(form);
    showToast('บันทึกตั้งค่าสำเร็จ!', 'success');
    onClose();
  };

  const handleReset = () => {
    if (confirm('คืนค่าตั้งค่าเดิม?')) {
      resetSettings();
      setForm({ ...DEFAULT_SETTINGS });
      showToast('คืนค่าเดิมสำเร็จ', 'success');
    }
  };

  return (
    <Modal
      active={active}
      onClose={onClose}
      title="⚙️ ตั้งค่า"
      footer={
        <>
          <button className="btn btn-primary" onClick={handleSave}>
            💾 บันทึก
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            🔄 คืนค่าเดิม
          </button>
        </>
      }
    >
      <div className="settings-grid">
        {/* VP Points */}
        <div className="setting-card">
          <h3>🎯 คะแนน VP</h3>
          <div className="setting-item">
            <label>VP1 (ง่าย)</label>
            <input
              type="number"
              value={form.vp1Points}
              min="0"
              onChange={(e) => update('vp1Points', parseInt(e.target.value) || 0)}
            />
            <span>คะแนน</span>
          </div>
          <div className="setting-item">
            <label>VP2 (กลาง)</label>
            <input
              type="number"
              value={form.vp2Points}
              min="0"
              onChange={(e) => update('vp2Points', parseInt(e.target.value) || 0)}
            />
            <span>คะแนน</span>
          </div>
          <div className="setting-item">
            <label>VP3 (ยาก)</label>
            <input
              type="number"
              value={form.vp3Points}
              min="0"
              onChange={(e) => update('vp3Points', parseInt(e.target.value) || 0)}
            />
            <span>คะแนน</span>
          </div>
        </div>

        {/* Grade Percentages */}
        <div className="setting-card">
          <h3>📊 เกรด (%)</h3>
          <div className="setting-item">
            <label>V (ดีเยี่ยม)</label>
            <input
              type="number"
              value={form.gradeV}
              min="0"
              max="100"
              onChange={(e) => update('gradeV', parseInt(e.target.value) || 0)}
            />
            <span>%</span>
          </div>
          <div className="setting-item">
            <label>SG (ดีมาก)</label>
            <input
              type="number"
              value={form.gradeSG}
              min="0"
              max="100"
              onChange={(e) => update('gradeSG', parseInt(e.target.value) || 0)}
            />
            <span>%</span>
          </div>
          <div className="setting-item">
            <label>G (ดี)</label>
            <input
              type="number"
              value={form.gradeG}
              min="0"
              max="100"
              onChange={(e) => update('gradeG', parseInt(e.target.value) || 0)}
            />
            <span>%</span>
          </div>
          <div className="setting-item">
            <label>B (พอใช้)</label>
            <input
              type="number"
              value={form.gradeB}
              min="0"
              max="100"
              onChange={(e) => update('gradeB', parseInt(e.target.value) || 0)}
            />
            <span>%</span>
          </div>
          <div className="setting-item">
            <label>M (ไม่ผ่าน)</label>
            <input
              type="number"
              value={form.gradeM}
              min="0"
              max="100"
              onChange={(e) => update('gradeM', parseInt(e.target.value) || 0)}
            />
            <span>%</span>
          </div>
        </div>

        {/* Attire */}
        <div className="setting-card">
          <h3>👕 การแต่งกาย</h3>
          <div className="setting-item">
            <label>คะแนน/ชิ้น (จำเป็น)</label>
            <input
              type="number"
              value={form.attireRequired}
              min="0"
              onChange={(e) => update('attireRequired', parseInt(e.target.value) || 0)}
            />
            <span>คะแนน</span>
          </div>
          <div className="setting-item">
            <label>คะแนน/ชิ้น (เพิ่มเติม)</label>
            <input
              type="number"
              value={form.attireBonus}
              min="0"
              onChange={(e) => update('attireBonus', parseInt(e.target.value) || 0)}
            />
            <span>คะแนน</span>
          </div>
          <div className="setting-item">
            <label>คะแนนสูงสุด</label>
            <input
              type="number"
              value={form.attireMax}
              min="0"
              onChange={(e) => update('attireMax', parseInt(e.target.value) || 0)}
            />
            <span>คะแนน</span>
          </div>
        </div>

        {/* Bonus */}
        <div className="setting-card">
          <h3>🎁 โบนัส</h3>
          <div className="setting-item">
            <label>VP1 เร็ว</label>
            <input
              type="number"
              value={form.bonusVp1}
              min="0"
              onChange={(e) => update('bonusVp1', parseInt(e.target.value) || 0)}
            />
            <span>คะแนน</span>
          </div>
          <div className="setting-item">
            <label>VP2 เร็ว</label>
            <input
              type="number"
              value={form.bonusVp2}
              min="0"
              onChange={(e) => update('bonusVp2', parseInt(e.target.value) || 0)}
            />
            <span>คะแนน</span>
          </div>
          <div className="setting-item">
            <label>พบทั้ง 3 VP</label>
            <input
              type="number"
              value={form.bonusAll}
              min="0"
              onChange={(e) => update('bonusAll', parseInt(e.target.value) || 0)}
            />
            <span>คะแนน</span>
          </div>
          <div className="setting-item">
            <label>คำสั่ง Down</label>
            <input
              type="number"
              value={form.bonusDown}
              min="0"
              onChange={(e) => update('bonusDown', parseInt(e.target.value) || 0)}
            />
            <span>คะแนน</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
