import type { Dog, Score } from '../types';

export const demoDogs: Dog[] = [
  {
    id: 1,
    dogName: 'มอลลี่',
    dogBreed: 'เยอร์มัน เชเพิร์ด',
    handlerName: 'สมชาย ใจดี',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 2,
    dogName: 'แม็กซ์',
    dogBreed: 'โกลเด้น รีทรีเวอร์',
    handlerName: 'วิชัย กล้าหาญ',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 3,
    dogName: 'ลูน่า',
    dogBreed: 'ลาบราดอร์',
    handlerName: 'สุดา รักสัตว์',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 4,
    dogName: 'ร็อคกี้',
    dogBreed: 'เบลเจียน มาลินอยส์',
    handlerName: 'ประเสริฐ ทำงาน',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 5,
    dogName: 'เบลล่า',
    dogBreed: 'บอร์เดอร์ คอลลี่',
    handlerName: 'มานี มีตา',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 6,
    dogName: 'โชกุน',
    dogBreed: 'ร็อตไวเลอร์',
    handlerName: 'ธนกร ศรีสุข',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 7,
    dogName: 'ดั๊ก',
    dogBreed: 'ดอเบอร์แมน',
    handlerName: 'พิชญา แสงจันทร์',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 8,
    dogName: 'น้องเต้า',
    dogBreed: 'ชิวาว่า',
    handlerName: 'จิราภรณ์ วงศ์ดี',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 9,
    dogName: 'คุณหนู',
    dogBreed: 'พุดเดิ้ล',
    handlerName: 'อนุชา เทพสง่า',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 10,
    dogName: 'สโนว์',
    dogBreed: 'ฮัสกี้',
    handlerName: 'รัตนา พิมพ์สวย',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 11,
    dogName: 'ฮาจิ',
    dogBreed: 'อะคิตะ',
    handlerName: 'กิตติพงษ์ รักษาดี',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 12,
    dogName: 'คางุระ',
    dogBreed: 'ชิบะอินุ',
    handlerName: 'นภัสสร กลิ่นไผ่',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 13,
    dogName: 'ทาโร่',
    dogBreed: 'คอร์กี้',
    handlerName: 'ภาณุพงศ์ สุขสันต์',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 14,
    dogName: 'ยักษ์',
    dogBreed: 'เกรทเดน',
    handlerName: 'วรรณา ศรีประสิทธิ์',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 15,
    dogName: 'เบียร์',
    dogBreed: 'เซนต์เบอร์นาร์ด',
    handlerName: 'สมศักดิ์ มั่นคง',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 16,
    dogName: 'สนูปปี้',
    dogBreed: 'บีเกิ้ล',
    handlerName: 'จันทร์เพ็ญ แก้วมณี',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 17,
    dogName: 'แจ็ค',
    dogBreed: 'แจ็กรัสเซล',
    handlerName: 'ธีรวัฒน์ ชาญชัย',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 18,
    dogName: 'ไทเกอร์',
    dogBreed: 'พิตบull',
    handlerName: 'พัชรี สุขสม',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 19,
    dogName: 'ข้าวปุ้น',
    dogBreed: 'มาลทีส',
    handlerName: 'ศิริลักษณ์ ดวงใจ',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 20,
    dogName: 'มิกกี้',
    dogBreed: 'ยอร์กเชียร์',
    handlerName: 'ชาตรี บุญมาก',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 21,
    dogName: 'บูม',
    dogBreed: 'บอลด็อก',
    handlerName: 'สายฝน พรหมจริย์',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 22,
    dogName: 'แบนโจ',
    dogBreed: 'บาสเซ็ตฮาวด์',
    handlerName: 'ปิยะ สมบูรณ์',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 23,
    dogName: 'ไคโร',
    dogBreed: 'ไซบีเรียน ฮัสกี้',
    handlerName: 'ดวงดาว รุ่งเรือง',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 24,
    dogName: 'เร็กซ์',
    dogBreed: 'อัลลิแดล์ เทอร์เรีย',
    handlerName: 'อดุลย์ อำนาจ',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 25,
    dogName: 'น้องหมิว',
    dogBreed: 'เยอร์มัน เชเพิร์ด',
    handlerName: 'สุภาพร เจริญสุข',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 26,
    dogName: 'เจ้าเสือ',
    dogBreed: 'โกลเด้น รีทรีเวอร์',
    handlerName: 'วิญญู สมฤทธิ์',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 27,
    dogName: 'ช็อกโกแลต',
    dogBreed: 'ลาบราดอร์',
    handlerName: 'พรชัย อุดมการ',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 28,
    dogName: 'ทองหยิบ',
    dogBreed: 'เบลเจียน มาลินอยส์',
    handlerName: 'จารุวรรณ บุญมี',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 29,
    dogName: 'แพรวา',
    dogBreed: 'บอร์เดอร์ คอลลี่',
    handlerName: 'ศักดิ์สิทธิ์ ตรีเพชร',
    registeredAt: new Date().toISOString(),
  },
  {
    id: 30,
    dogName: 'ละมั้ง',
    dogBreed: 'ร็อตไวเลอร์',
    handlerName: 'กานดา วัฒนประสิทธิ์',
    registeredAt: new Date().toISOString(),
  },
];

