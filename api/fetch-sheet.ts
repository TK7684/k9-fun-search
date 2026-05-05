import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1sqGIsvbYL29iDXVO5dSa9KIglDqlqGJZqKIHMsXG5WI/export?format=csv&gid=1859063378';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const upstream = await fetch(SHEET_CSV_URL, { redirect: 'follow' });
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `Upstream ${upstream.status}` });
    }
    const text = await upstream.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    return res.send(text);
  } catch (err) {
    return res.status(502).json({ error: String(err) });
  }
}
