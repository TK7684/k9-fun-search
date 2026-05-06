import { useMemo } from 'react';
import type { Dog, SheetDog, MergedDog, DogId } from '../types';

export function useMergedDogs(dogs: Dog[], sheetDogs: SheetDog[]): MergedDog[] {
  return useMemo(() => {
    const allDogs: MergedDog[] = [...sheetDogs];

    const normalize = (s: string) => s.trim().toLowerCase();
    const sheetKeys = new Set(
      sheetDogs.map((d) => normalize(d.dogName) + '|' + normalize(d.handlerName)),
    );

    for (const d of dogs) {
      const key = normalize(d.dogName) + '|' + normalize(d.handlerName);
      if (!sheetKeys.has(key)) allDogs.push(d);
    }

    return allDogs;
  }, [dogs, sheetDogs]);
}
