/* =============================================
   Netlify Function — maps to /api/collabs via netlify.toml
   Set YT_API_KEY in: Netlify Dashboard →
   Your Site → Site Configuration → Environment Variables
   ============================================= */

exports.handler = async function (event) {
  const ids = event.queryStringParameters?.ids;

  if (!ids) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing ids param' }),
    };
  }

  const ytUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ids}&key=${process.env.YT_API_KEY}`;
  const ytRes  = await fetch(ytUrl);
  const data   = await ytRes.json();

  return {
    statusCode: ytRes.status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
    body: JSON.stringify(data),
  };
};
