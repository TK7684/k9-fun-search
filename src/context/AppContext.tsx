import { createContext, useContext, useState, type ReactNode } from 'react';
import type { MergedDog } from '../types';
import { useDogs } from '../hooks/useDogs';
import { useScores } from '../hooks/useScores';
import { useSettings } from '../hooks/useSettings';
import { useSheetData } from '../hooks/useSheetData';
import { useMergedDogs } from '../hooks/useMergedDogs';
import { useTimer } from '../hooks/useTimer';
import { useDarkMode } from '../hooks/useDarkMode';
import { useToast, type ToastState } from '../hooks/useToast';

export type { ToastState };

type ActiveTab = 'register' | 'judge' | 'leaderboard' | 'settings';

export interface AppContextType {
  // Dogs
  dogs: ReturnType<typeof useDogs>['dogs'];
  addDog: ReturnType<typeof useDogs>['addDog'];
  deleteDogWithUndo: ReturnType<typeof useDogs>['deleteDogWithUndo'];
  setDogsWithUndo: ReturnType<typeof useDogs>['setDogsWithUndo'];

  // Scores
  scores: ReturnType<typeof useScores>['scores'];
  saveScore: ReturnType<typeof useScores>['saveScore'];
  editScore: ReturnType<typeof useScores>['editScore'];
  deleteScoreWithUndo: ReturnType<typeof useScores>['deleteScoreWithUndo'];
  deleteScoresByDogId: ReturnType<typeof useScores>['deleteScoresByDogId'];
  clearAllScores: ReturnType<typeof useScores>['clearAll'];
  manualSync: ReturnType<typeof useScores>['manualSync'];
  setScoresWithUndo: ReturnType<typeof useScores>['setScoresWithUndo'];
  getSortedScores: ReturnType<typeof useScores>['getSortedScores'];
  scoredDogIds: ReturnType<typeof useScores>['scoredDogIds'];

  // Settings
  settings: ReturnType<typeof useSettings>['settings'];
  updateSettings: ReturnType<typeof useSettings>['updateSettings'];
  resetSettings: ReturnType<typeof useSettings>['resetSettings'];

  // Sheet data
  sheetDogs: ReturnType<typeof useSheetData>['sheetDogs'];
  sheetLastFetch: ReturnType<typeof useSheetData>['sheetLastFetch'];
  fetchSheetData: ReturnType<typeof useSheetData>['fetchSheetData'];
  isFetching: ReturnType<typeof useSheetData>['isFetching'];
  fetchError: ReturnType<typeof useSheetData>['fetchError'];

  // Merged dogs
  mergedDogs: MergedDog[];

  // Timer
  timer: ReturnType<typeof useTimer>;

  // Dark mode
  darkMode: ReturnType<typeof useDarkMode>;

  // Toast
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  showToastWithUndo: (message: string, undo: () => void) => void;
  performUndo: () => void;
  dismissToast: () => void;

  // Navigation / UI state
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  editingScoreId: number | null;
  setEditingScoreId: (id: number | null) => void;

  // Sync status — wired after sync-engine merge
  hasPendingSyncs: boolean;
  syncQueueLength: number;
  offlineMode: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const dogsApi = useDogs();
  const scoresApi = useScores();
  const settingsApi = useSettings();
  const sheetApi = useSheetData();
  const timerApi = useTimer();
  const darkModeApi = useDarkMode();
  const toastApi = useToast();

  const mergedDogs = useMergedDogs(dogsApi.dogs, sheetApi.sheetDogs);

  const [activeTab, setActiveTab] = useState<ActiveTab>('register');
  const [editingScoreId, setEditingScoreId] = useState<number | null>(null);

  const value: AppContextType = {
    // Dogs
    dogs: dogsApi.dogs,
    addDog: dogsApi.addDog,
    deleteDogWithUndo: dogsApi.deleteDogWithUndo,
    setDogsWithUndo: dogsApi.setDogsWithUndo,

    // Scores
    scores: scoresApi.scores,
    saveScore: scoresApi.saveScore,
    editScore: scoresApi.editScore,
    deleteScoreWithUndo: scoresApi.deleteScoreWithUndo,
    deleteScoresByDogId: scoresApi.deleteScoresByDogId,
    clearAllScores: scoresApi.clearAll,
    manualSync: scoresApi.manualSync,
    setScoresWithUndo: scoresApi.setScoresWithUndo,
    getSortedScores: scoresApi.getSortedScores,
    scoredDogIds: scoresApi.scoredDogIds,

    // Settings
    settings: settingsApi.settings,
    updateSettings: settingsApi.updateSettings,
    resetSettings: settingsApi.resetSettings,

    // Sheet
    sheetDogs: sheetApi.sheetDogs,
    sheetLastFetch: sheetApi.sheetLastFetch,
    fetchSheetData: sheetApi.fetchSheetData,
    isFetching: sheetApi.isFetching,
    fetchError: sheetApi.fetchError,

    // Merged
    mergedDogs,

    // Timer
    timer: timerApi,

    // Dark mode
    darkMode: darkModeApi,

    // Toast
    toast: toastApi.toast,
    showToast: toastApi.showToast,
    showToastWithUndo: toastApi.showToastWithUndo,
    performUndo: toastApi.performUndo,
    dismissToast: toastApi.dismiss,

    // Navigation / UI state
    activeTab,
    setActiveTab,
    editingScoreId,
    setEditingScoreId,

    // Sync status
    hasPendingSyncs: scoresApi.hasPendingSyncs,
    syncQueueLength: scoresApi.syncQueueLength,
    offlineMode: false,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}