export const demoScores: Score[] = [
  // Score 1: Dog 1 (มอลลี่) — All V, all VP found, max attire+bonus, fast time = TOP SCORE
  // VP: 20*1 + 30*1 + 40*1 = 90 | Attire: 10 | Bonus: 10+10+10+5=35 | Total: 135
  {
    id: 101,
    dogId: 1,
    dogName: 'มอลลี่',
    dogBreed: 'เยอร์มัน เชเพิร์ด',
    handlerName: 'สมชาย ใจดี',
    vpDetails: {
      '1': { found: true, grade: 'V', score: 20 },
      '2': { found: true, grade: 'V', score: 30 },
      '3': { found: true, grade: 'V', score: 40 },
    },
    vpScore: 90,
    attireScore: 10,
    bonusScore: 35,
    totalScore: 135,
    timeInSeconds: 95,
    notes: 'ทำได้ยอดเยี่ยม! คะแนนเต็มเกือบทุกด้าน',
    scoredAt: new Date().toISOString(),
  },

  // Score 2: Dog 2 (แม็กซ์) — All V, fast time but lower bonus (no down bonus)
  // VP: 20+30+40=90 | Attire: 8 | Bonus: 10+10+10=30 | Total: 128
  {
    id: 102,
    dogId: 2,
    dogName: 'แม็กซ์',
    dogBreed: 'โกลเด้น รีทรีเวอร์',
    handlerName: 'วิชัย กล้าหาญ',
    vpDetails: {
      '1': { found: true, grade: 'V', score: 20 },
      '2': { found: true, grade: 'V', score: 30 },
      '3': { found: true, grade: 'V', score: 40 },
    },
    vpScore: 90,
    attireScore: 8,
    bonusScore: 30,
    totalScore: 128,
    timeInSeconds: 102,
    notes: 'ควบคุมได้ดี ขาดเฉพาะท่าล้ม',
    scoredAt: new Date().toISOString(),
  },

  // Score 3: Dog 3 (ลูน่า) — All SG, all VP found
  // VP: 20*0.92 + 30*0.92 + 40*0.92 = 18.4+27.6+36.8=82.8 | Attire: 10 | Bonus: 10+10+10+5=35 | Total: 127.8
  {
    id: 103,
    dogId: 3,
    dogName: 'ลูน่า',
    dogBreed: 'ลาบราดอร์',
    handlerName: 'สุดา รักสัตว์',
    vpDetails: {
      '1': { found: true, grade: 'SG', score: 18.4 },
      '2': { found: true, grade: 'SG', score: 27.6 },
      '3': { found: true, grade: 'SG', score: 36.8 },
    },
    vpScore: 82.8,
    attireScore: 10,
    bonusScore: 35,
    totalScore: 127.8,
    timeInSeconds: 134,
    notes: 'ทำได้ดีมาก SG ทุกจุด',
    scoredAt: new Date().toISOString(),
  },

  // Score 4: Dog 4 (ร็อคกี้) — Mixed V/SG/G grades
  // VP: 20*1 + 30*0.92 + 40*0.84 = 20+27.6+33.6=81.2 | Attire: 10 | Bonus: 10+10=20 | Total: 111.2
  {
    id: 104,
    dogId: 4,
    dogName: 'ร็อคกี้',
    dogBreed: 'เบลเจียน มาลินอยส์',
    handlerName: 'ประเสริฐ ทำงาน',
    vpDetails: {
      '1': { found: true, grade: 'V', score: 20 },
      '2': { found: true, grade: 'SG', score: 27.6 },
      '3': { found: true, grade: 'G', score: 33.6 },
    },
    vpScore: 81.2,
    attireScore: 10,
    bonusScore: 20,
    totalScore: 111.2,
    timeInSeconds: 178,
    notes: 'เกรดผสม แต่ผ่านทุกจุด',
    scoredAt: new Date().toISOString(),
  },

  // Score 5: Dog 5 (เบลล่า) — VP3 not found, V grades on found VPs
  // VP: 20*1 + 30*1 + 0 = 50 | Attire: 10 | Bonus: 10+10=20 | Total: 80
  {
    id: 105,
    dogId: 5,
    dogName: 'เบลล่า',
    dogBreed: 'บอร์เดอร์ คอลลี่',
    handlerName: 'มานี มีตา',
    vpDetails: {
      '1': { found: true, grade: 'V', score: 20 },
      '2': { found: true, grade: 'V', score: 30 },
      '3': { found: false, grade: '', score: 0 },
    },
    vpScore: 50,
    attireScore: 10,
    bonusScore: 20,
    totalScore: 80,
    timeInSeconds: 245,
    notes: 'หา VP3 ไม่เจอ แต่สองจุดแรกเกรด V',
    scoredAt: new Date().toISOString(),
  },

  // Score 6: Dog 6 (โชกุน) — G grades, all found
  // VP: 20*0.84 + 30*0.84 + 40*0.84 = 16.8+25.2+33.6=75.6 | Attire: 8 | Bonus: 10+10+10=30 | Total: 113.6
  {
    id: 106,
    dogId: 6,
    dogName: 'โชกุน',
    dogBreed: 'ร็อตไวเลอร์',
    handlerName: 'ธนกร ศรีสุข',
    vpDetails: {
      '1': { found: true, grade: 'G', score: 16.8 },
      '2': { found: true, grade: 'G', score: 25.2 },
      '3': { found: true, grade: 'G', score: 33.6 },
    },
    vpScore: 75.6,
    attireScore: 8,
    bonusScore: 30,
    totalScore: 113.6,
    timeInSeconds: 210,
    notes: 'เกรด G ทุกจุด แต่หาเจอหมด',
    scoredAt: new Date().toISOString(),
  },

  // Score 7: Dog 7 (ดั๊ก) — B grade on one VP (VP2)
  // VP: 20*1 + 30*0.74 + 40*0.92 = 20+22.2+36.8=79 | Attire: 10 | Bonus: 10+5=15 | Total: 104
  {
    id: 107,
    dogId: 7,
    dogName: 'ดั๊ก',
    dogBreed: 'ดอเบอร์แมน',
    handlerName: 'พิชญา แสงจันทร์',
    vpDetails: {
      '1': { found: true, grade: 'V', score: 20 },
      '2': { found: true, grade: 'B', score: 22.2 },
      '3': { found: true, grade: 'SG', score: 36.8 },
    },
    vpScore: 79,
    attireScore: 10,
    bonusScore: 15,
    totalScore: 104,
    timeInSeconds: 320,
    notes: 'VP2 เกรด B ต้องปรับปรุง',
    scoredAt: new Date().toISOString(),
  },

  // Score 8: Dog 8 (น้องเต้า) — M grade (0 points), all VP found
  // VP: 20*0 + 30*1 + 40*1 = 70 | Attire: 6 | Bonus: 10+5=15 | Total: 91
  {
    id: 108,
    dogId: 8,
    dogName: 'น้องเต้า',
    dogBreed: 'ชิวาว่า',
    handlerName: 'จิราภรณ์ วงศ์ดี',
    vpDetails: {
      '1': { found: true, grade: 'M', score: 0 },
      '2': { found: true, grade: 'V', score: 30 },
      '3': { found: true, grade: 'V', score: 40 },
    },
    vpScore: 70,
    attireScore: 6,
    bonusScore: 15,
    totalScore: 91,
    timeInSeconds: 390,
    notes: 'VP1 เกรด M ไม่ได้คะแนน แต่หาเจอ',
    scoredAt: new Date().toISOString(),
  },

  // Score 9: Dog 9 (คุณหนู) — Fast time (under 60s), V grades
  // VP: 20+30+40=90 | Attire: 10 | Bonus: 10+10+10+5=35 | Total: 135
  {
    id: 109,
    dogId: 9,
    dogName: 'คุณหนู',
    dogBreed: 'พุดเดิ้ล',
    handlerName: 'อนุชา เทพสง่า',
    vpDetails: {
      '1': { found: true, grade: 'V', score: 20 },
      '2': { found: true, grade: 'V', score: 30 },
      '3': { found: true, grade: 'V', score: 40 },
    },
    vpScore: 90,
    attireScore: 10,
    bonusScore: 35,
    totalScore: 135,
    timeInSeconds: 48,
    notes: 'เร็วมาก! ใช้เวลาไม่ถึง 1 นาที',
    scoredAt: new Date().toISOString(),
  },

  // Score 10: Dog 10 (สโนว์) — Slow time (over 500s), SG grades
  // VP: 18.4+27.6+36.8=82.8 | Attire: 10 | Bonus: 10+10=20 | Total: 112.8
  {
    id: 110,
    dogId: 10,
    dogName: 'สโนว์',
    dogBreed: 'ฮัสกี้',
    handlerName: 'รัตนา พิมพ์สวย',
    vpDetails: {
      '1': { found: true, grade: 'SG', score: 18.4 },
      '2': { found: true, grade: 'SG', score: 27.6 },
      '3': { found: true, grade: 'SG', score: 36.8 },
    },
    vpScore: 82.8,
    attireScore: 10,
    bonusScore: 20,
    totalScore: 112.8,
    timeInSeconds: 542,
    notes: 'ใช้เวลานานกว่า 9 นาที แต่ผ่านทุกจุด',
    scoredAt: new Date().toISOString(),
  },

  // Score 11: Dog 11 (ฮาจิ) — All V, fast
  {
    id: 111, dogId: 11, dogName: 'ฮาจิ', dogBreed: 'อะคิตะ', handlerName: 'กิตติพงษ์ รักษาดี',
    vpDetails: { '1': { found: true, grade: 'V', score: 20 }, '2': { found: true, grade: 'V', score: 30 }, '3': { found: true, grade: 'V', score: 40 } },
    vpScore: 90, attireScore: 10, bonusScore: 35, totalScore: 135, timeInSeconds: 68, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 12: Dog 12 (คางุระ) — All SG
  {
    id: 112, dogId: 12, dogName: 'คางุระ', dogBreed: 'ชิบะอินุ', handlerName: 'นภัสสร กลิ่นไผ่',
    vpDetails: { '1': { found: true, grade: 'SG', score: 18.4 }, '2': { found: true, grade: 'SG', score: 27.6 }, '3': { found: true, grade: 'SG', score: 36.8 } },
    vpScore: 82.8, attireScore: 10, bonusScore: 25, totalScore: 117.8, timeInSeconds: 155, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 13: Dog 13 (ทาโร่) — V/V/G, VP2 missed
  {
    id: 113, dogId: 13, dogName: 'ทาโร่', dogBreed: 'คอร์กี้', handlerName: 'ภาณุพงศ์ สุขสันต์',
    vpDetails: { '1': { found: true, grade: 'V', score: 20 }, '2': { found: false, grade: '', score: 0 }, '3': { found: true, grade: 'G', score: 33.6 } },
    vpScore: 53.6, attireScore: 8, bonusScore: 20, totalScore: 81.6, timeInSeconds: 275, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 14: Dog 14 (ยักษ์) — All V, medium time
  {
    id: 114, dogId: 14, dogName: 'ยักษ์', dogBreed: 'เกรทเดน', handlerName: 'วรรณา ศรีประสิทธิ์',
    vpDetails: { '1': { found: true, grade: 'V', score: 20 }, '2': { found: true, grade: 'V', score: 30 }, '3': { found: true, grade: 'V', score: 40 } },
    vpScore: 90, attireScore: 10, bonusScore: 30, totalScore: 130, timeInSeconds: 190, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 15: Dog 15 (เบียร์) — G grades, slow
  {
    id: 115, dogId: 15, dogName: 'เบียร์', dogBreed: 'เซนต์เบอร์นาร์ด', handlerName: 'สมศักดิ์ มั่นคง',
    vpDetails: { '1': { found: true, grade: 'G', score: 16.8 }, '2': { found: true, grade: 'G', score: 25.2 }, '3': { found: true, grade: 'G', score: 33.6 } },
    vpScore: 75.6, attireScore: 6, bonusScore: 15, totalScore: 96.6, timeInSeconds: 480, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 16: Dog 16 (สนูปปี้) — SG/V/V
  {
    id: 116, dogId: 16, dogName: 'สนูปปี้', dogBreed: 'บีเกิ้ล', handlerName: 'จันทร์เพ็ญ แก้วมณี',
    vpDetails: { '1': { found: true, grade: 'SG', score: 18.4 }, '2': { found: true, grade: 'V', score: 30 }, '3': { found: true, grade: 'V', score: 40 } },
    vpScore: 88.4, attireScore: 10, bonusScore: 25, totalScore: 123.4, timeInSeconds: 120, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 17: Dog 17 (แจ็ค) — All V, very fast
  {
    id: 117, dogId: 17, dogName: 'แจ็ค', dogBreed: 'แจ็กรัสเซล', handlerName: 'ธีรวัฒน์ ชาญชัย',
    vpDetails: { '1': { found: true, grade: 'V', score: 20 }, '2': { found: true, grade: 'V', score: 30 }, '3': { found: true, grade: 'V', score: 40 } },
    vpScore: 90, attireScore: 10, bonusScore: 35, totalScore: 135, timeInSeconds: 42, notes: 'เร็วที่สุด!', scoredAt: new Date().toISOString(),
  },

  // Score 18: Dog 18 (ไทเกอร์) — B grades, VP1 missed
  {
    id: 118, dogId: 18, dogName: 'ไทเกอร์', dogBreed: 'พิตบull', handlerName: 'พัชรี สุขสม',
    vpDetails: { '1': { found: false, grade: '', score: 0 }, '2': { found: true, grade: 'B', score: 22.2 }, '3': { found: true, grade: 'G', score: 33.6 } },
    vpScore: 55.8, attireScore: 8, bonusScore: 10, totalScore: 73.8, timeInSeconds: 410, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 19: Dog 19 (ข้าวปุ้น) — M grade on VP1, rest V
  {
    id: 119, dogId: 19, dogName: 'ข้าวปุ้น', dogBreed: 'มาลทีส', handlerName: 'ศิริลักษณ์ ดวงใจ',
    vpDetails: { '1': { found: true, grade: 'M', score: 0 }, '2': { found: true, grade: 'V', score: 30 }, '3': { found: true, grade: 'V', score: 40 } },
    vpScore: 70, attireScore: 10, bonusScore: 20, totalScore: 100, timeInSeconds: 340, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 20: Dog 20 (มิกกี้) — SG/V/SG, VP3 missed
  {
    id: 120, dogId: 20, dogName: 'มิกกี้', dogBreed: 'ยอร์กเชียร์', handlerName: 'ชาตรี บุญมาก',
    vpDetails: { '1': { found: true, grade: 'SG', score: 18.4 }, '2': { found: true, grade: 'V', score: 30 }, '3': { found: false, grade: '', score: 0 } },
    vpScore: 48.4, attireScore: 6, bonusScore: 10, totalScore: 64.4, timeInSeconds: 500, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 21: Dog 21 (บูม) — All G
  {
    id: 121, dogId: 21, dogName: 'บูม', dogBreed: 'บอลด็อก', handlerName: 'สายฝน พรหมจริย์',
    vpDetails: { '1': { found: true, grade: 'G', score: 16.8 }, '2': { found: true, grade: 'G', score: 25.2 }, '3': { found: true, grade: 'G', score: 33.6 } },
    vpScore: 75.6, attireScore: 10, bonusScore: 20, totalScore: 105.6, timeInSeconds: 230, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 22: Dog 22 (แบนโจ) — V/V/B
  {
    id: 122, dogId: 22, dogName: 'แบนโจ', dogBreed: 'บาสเซ็ตฮาวด์', handlerName: 'ปิยะ สมบูรณ์',
    vpDetails: { '1': { found: true, grade: 'V', score: 20 }, '2': { found: true, grade: 'V', score: 30 }, '3': { found: true, grade: 'B', score: 29.6 } },
    vpScore: 79.6, attireScore: 8, bonusScore: 25, totalScore: 112.6, timeInSeconds: 185, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 23: Dog 23 (ไคโร) — All V, fast
  {
    id: 123, dogId: 23, dogName: 'ไคโร', dogBreed: 'ไซบีเรียน ฮัสกี้', handlerName: 'ดวงดาว รุ่งเรือง',
    vpDetails: { '1': { found: true, grade: 'V', score: 20 }, '2': { found: true, grade: 'V', score: 30 }, '3': { found: true, grade: 'V', score: 40 } },
    vpScore: 90, attireScore: 10, bonusScore: 30, totalScore: 130, timeInSeconds: 88, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 24: Dog 24 (เร็กซ์) — SG/SG/G
  {
    id: 124, dogId: 24, dogName: 'เร็กซ์', dogBreed: 'อัลลิแดล์ เทอร์เรีย', handlerName: 'อดุลย์ อำนาจ',
    vpDetails: { '1': { found: true, grade: 'SG', score: 18.4 }, '2': { found: true, grade: 'SG', score: 27.6 }, '3': { found: true, grade: 'G', score: 33.6 } },
    vpScore: 79.6, attireScore: 10, bonusScore: 25, totalScore: 114.6, timeInSeconds: 310, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 25: Dog 25 (น้องหมิว) — All V, medium
  {
    id: 125, dogId: 25, dogName: 'น้องหมิว', dogBreed: 'เยอร์มัน เชเพิร์ด', handlerName: 'สุภาพร เจริญสุข',
    vpDetails: { '1': { found: true, grade: 'V', score: 20 }, '2': { found: true, grade: 'V', score: 30 }, '3': { found: true, grade: 'V', score: 40 } },
    vpScore: 90, attireScore: 10, bonusScore: 35, totalScore: 135, timeInSeconds: 145, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 26: Dog 26 (เจ้าเสือ) — V/SG/V, VP2 missed
  {
    id: 126, dogId: 26, dogName: 'เจ้าเสือ', dogBreed: 'โกลเด้น รีทรีเวอร์', handlerName: 'วิญญู สมฤทธิ์',
    vpDetails: { '1': { found: true, grade: 'V', score: 20 }, '2': { found: false, grade: '', score: 0 }, '3': { found: true, grade: 'V', score: 40 } },
    vpScore: 60, attireScore: 10, bonusScore: 15, totalScore: 85, timeInSeconds: 350, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 27: Dog 27 (ช็อกโกแลต) — All SG
  {
    id: 127, dogId: 27, dogName: 'ช็อกโกแลต', dogBreed: 'ลาบราดอร์', handlerName: 'พรชัย อุดมการ',
    vpDetails: { '1': { found: true, grade: 'SG', score: 18.4 }, '2': { found: true, grade: 'SG', score: 27.6 }, '3': { found: true, grade: 'SG', score: 36.8 } },
    vpScore: 82.8, attireScore: 8, bonusScore: 30, totalScore: 120.8, timeInSeconds: 165, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 28: Dog 28 (ทองหยิบ) — G/B/G
  {
    id: 128, dogId: 28, dogName: 'ทองหยิบ', dogBreed: 'เบลเจียน มาลินอยส์', handlerName: 'จารุวรรณ บุญมี',
    vpDetails: { '1': { found: true, grade: 'G', score: 16.8 }, '2': { found: true, grade: 'B', score: 22.2 }, '3': { found: true, grade: 'G', score: 33.6 } },
    vpScore: 72.6, attireScore: 10, bonusScore: 20, totalScore: 102.6, timeInSeconds: 290, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 29: Dog 29 (แพรวา) — V/V/V
  {
    id: 129, dogId: 29, dogName: 'แพรวา', dogBreed: 'บอร์เดอร์ คอลลี่', handlerName: 'ศักดิ์สิทธิ์ ตรีเพชร',
    vpDetails: { '1': { found: true, grade: 'V', score: 20 }, '2': { found: true, grade: 'V', score: 30 }, '3': { found: true, grade: 'V', score: 40 } },
    vpScore: 90, attireScore: 10, bonusScore: 35, totalScore: 135, timeInSeconds: 75, notes: '', scoredAt: new Date().toISOString(),
  },

  // Score 30: Dog 30 (ละมั้ง) — G/G/SG
  {
    id: 130, dogId: 30, dogName: 'ละมั้ง', dogBreed: 'ร็อตไวเลอร์', handlerName: 'กานดา วัฒนประสิทธิ์',
    vpDetails: { '1': { found: true, grade: 'G', score: 16.8 }, '2': { found: true, grade: 'G', score: 25.2 }, '3': { found: true, grade: 'SG', score: 36.8 } },
    vpScore: 78.8, attireScore: 8, bonusScore: 20, totalScore: 106.8, timeInSeconds: 260, notes: '', scoredAt: new Date().toISOString(),
  },
];
