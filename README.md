# Video Editor Portfolio Template

A clean, dark portfolio site for video editors. Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools. Deploy anywhere in minutes.

**[Live Demo](https://canadiangamer.pages.dev)** · Built by [Canadian Gamer](https://www.youtube.com/@CanadianGamer)

![Preview](assets/CG-Blurple-bg.png)

---

## Features

- Animated particle/constellation hero background
- Glassmorphism cards with hover effects
- Services & pricing section
- Portfolio reel links
- **Dynamic collaborators section** — pulls YouTube channel names & avatars via API
- Contact section (Discord, Twitter/X, Email)
- Ko-fi support button
- Fully responsive (mobile hamburger menu)
- Custom font support (MadeTommy or any local font)
- Works on Cloudflare Pages, Netlify, or GitHub Pages (static only)

---

## Getting Started

### 1. Clone or download

```bash
git clone https://github.com/your-username/video-editor-portfolio.git
cd video-editor-portfolio
```

### 2. Swap in your assets

| File | What to replace |
|---|---|
| `assets/pfp.png` | Your profile photo |
| `assets/CG-white-logo.png` | Your logo (white version) |
| `assets/CG-Blurple-bg.png` | Your hero background image |
| `assets/Davinci-Resolve-logo.jpeg` | Your tools' logos |

### 3. Edit your info

Open `index.html` and update:
- Name, bio, and tagline
- Service prices
- Contact handles (Discord, Twitter, email)
- YouTube channel URL
- Ko-fi URL in the footer
- Copyright name in the footer

### 4. Set your fonts

Drop your font files into `fonts/` and update the `@font-face` rules at the top of `css/style.css`.

---

## Dynamic Collaborators (YouTube API)

The "Channels I've Worked With" section fetches real channel names and avatars from YouTube.

### Step 1 — Get a YouTube Data API v3 key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → enable **YouTube Data API v3**
3. Create an API key → restrict it to your domain

### Step 2 — Add your channel IDs

Open `js/config.js` and add the YouTube channel IDs of channels you've worked with:

```js
const YT_CONFIG = {
  collabChannelIds: [
    'UCxxxxxxxxxxxxxxxxxxxxxxxx', // Channel 1
    'UCxxxxxxxxxxxxxxxxxxxxxxxx', // Channel 2
  ],
};
```

> To find a channel ID: go to their YouTube channel → view page source → search for `"channelId"`

### Step 3 — Set your API key on your platform

**Never put the API key in your code.** Set it as an environment variable named `YT_API_KEY`:

| Platform | Where |
|---|---|
| **Cloudflare Pages** | Dashboard → Project → Settings → Environment Variables |
| **Netlify** | Dashboard → Site → Site Configuration → Environment Variables |

The `/api/collabs` endpoint is handled by:
- `functions/api/collabs.js` — Cloudflare Pages
- `netlify/functions/collabs.js` + `netlify.toml` — Netlify

> **GitHub Pages** doesn't support serverless functions. If you deploy there, the collabs section won't load — you can hardcode the channel cards in `index.html` instead.

---

## Deployment

### Cloudflare Pages
1. Push repo to GitHub
2. Connect repo in Cloudflare Pages dashboard
3. Set `YT_API_KEY` environment variable
4. Deploy — the `functions/` folder is picked up automatically

### Netlify
1. Push repo to GitHub
2. Connect repo in Netlify dashboard
3. Set `YT_API_KEY` environment variable
4. Deploy — `netlify.toml` handles the rest

### GitHub Pages (static only)
1. Go to repo Settings → Pages → Deploy from branch
2. Select `main` / `root`
3. Note: the collaborators section requires a platform that supports serverless functions

---

## Project Structure

```
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js          # navbar, scroll animations, hamburger
│   ├── particles.js     # hero canvas particle system
│   ├── collabs.js       # YouTube API → collab cards
│   └── config.js        # your channel IDs (safe to commit)
├── functions/
│   └── api/
│       └── collabs.js   # Cloudflare Pages Function
├── netlify/
│   └── functions/
│       └── collabs.js   # Netlify Function
├── netlify.toml
├── assets/              # images, logos, fonts
└── fonts/
    └── made_tommy/
```

---

## Customisation Tips

- **Colors** — all accent colors are CSS variables at the top of `style.css`. Change `--accent-primary`, `--accent-red`, and `--accent-blue` to match your brand.
- **Particles** — tweak speed, count, and colors in `js/particles.js`
- **Services** — add or remove service cards in the `#services` section of `index.html`
- **Collab tag logic** — the "Longform" / "TikTok" tag is auto-detected from the channel description in `js/collabs.js`. You can override it manually per channel.

---

## License

MIT — see [LICENSE](LICENSE)
