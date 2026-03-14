/* =============================================
   CANADIAN GAMER — collabs.js
   Calls /api/collabs (platform-agnostic endpoint)
   and populates the "Channels I've Worked With" grid
   ============================================= */

async function loadCollabs() {
  const grid = document.querySelector('.collab-grid');
  if (!grid) return;

  const ids = YT_CONFIG.collabChannelIds.join(',');

  try {
    const res  = await fetch(`/api/collabs?ids=${ids}`);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      console.warn('collabs.js: No channels returned — check your channel IDs');
      return;
    }

    grid.innerHTML = data.items.map(ch => {
      const name   = ch.snippet.title;
      const avatar = ch.snippet.thumbnails.medium?.url || ch.snippet.thumbnails.default?.url;
      const handle = ch.snippet.customUrl || ('channel/' + ch.id);
      const desc   = (ch.snippet.description || '').toLowerCase();
      const tag    = desc.includes('tiktok') || desc.includes('short') ? 'TikTok' : 'Longform';

      return `
        <a href="https://www.youtube.com/${handle}"
           class="collab-card glass-card"
           target="_blank" rel="noopener"
           data-animate>
          <div class="collab-avatar">
            <img src="${avatar}" alt="${name}" class="collab-avatar-img">
          </div>
          <h4>${name}</h4>
          <span class="tag">${tag}</span>
        </a>`;
    }).join('');

    // Re-observe new cards for fade-in animation
    if (window._fadeObserver) {
      grid.querySelectorAll('[data-animate]').forEach(el => window._fadeObserver.observe(el));
    }

  } catch (err) {
    console.error('collabs.js: Failed to fetch channel data', err);
  }
}

document.addEventListener('DOMContentLoaded', loadCollabs);
