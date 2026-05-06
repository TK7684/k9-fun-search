export type DogId = number | string;

export interface Dog {
  id: number;
  dogName: string;
  dogBreed: string;
  handlerName: string;
  registeredAt: string;
}

export interface SheetDog extends Omit<Dog, 'id'> {
  id: string;
  source: 'sheet';
  extra: {
    email: string;
    phone: string;
    lineId: string;
    dogAge: string;
    dogSex: string;
    photoLink: string;
  };
}

export const VP_GRADES = ['V', 'V-', 'SG+', 'SG', 'SG-', 'G+', 'G', 'G-', 'B+', 'B', 'B-', 'M+', 'M-'] as const;
export type VPGrade = typeof VP_GRADES[number];

export interface VPDetail {
  found: boolean;
  grade: VPGrade | '';
  score: number;
}

export interface Score {
  id: number;
  dogId: DogId;
  dogName: string;
  dogBreed: string;
  handlerName: string;
  vpDetails: Record<string, VPDetail>;
  vpScore: number;
  attireScore: number;
  timeBonus: number;
  bonusScore: number;
  totalScore: number;
  timeInSeconds: number;
  notes: string;
  scoredAt: string;
}

export interface Settings {
  vp1Points: number;
  vp2Points: number;
  vp3Points: number;
  gradeV: number;
  gradeSG: number;
  gradeG: number;
  gradeB: number;
  gradeM: number;
  attireRequired: number;
  attireBonus: number;
  attireMax: number;
  bonusVp1: number;
  bonusVp2: number;
  bonusAll: number;
  bonusDown: number;
}

export type VPState = Record<1 | 2 | 3, { found: boolean; grade: VPGrade | '' }>;

export interface AttireState {
  shoes: boolean;
  shirt: boolean;
  pants: boolean;
  hat: boolean;
  gloves: boolean;
}

export interface BonusState {
  vp1: boolean;
  vp2: boolean;
  allFound: boolean;
  down: boolean;
}

export interface ScoreBreakdown {
  vpScore: number;
  attireScore: number;
  timeBonus: number;
  bonusScore: number;
  totalScore: number;
}

export interface MergedDogBase {
  id: DogId;
  dogName: string;
  dogBreed: string;
  handlerName: string;
  registeredAt: string;
}

export type MergedDog = (Dog | SheetDog) & MergedDogBase;
