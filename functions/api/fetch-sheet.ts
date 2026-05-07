const ALLOWED_ORIGINS = [
  'https://k9-fun-search.pages.dev',
  'http://localhost:5173',
];

const DEFAULT_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1sqGIsvbYL29iDXVO5dSa9KIglDqlqGJZqKIHMsXG5WI/export?format=csv&gid=1859063378';

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') ?? '';
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Vary': 'Origin',
  };
}

export const onRequestOptions: PagesFunction = async (ctx) =>
  new Response(null, {
    headers: {
      ...corsHeaders(ctx.request),
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

export const onRequestGet: PagesFunction = async (ctx) => {
  const csvUrl = (ctx.env as Record<string, string>)?.SHEET_CSV_URL || DEFAULT_SHEET_CSV_URL;
  const cors = corsHeaders(ctx.request);
  try {
    const res = await fetch(csvUrl, { redirect: 'follow' });
    if (!res.ok) return new Response(`Upstream ${res.status}`, { status: res.status, headers: cors });
    const text = await res.text();
    return new Response(text, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        ...cors,
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch sheet' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  }
};
