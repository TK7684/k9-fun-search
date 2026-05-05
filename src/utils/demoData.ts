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
];

export const demoScores: Score[] = [
  {
    id: 101,
    dogId: 1,
    dogName: 'มอลลี่',
    dogBreed: 'เยอร์มัน เชเพิร์ด',
    handlerName: 'สมชาย ใจดี',
    vpDetails: {
      '1': { found: true, grade: 'V', score: 20 },
      '2': { found: true, grade: 'V', score: 30 },
      '3': { found: true, grade: 'SG', score: 27.6 },
    },
    vpScore: 77.6,
    attireScore: 10,
    bonusScore: 25,
    totalScore: 112.6,
    timeInSeconds: 145,
    notes: 'ทำได้ดีมาก!',
    scoredAt: new Date().toISOString(),
  },
];
