import { useState, useCallback } from 'react';
import type { Dog } from '../types';
import { safeParse, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'k9_dogs';
const MAX_MANUAL_DOGS = 20;

export function useDogs() {
  const [dogs, setDogs] = useState<Dog[]>(() => safeParse<Dog[]>(STORAGE_KEY) ?? []);

  const persist = (next: Dog[]) => {
    setDogs(next);
    saveToStorage(STORAGE_KEY, next);
  };

  const addDog = useCallback(
    (dog: Omit<Dog, 'id' | 'registeredAt'>): { success: boolean; message?: string } => {
      // Only count manual dogs toward the limit
      const manualCount = dogs.filter(
        (d) => typeof d.id === 'number' || !String(d.id).startsWith('sheet-'),
      ).length;

      if (manualCount >= MAX_MANUAL_DOGS) {
        return { success: false, message: 'เต็มจำนวนแล้ว (20 สุนัข)' };
      }

      const newDog: Dog = {
        ...dog,
        id: Date.now(),
        registeredAt: new Date().toISOString(),
      };

      persist([...dogs, newDog]);
      return { success: true };
    },
    [dogs],
  );

  const deleteDogWithUndo = useCallback(
    (id: number | string) => {
      const dog = dogs.find((d) => d.id === id);
      if (!dog) return null;

      const updated = dogs.filter((d) => d.id !== id);
      persist(updated);

      return {
        dog,
        undo: () => persist([...updated, dog]),
      };
    },
    [dogs],
  );

  const setDogsWithUndo = useCallback(
    (newDogs: Dog[]) => {
      const prev = dogs;
      persist(newDogs);
      return {
        undo: () => persist(prev),
      };
    },
    [dogs],
  );

  return { dogs, addDog, deleteDogWithUndo, setDogsWithUndo };
}
