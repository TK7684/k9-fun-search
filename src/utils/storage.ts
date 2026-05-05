export function safeParse<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    const data: unknown = JSON.parse(raw);
    return data as T;
  } catch {
    return null;
  }
}

export function saveToStorage(key: string, data: unknown): void {
  localStorage.setItem(key, JSON.stringify(data));
}
