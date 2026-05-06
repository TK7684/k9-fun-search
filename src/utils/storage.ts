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
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    if (err instanceof DOMException && err.name === 'QuotaExceededError') {
      evictOldestQueueEntries();
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch {
        // truly out of space, nothing more to do
      }
    }
  }
}

// --- Sync Queue ---

export interface SyncQueueEntry {
  id: string;
  action: 'append' | 'sync' | 'clear';
  payload: unknown;
  createdAt: number;
  retryCount: number;
}

const SYNC_QUEUE_KEY = 'k9_sync_queue';

export function getSyncQueue(): SyncQueueEntry[] {
  return safeParse<SyncQueueEntry[]>(SYNC_QUEUE_KEY) ?? [];
}

export function addToSyncQueue(
  entry: Omit<SyncQueueEntry, 'id' | 'createdAt' | 'retryCount'>,
): void {
  const queue = getSyncQueue();
  queue.push({
    ...entry,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    retryCount: 0,
  });
  saveToStorage(SYNC_QUEUE_KEY, queue);
}

export function removeFromSyncQueue(id: string): void {
  const queue = getSyncQueue().filter((e) => e.id !== id);
  saveToStorage(SYNC_QUEUE_KEY, queue);
}

export function clearSyncQueue(): void {
  saveToStorage(SYNC_QUEUE_KEY, []);
}

function evictOldestQueueEntries(): void {
  const queue = getSyncQueue();
  if (queue.length === 0) return;
  // Remove oldest half
  const keep = queue.slice(Math.ceil(queue.length / 2));
  try {
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(keep));
  } catch {
    // still full, clear entirely
    localStorage.removeItem(SYNC_QUEUE_KEY);
  }
}
