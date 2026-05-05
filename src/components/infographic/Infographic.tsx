import { useState } from 'react';
import { LOGO_URL } from '../../utils/constants';

export default function Infographic() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`infographic-section${isOpen ? ' open' : ''}`}>
      <button className="infographic-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>📢 ข้อมูลงาน TWD 2026</span>
        <span className="toggle-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      <div className="infographic-content">
        {/* Banner */}
        <div className="info-banner">
          <img src={LOGO_URL} alt="United SAR K9" className="info-logo" />
          <div className="info-title-block">
            <h2>Fun Search by UNITED SAR K9</h2>
            <p className="info-subtitle">Thailand Working Dog Championship (TWD 2026)</p>
          </div>
        </div>

        {/* Info grid — 3 cards */}
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-icon">📅</div>
            <h3>วันที่และสถานที่</h3>
            <p>29-31 พฤษภาคม 2026</p>
            <p>กองพันสุนัขทหารปากช่อง</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">⏰</div>
            <h3>ระยะเวลา</h3>
            <p>07:00 - 11:00 น. (4 ชม.)</p>
            <p>ค่าสมัคร 200 บาท</p>
            <p>จำกัด 20 สุนัข</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">📋</div>
            <h3>กติกา</h3>
            <p>ค้นหา 5 นาที + เตรียมตัว 5 นาที</p>
            <p>สุนัขเพศเมียที่ฮีทห้ามเข้าร่วม</p>
            <p>สุนัขที่ควบคุมไม่ได้ห้ามเข้าร่วม</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="info-timeline">
          <h3>⏱️ ตารางกิจกรรม</h3>
          <div className="timeline-items">
            <div className="timeline-item">
              <span className="timeline-time">06:30</span>
              <span className="timeline-label">รายงานตัว · ทดสอบ recall · จับฉลาก</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-time">07:00</span>
              <span className="timeline-label">เริ่มค้นหาตัวแรก</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-time">11:00</span>
              <span className="timeline-label">จบ Fun Search</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-time">11:00+</span>
              <span className="timeline-label">ปลอบใจสุนัข recall ไม่ผ่าน</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-time">11:30</span>
              <span className="timeline-label">ประกาศผล</span>
            </div>
          </div>
        </div>

        {/* Second grid — equipment and sponsors */}
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-icon">🎒</div>
            <h3>อุปกรณ์ที่ต้องเตรียม</h3>
            <ul className="info-list">
              <li>สายจูงยาว 10 เมตร</li>
              <li>อาหาร/น้ำสุนัข</li>
              <li>รางวัลสำหรับสุนัข</li>
            </ul>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🎁</div>
            <h3>สปอนเซอร์ Happy Bag</h3>
            <ul className="info-list">
              <li>Jaikla</li>
              <li>Urban Waggo</li>
              <li>Golden Future</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
