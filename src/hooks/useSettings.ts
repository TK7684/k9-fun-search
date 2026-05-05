import { useState, useCallback } from 'react';
import type { Settings } from '../types';
import { DEFAULT_SETTINGS } from '../utils/constants';
import { safeParse, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'k9_settings';

function loadSettings(): Settings {
  const stored = safeParse<Settings>(STORAGE_KEY);
  if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
    return { ...DEFAULT_SETTINGS, ...stored };
  }
  return { ...DEFAULT_SETTINGS };
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  const persist = (next: Settings) => {
    setSettings(next);
    saveToStorage(STORAGE_KEY, next);
  };

  const updateSettings = useCallback(
    (partial: Partial<Settings>) => {
      persist({ ...settings, ...partial });
    },
    [settings],
  );

  const resetSettings = useCallback(() => {
    persist({ ...DEFAULT_SETTINGS });
  }, []);

  return { settings, updateSettings, resetSettings };
}
