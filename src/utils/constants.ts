import type { Settings } from '../types';

export const SHEET_CSV_URL = import.meta.env.VITE_SHEET_CSV_URL || '/api/fetch-sheet';
export const SCORES_SHEET_URL = import.meta.env.VITE_APPS_SCRIPT_URL || '/api/sync-scores';
export const SHEET_REFRESH_INTERVAL = 5 * 60 * 1000;

export const LOGO_URL =
  'https://scontent.fbkk8-2.fna.fbcdn.net/v/t39.30808-6/488547076_982669337363036_1385396827900255936_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeFIP7FZuajEuqnJ-sx7VbXCzSPpN-3pIbLNI-k37ekhsv1R3rKopIQYQCPjN7KRiXyukulCkobil-F_aQQpq39h&_nc_ohc=UyasoZfbTjoQ7kNvwGPz9CX&_nc_oc=AdoGSibWn8px4-biPmNUUvUzyq80MVxhxaR0i1l7vPvBoGzfhZ6TUWtNeA2aLSb0a0kUrmk53jQxELDPIMUNvPH1&_nc_zt=23&_nc_ht=scontent.fbkk8-2.fna&_nc_gid=taQ4px5KNpvRjs6_9oawQQ&_nc_ss=7b2a8&oh=00_Af4nF8eYylVUlV9CzKUsCprvP8dfzHoyIr263yhBVg9TaA&oe=69FEA363';

export const DEFAULT_SETTINGS: Settings = {
  vp1Points: 20,
  vp2Points: 30,
  vp3Points: 40,
  gradeV: 100,
  gradeSG: 92,
  gradeG: 84,
  gradeB: 74,
  gradeM: 0,
  attireRequired: 2,
  attireBonus: 2,
  attireMax: 10,
  bonusVp1: 10,
  bonusVp2: 10,
  bonusAll: 10,
  bonusDown: 5,
};
