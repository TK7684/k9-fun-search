const SCORES_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbylJ2fe32lDVft5StZnHUJg6aFQBqwjYoq37FveObmXbqKHOxpVWYGNNVLp92RvtaDBrA/exec';

export const onRequestOptions: PagesFunction = () =>
  new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

export const onRequestPost: PagesFunction = async (ctx) => {
  try {
    const body = await ctx.request.text();
    const res = await fetch(SCORES_SHEET_URL, {
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
