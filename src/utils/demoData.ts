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

// Lookup table for demo score generation
const VP_PTS: Record<string, [number, number, number]> = {
  'V': [20, 30, 40], 'V-': [19.5, 29, 39],
  'SG+': [19, 28.5, 38], 'SG': [18.5, 28, 37], 'SG-': [18, 27, 36],
  'G+': [17.5, 26, 35], 'G': [17, 25, 34], 'G-': [16, 24, 32],
  'B+': [15.5, 23, 31], 'B': [15, 22, 30], 'B-': [14, 21, 28],
  'M+': [13.5, 20.5, 27], 'M-': [0, 0, 0],
};

function vpScore(grade: string, vp: 1 | 2 | 3): number {
  return (VP_PTS[grade] ?? [0, 0, 0])[vp - 1] ?? 0;
}

function makeVp(found: boolean, grade: string, vp: 1 | 2 | 3) {
  return { found, grade: found ? grade : '', score: found ? vpScore(grade, vp) : 0 };
}

export const demoScores: Score[] = [
  // 1. มอลลี่ — V/V/V, all bonuses ✓ → VP90 +10 +30 +5 = 135
  {
    id: 101, dogId: 1, dogName: 'มอลลี่', dogBreed: 'เยอร์มัน เชเพิร์ด', handlerName: 'สมชาย ใจดี',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 90, attireScore: 10, timeBonus: 30, bonusScore: 5, totalScore: 135, timeInSeconds: 48,
    notes: 'ทำได้ยอดเยี่ยม!', scoredAt: new Date().toISOString(),
  },
  // 2. แม็กซ์ — V/V/V, vp1+vp2+allFound ✓ → VP90 +8 +30 +0 = 128
  {
    id: 102, dogId: 2, dogName: 'แม็กซ์', dogBreed: 'โกลเด้น รีทรีเวอร์', handlerName: 'วิชัย กล้าหาญ',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 90, attireScore: 8, timeBonus: 30, bonusScore: 0, totalScore: 128, timeInSeconds: 102,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 3. ลูน่า — SG/SG/SG, allFound+down ✓ → VP83.5 +10 +10 +5 = 108.5
  {
    id: 103, dogId: 3, dogName: 'ลูน่า', dogBreed: 'ลาบราดอร์', handlerName: 'สุดา รักสัตว์',
    vpDetails: { '1': makeVp(true, 'SG', 1), '2': makeVp(true, 'SG', 2), '3': makeVp(true, 'SG', 3) },
    vpScore: 83.5, attireScore: 10, timeBonus: 10, bonusScore: 5, totalScore: 108.5, timeInSeconds: 134,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 4. ร็อคกี้ — V/SG/G, vp1+allFound ✓ → VP82 +10 +20 +0 = 112
  {
    id: 104, dogId: 4, dogName: 'ร็อคกี้', dogBreed: 'เบลเจียน มาลินอยส์', handlerName: 'ประเสริฐ ทำงาน',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'SG', 2), '3': makeVp(true, 'G', 3) },
    vpScore: 82, attireScore: 10, timeBonus: 20, bonusScore: 0, totalScore: 112, timeInSeconds: 178,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 5. เบลล่า — V/V/-(miss), vp1+vp2 ✓ → VP50 +6 +20 +0 = 76
  {
    id: 105, dogId: 5, dogName: 'เบลล่า', dogBreed: 'บอร์เดอร์ คอลลี่', handlerName: 'มานี มีตา',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'V', 2), '3': makeVp(false, '', 3) },
    vpScore: 50, attireScore: 6, timeBonus: 20, bonusScore: 0, totalScore: 76, timeInSeconds: 245,
    notes: 'VP3 ไม่พบ', scoredAt: new Date().toISOString(),
  },
  // 6. โชกุน — G/G/G, allFound+down ✓ → VP76 +8 +10 +5 = 99
  {
    id: 106, dogId: 6, dogName: 'โชกุน', dogBreed: 'ร็อตไวเลอร์', handlerName: 'ธนกร ศรีสุข',
    vpDetails: { '1': makeVp(true, 'G', 1), '2': makeVp(true, 'G', 2), '3': makeVp(true, 'G', 3) },
    vpScore: 76, attireScore: 8, timeBonus: 10, bonusScore: 5, totalScore: 99, timeInSeconds: 210,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 7. ดั๊ก — V/B/SG, vp1 ✓ → VP79 +10 +10 +0 = 99
  {
    id: 107, dogId: 7, dogName: 'ดั๊ก', dogBreed: 'ดอเบอร์แมน', handlerName: 'พิชญา แสงจันทร์',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'B', 2), '3': makeVp(true, 'SG', 3) },
    vpScore: 79, attireScore: 10, timeBonus: 10, bonusScore: 0, totalScore: 99, timeInSeconds: 320,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 8. น้องเต้า — M+/V/V, no bonuses → VP83.5 +6 +0 +0 = 89.5
  {
    id: 108, dogId: 8, dogName: 'น้องเต้า', dogBreed: 'ชิวาว่า', handlerName: 'จิราภรณ์ วงศ์ดี',
    vpDetails: { '1': makeVp(true, 'M+', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 83.5, attireScore: 6, timeBonus: 0, bonusScore: 0, totalScore: 89.5, timeInSeconds: 390,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 9. คุณหนู — V/V/V, all bonuses ✓ → VP90 +10 +30 +5 = 135
  {
    id: 109, dogId: 9, dogName: 'คุณหนู', dogBreed: 'พุดเดิ้ล', handlerName: 'อนุชา เทพสง่า',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 90, attireScore: 10, timeBonus: 30, bonusScore: 5, totalScore: 135, timeInSeconds: 42,
    notes: 'เร็วมาก!', scoredAt: new Date().toISOString(),
  },
  // 10. สโนว์ — SG/SG/SG, no bonuses → VP83.5 +8 +0 +0 = 91.5
  {
    id: 110, dogId: 10, dogName: 'สโนว์', dogBreed: 'ฮัสกี้', handlerName: 'รัตนา พิมพ์สวย',
    vpDetails: { '1': makeVp(true, 'SG', 1), '2': makeVp(true, 'SG', 2), '3': makeVp(true, 'SG', 3) },
    vpScore: 83.5, attireScore: 8, timeBonus: 0, bonusScore: 0, totalScore: 91.5, timeInSeconds: 542,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 11. ฮาจิ — V/V/V, all bonuses ✓ → 135
  {
    id: 111, dogId: 11, dogName: 'ฮาจิ', dogBreed: 'อะคิตะ', handlerName: 'กิตติพงษ์ รักษาดี',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 90, attireScore: 10, timeBonus: 30, bonusScore: 5, totalScore: 135, timeInSeconds: 55,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 12. คางุระ — SG/SG/SG, allFound ✓ → VP83.5 +10 +10 +0 = 103.5
  {
    id: 112, dogId: 12, dogName: 'คางุระ', dogBreed: 'ชิบะอินุ', handlerName: 'นภัสสร กลิ่นไผ่',
    vpDetails: { '1': makeVp(true, 'SG', 1), '2': makeVp(true, 'SG', 2), '3': makeVp(true, 'SG', 3) },
    vpScore: 83.5, attireScore: 10, timeBonus: 10, bonusScore: 0, totalScore: 103.5, timeInSeconds: 155,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 13. ทาโร่ — V/-(miss)/G, vp1 ✓ → VP54 +8 +10 +0 = 72
  {
    id: 113, dogId: 13, dogName: 'ทาโร่', dogBreed: 'คอร์กี้', handlerName: 'ภาณุพงศ์ สุขสันต์',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(false, '', 2), '3': makeVp(true, 'G', 3) },
    vpScore: 54, attireScore: 8, timeBonus: 10, bonusScore: 0, totalScore: 72, timeInSeconds: 275,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 14. ยักษ์ — V/V/V, vp1+vp2+allFound+down ✓ → VP90 +10 +30 +5 = 135
  {
    id: 114, dogId: 14, dogName: 'ยักษ์', dogBreed: 'เกรทเดน', handlerName: 'วรรณา ศรีประสิทธิ์',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 90, attireScore: 10, timeBonus: 30, bonusScore: 5, totalScore: 135, timeInSeconds: 190,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 15. เบียร์ — G/G/G, down ✓ → VP76 +6 +0 +5 = 87
  {
    id: 115, dogId: 15, dogName: 'เบียร์', dogBreed: 'เซนต์เบอร์นาร์ด', handlerName: 'สมศักดิ์ มั่นคง',
    vpDetails: { '1': makeVp(true, 'G', 1), '2': makeVp(true, 'G', 2), '3': makeVp(true, 'G', 3) },
    vpScore: 76, attireScore: 6, timeBonus: 0, bonusScore: 5, totalScore: 87, timeInSeconds: 480,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 16. สนูปปี้ — SG/V/V, vp2+allFound+down ✓ → VP88.5 +10 +20 +5 = 123.5
  {
    id: 116, dogId: 16, dogName: 'สนูปปี้', dogBreed: 'บีเกิ้ล', handlerName: 'จันทร์เพ็ญ แก้วมณี',
    vpDetails: { '1': makeVp(true, 'SG', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 88.5, attireScore: 10, timeBonus: 20, bonusScore: 5, totalScore: 123.5, timeInSeconds: 120,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 17. แจ็ค — V/V/V, all bonuses ✓ → 135
  {
    id: 117, dogId: 17, dogName: 'แจ็ค', dogBreed: 'แจ็กรัสเซล', handlerName: 'ธีรวัฒน์ ชาญชัย',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 90, attireScore: 10, timeBonus: 30, bonusScore: 5, totalScore: 135, timeInSeconds: 38,
    notes: 'เร็วที่สุด!', scoredAt: new Date().toISOString(),
  },
  // 18. ไทเกอร์ — -(miss)/B/G, no bonuses → VP56 +6 +0 +0 = 62
  {
    id: 118, dogId: 18, dogName: 'ไทเกอร์', dogBreed: 'พิตบull', handlerName: 'พัชรี สุขสม',
    vpDetails: { '1': makeVp(false, '', 1), '2': makeVp(true, 'B', 2), '3': makeVp(true, 'G', 3) },
    vpScore: 56, attireScore: 6, timeBonus: 0, bonusScore: 0, totalScore: 62, timeInSeconds: 410,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 19. ข้าวปุ้น — M+/V/V, allFound ✓ → VP83.5 +8 +10 +0 = 101.5
  {
    id: 119, dogId: 19, dogName: 'ข้าวปุ้น', dogBreed: 'มาลทีส', handlerName: 'ศิริลักษณ์ ดวงใจ',
    vpDetails: { '1': makeVp(true, 'M+', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 83.5, attireScore: 8, timeBonus: 10, bonusScore: 0, totalScore: 101.5, timeInSeconds: 340,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 20. มิกกี้ — SG/V/-(miss), vp2 ✓ → VP48.5 +6 +10 +0 = 64.5
  {
    id: 120, dogId: 20, dogName: 'มิกกี้', dogBreed: 'ยอร์กเชียร์', handlerName: 'ชาตรี บุญมาก',
    vpDetails: { '1': makeVp(true, 'SG', 1), '2': makeVp(true, 'V', 2), '3': makeVp(false, '', 3) },
    vpScore: 48.5, attireScore: 6, timeBonus: 10, bonusScore: 0, totalScore: 64.5, timeInSeconds: 500,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 21. บูม — G/G/G, allFound+down ✓ → VP76 +8 +10 +5 = 99
  {
    id: 121, dogId: 21, dogName: 'บูม', dogBreed: 'บอลด็อก', handlerName: 'สายฝน พรหมจริย์',
    vpDetails: { '1': makeVp(true, 'G', 1), '2': makeVp(true, 'G', 2), '3': makeVp(true, 'G', 3) },
    vpScore: 76, attireScore: 8, timeBonus: 10, bonusScore: 5, totalScore: 99, timeInSeconds: 230,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 22. แบนโจ — V/V/B, vp1+vp2+allFound ✓ → VP80 +10 +30 +0 = 120
  {
    id: 122, dogId: 22, dogName: 'แบนโจ', dogBreed: 'บาสเซ็ตฮาวด์', handlerName: 'ปิยะ สมบูรณ์',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'B', 3) },
    vpScore: 80, attireScore: 10, timeBonus: 30, bonusScore: 0, totalScore: 120, timeInSeconds: 185,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 23. ไคโร — V/V/V, all bonuses ✓ → 135
  {
    id: 123, dogId: 23, dogName: 'ไคโร', dogBreed: 'ไซบีเรียน ฮัสกี้', handlerName: 'ดวงดาว รุ่งเรือง',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 90, attireScore: 10, timeBonus: 30, bonusScore: 5, totalScore: 135, timeInSeconds: 88,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 24. เร็กซ์ — SG/SG/G, vp1 ✓ → VP80.5 +10 +10 +0 = 100.5
  {
    id: 124, dogId: 24, dogName: 'เร็กซ์', dogBreed: 'อัลลิแดล์ เทอร์เรีย', handlerName: 'อดุลย์ อำนาจ',
    vpDetails: { '1': makeVp(true, 'SG', 1), '2': makeVp(true, 'SG', 2), '3': makeVp(true, 'G', 3) },
    vpScore: 80.5, attireScore: 10, timeBonus: 10, bonusScore: 0, totalScore: 100.5, timeInSeconds: 310,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 25. น้องหมิว — V/V/V, vp1+vp2+allFound+down ✓ → 135
  {
    id: 125, dogId: 25, dogName: 'น้องหมิว', dogBreed: 'เยอร์มัน เชเพิร์ด', handlerName: 'สุภาพร เจริญสุข',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 90, attireScore: 10, timeBonus: 30, bonusScore: 5, totalScore: 135, timeInSeconds: 145,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 26. เจ้าเสือ — V/-(miss)/V, vp1 ✓ → VP60 +8 +10 +0 = 78
  {
    id: 126, dogId: 26, dogName: 'เจ้าเสือ', dogBreed: 'โกลเด้น รีทรีเวอร์', handlerName: 'วิญญู สมฤทธิ์',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(false, '', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 60, attireScore: 8, timeBonus: 10, bonusScore: 0, totalScore: 78, timeInSeconds: 350,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 27. ช็อกโกแลต — SG/SG/SG, allFound+down ✓ → VP83.5 +10 +10 +5 = 108.5
  {
    id: 127, dogId: 27, dogName: 'ช็อกโกแลต', dogBreed: 'ลาบราดอร์', handlerName: 'พรชัย อุดมการ',
    vpDetails: { '1': makeVp(true, 'SG', 1), '2': makeVp(true, 'SG', 2), '3': makeVp(true, 'SG', 3) },
    vpScore: 83.5, attireScore: 10, timeBonus: 10, bonusScore: 5, totalScore: 108.5, timeInSeconds: 165,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 28. ทองหยิบ — G/B/G, vp1 ✓ → VP73 +8 +10 +0 = 91
  {
    id: 128, dogId: 28, dogName: 'ทองหยิบ', dogBreed: 'เบลเจียน มาลินอยส์', handlerName: 'จารุวรรณ บุญมี',
    vpDetails: { '1': makeVp(true, 'G', 1), '2': makeVp(true, 'B', 2), '3': makeVp(true, 'G', 3) },
    vpScore: 73, attireScore: 8, timeBonus: 10, bonusScore: 0, totalScore: 91, timeInSeconds: 290,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 29. แพรวา — V/V/V, all bonuses ✓ → 135
  {
    id: 129, dogId: 29, dogName: 'แพรวา', dogBreed: 'บอร์เดอร์ คอลลี่', handlerName: 'ศักดิ์สิทธิ์ ตรีเพชร',
    vpDetails: { '1': makeVp(true, 'V', 1), '2': makeVp(true, 'V', 2), '3': makeVp(true, 'V', 3) },
    vpScore: 90, attireScore: 10, timeBonus: 30, bonusScore: 5, totalScore: 135, timeInSeconds: 75,
    notes: '', scoredAt: new Date().toISOString(),
  },
  // 30. ละมั้ง — G/G/SG, vp1+allFound ✓ → VP79 +8 +20 +0 = 107
  {
    id: 130, dogId: 30, dogName: 'ละมั้ง', dogBreed: 'ร็อตไวเลอร์', handlerName: 'กานดา วัฒนประสิทธิ์',
    vpDetails: { '1': makeVp(true, 'G', 1), '2': makeVp(true, 'G', 2), '3': makeVp(true, 'SG', 3) },
    vpScore: 79, attireScore: 8, timeBonus: 20, bonusScore: 0, totalScore: 107, timeInSeconds: 260,
    notes: '', scoredAt: new Date().toISOString(),
  },
];
