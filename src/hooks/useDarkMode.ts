import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'k9_dark_mode';

function getInitialState(): boolean {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null) return saved === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(getInitialState);

  // Sync with DOM on mount and when isDark changes
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    // Update theme-color meta tag
    const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (meta) {
      meta.content = isDark ? '#1e1b4b' : '#6366f1';
    }

    localStorage.setItem(STORAGE_KEY, String(isDark));
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return { isDark, toggle };
}
