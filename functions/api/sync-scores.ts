const DEFAULT_SCORES_URL =
  'https://script.google.com/macros/s/AKfycbwKW1W_CTQu1a2zrxZasX8sJHIotKIM0oj5pbp45BTzONnbPMwxV2-QfEbrHbsibO8GcQ/exec';

export const onRequestOptions: PagesFunction = () =>
  new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

export const onRequestPost: PagesFunction = async (ctx) => {
  const scoresUrl = (ctx.env as Record<string, string>)?.APPS_SCRIPT_URL || DEFAULT_SCORES_URL;
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
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ status: 'error', message: String(err) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
};
