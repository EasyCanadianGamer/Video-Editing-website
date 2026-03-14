/* =============================================
   Cloudflare Pages Function — /api/collabs
   Set YT_API_KEY in: Cloudflare Dashboard →
   Your Project → Settings → Environment Variables
   ============================================= */

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const ids  = url.searchParams.get('ids');

  if (!ids) {
    return new Response(JSON.stringify({ error: 'Missing ids param' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ytUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ids}&key=${env.YT_API_KEY}`;
  const ytRes  = await fetch(ytUrl);
  const data   = await ytRes.json();

  return new Response(JSON.stringify(data), {
    status: ytRes.status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // cache 1 hour
    },
  });
}
