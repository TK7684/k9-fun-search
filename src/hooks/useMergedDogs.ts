import { useMemo } from 'react';
import type { Dog, SheetDog, MergedDog } from '../types';

export function useMergedDogs(dogs: Dog[], sheetDogs: SheetDog[]): MergedDog[] {
  return useMemo(() => {
    const allDogs: MergedDog[] = [...sheetDogs];

    const sheetKeys = new Set(
      sheetDogs.map((d) => d.dogName + '|' + d.handlerName),
    );

    for (const d of dogs) {
      const key = d.dogName + '|' + d.handlerName;
      if (!sheetKeys.has(key)) allDogs.push(d);
    }

    return allDogs;
  }, [dogs, sheetDogs]);
}
