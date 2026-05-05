import { useApp } from '../../context/AppContext';

export default function SettingsPage() {
  const { resetSettings, showToast } = useApp();

  const handleReset = () => {
    if (confirm('คืนค่าตั้งค่าเดิม?')) {
      resetSettings();
      showToast('คืนค่าเดิมสำเร็จ', 'success');
    }
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>⚙️ ตั้งค่า</h2>
      </div>

      <div className="settings-grid">
        {/* VP Point Reference */}
        <div className="setting-card">
          <h3>🎯 ตารางคะแนน VP (ตามกฎการแข่งขัน)</h3>
          <div className="point-table-wrapper">
            <table className="point-table">
              <thead>
                <tr>
                  <th>เกรด</th>
                  <th>VP1 (เปิด)</th>
                  <th>VP2 (สูง)</th>
                  <th>VP3 (ปิด)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['V', '20', '30', '40'],
                  ['V-', '19.5', '29', '39'],
                  ['SG+', '19', '28.5', '38'],
                  ['SG', '18.5', '28', '37'],
                  ['SG-', '18', '27', '36'],
                  ['G+', '17.5', '26', '35'],
                  ['G', '17', '25', '34'],
                  ['G-', '16', '24', '32'],
                  ['B+', '15.5', '23', '31'],
                  ['B', '15', '22', '30'],
                  ['B-', '14', '21', '28'],
                  ['M+', '13.5', '20.5', '27'],
                  ['M-', '0', '0', '0'],
                ].map(([grade, vp1, vp2, vp3]) => (
                  <tr key={grade}>
                    <td><strong>{grade}</strong></td>
                    <td>{vp1}</td>
                    <td>{vp2}</td>
                    <td>{vp3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bonus Reference */}
        <div className="setting-card">
          <h3>🎁 โบนัสเวลา + การเชื่อฟัง</h3>
          <div className="setting-item">
            <label>พบเร็ว (นาที 0-2)</label>
            <span className="setting-value">+10 คะแนน</span>
          </div>
          <div className="setting-item">
            <label>พบช้า (นาที 3-4)</label>
            <span className="setting-value">+2.5 คะแนน</span>
          </div>
          <div className="setting-item">
            <label>เรียกกลับ + หมอบรอ</label>
            <span className="setting-value">+5 คะแนน</span>
          </div>
        </div>

        {/* Attire Reference */}
        <div className="setting-card">
          <h3>👕 การแต่งกาย (จำเป็น)</h3>
          <div className="setting-item">
            <label>รองเท้า</label>
            <span className="setting-value">จำเป็น</span>
          </div>
          <div className="setting-item">
            <label>เสื้อแขนยาว</label>
            <span className="setting-value">จำเป็น</span>
          </div>
          <div className="setting-item">
            <label>กางเกงขายาว</label>
            <span className="setting-value">จำเป็น</span>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn btn-secondary" onClick={handleReset}>
          🔄 คืนค่าเดิม
        </button>
      </div>
    </div>
  );
}
