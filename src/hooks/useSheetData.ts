import { useState, useEffect, useCallback, useRef } from 'react';
import type { SheetDog } from '../types';
import { SHEET_CSV_URL, SHEET_REFRESH_INTERVAL } from '../utils/constants';
import { parseCSV, mapSheetRowToDog } from '../utils/csvParser';
import { safeParse, saveToStorage } from '../utils/storage';

const DOGS_KEY = 'k9_sheet_dogs';
const FETCH_KEY = 'k9_sheet_last_fetch';

export function useSheetData() {
  const [sheetDogs, setSheetDogs] = useState<SheetDog[]>(() => safeParse<SheetDog[]>(DOGS_KEY) ?? []);
  const [sheetLastFetch, setSheetLastFetch] = useState<string | null>(() => localStorage.getItem(FETCH_KEY) || null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchSheetData = useCallback(async () => {
    // Abort any in-flight fetch
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsFetching(true);
    setFetchError(null);

    try {
      const response = await fetch(SHEET_CSV_URL, { cache: 'no-store', signal: controller.signal });
      if (!response.ok) throw new Error('HTTP ' + response.status);

      const text = await response.text();
      const prefix = text.substring(0, 100).toLowerCase();
      if (prefix.startsWith('<!doctype html') || prefix.includes('<html')) {
        throw new Error('ได้รับ HTML แทน CSV — กรุณาตั้งค่าการแชร์ Google Sheet เป็น "ทุกคนที่มีลิงก์"');
      }

      const rows = parseCSV(text);

      const dogs: SheetDog[] = [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i]!;
        if (row.length >= 6 && row[5] && row[5].trim()) {
          dogs.push(mapSheetRowToDog(row, i - 1));
        }
      }

      setSheetDogs(dogs);
      setFetchError(null);
      const now = new Date().toISOString();
      setSheetLastFetch(now);
      saveToStorage(DOGS_KEY, dogs);
      localStorage.setItem(FETCH_KEY, now);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const message = err instanceof Error ? err.message : 'ไม่สามารถโหลดข้อมูล';
      setFetchError(message);
    } finally {
      if (abortRef.current === controller) {
        setIsFetching(false);
      }
    }
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    fetchSheetData();

    intervalRef.current = setInterval(fetchSheetData, SHEET_REFRESH_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchSheetData]);

  return { sheetDogs, sheetLastFetch, fetchSheetData, isFetching, fetchError };
}
