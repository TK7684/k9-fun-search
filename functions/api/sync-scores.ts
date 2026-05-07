const ALLOWED_ORIGINS = [
  'https://k9-fun-search.pages.dev',
  'http://localhost:5173',
];

const DEFAULT_SCORES_URL =
  'https://script.google.com/macros/s/AKfycbwKW1W_CTQu1a2zrxZasX8sJHIotKIM0oj5pbp45BTzONnbPMwxV2-QfEbrHbsibO8GcQ/exec';

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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

export const onRequestPost: PagesFunction = async (ctx) => {
  const scoresUrl = (ctx.env as Record<string, string>)?.APPS_SCRIPT_URL || DEFAULT_SCORES_URL;
  const cors = corsHeaders(ctx.request);
  try {
    const body = await ctx.request.text();
    const res = await fetch(scoresUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body,
      redirect: 'follow',
    });
    const data = await res.text();
    return new Response(data, {
      status: res.status,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  } catch {
    return new Response(JSON.stringify({ status: 'error', message: 'Sync failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  }
};
