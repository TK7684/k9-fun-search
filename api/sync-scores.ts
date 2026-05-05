import type { VercelRequest, VercelResponse } from '@vercel/node';

const SCORES_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbylJ2fe32lDVft5StZnHUJg6aFQBqwjYoq37FveObmXbqKHOxpVWYGNNVLp92RvtaDBrA/exec';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const upstream = await fetch(SCORES_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body,
      redirect: 'follow',
    });
    const data = await upstream.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    return res.status(upstream.status).send(data);
  } catch (err) {
    return res.status(502).json({ status: 'error', message: String(err) });
  }
}
