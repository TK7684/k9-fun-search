import type { SheetDog } from '../types';

const MAX_CSV_SIZE = 1 * 1024 * 1024; // 1 MB

export function parseCSV(csvText: string): string[][] {
  if (csvText.length > MAX_CSV_SIZE) {
    throw new Error('ไฟล์ CSV มีขนาดใหญ่เกินไป (เกิน 1 MB)');
  }
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const ch = csvText[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < csvText.length && csvText[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(cell.trim());
        cell = '';
      } else if (ch === '\r' || ch === '\n') {
        row.push(cell.trim());
        if (row.some((c) => c.length > 0)) rows.push(row);
        row = [];
        cell = '';
        if (ch === '\r' && i + 1 < csvText.length && csvText[i + 1] === '\n') i++;
      } else {
        cell += ch;
      }
    }
  }
  row.push(cell.trim());
  if (row.some((c) => c.length > 0)) rows.push(row);

  return rows;
}

export function mapSheetRowToDog(row: string[], index: number): SheetDog {
  return {
    id: 'sheet-' + index,
    dogName: (row[5] || '').trim(),
    dogBreed: (row[6] || '').trim(),
    handlerName: (row[2] || '').trim(),
    registeredAt: row[0] || '',
    source: 'sheet',
    extra: {
      email: (row[1] || '').trim(),
      phone: (row[3] || '').trim(),
      lineId: (row[4] || '').trim(),
      dogAge: (row[7] || '').trim(),
      dogSex: (row[8] || '').trim(),
      photoLink: (row[12] || '').trim(),
    },
  };
}
