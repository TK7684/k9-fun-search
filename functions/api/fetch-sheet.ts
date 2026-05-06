const DEFAULT_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1sqGIsvbYL29iDXVO5dSa9KIglDqlqGJZqKIHMsXG5WI/export?format=csv&gid=1859063378';

export const onRequestGet: PagesFunction = async (ctx) => {
  const csvUrl = (ctx.env as Record<string, string>)?.SHEET_CSV_URL || DEFAULT_SHEET_CSV_URL;
  try {
    const res = await fetch(csvUrl, { redirect: 'follow' });
    if (!res.ok) return new Response(`Upstream ${res.status}`, { status: res.status });
    const text = await res.text();
    return new Response(text, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
};
