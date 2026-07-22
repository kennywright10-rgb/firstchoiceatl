# First Choice — Local SEO Site

Static site for First Choice, a local SEO agency for home service businesses (plumbing, HVAC, electrical, roofing, etc.). No build step — plain HTML/CSS/JS.

## Structure

- `index.html`, `services.html`, `service-maps.html`, `service-reputation.html`, `service-ai.html`, `service-website.html`, `audit.html`, `book-a-call.html` — the 8 pages
- `styles.css` — shared design system (colors, layout, components) used by every page
- `site.js` — shared nav, announcement bar, footer, form-submit handler, and testimonial carousel, injected at runtime into every page

Editing the header, footer, or global styles only requires changing `site.js` / `styles.css` — the individual HTML pages don't need to be touched.

## Before going live

Both `audit.html` and `book-a-call.html` post to Formspree with a placeholder form ID:

```
action="https://formspree.io/f/YOUR_FORM_ID"
```

Replace `YOUR_FORM_ID` in both files with your real Formspree form IDs before launch.

## Deploying to Vercel

1. Push this folder to a GitHub repo (see commands below).
2. In Vercel: **New Project → Import** the GitHub repo.
3. Framework Preset: **Other**. Build Command: leave blank. Output Directory: leave blank.
4. Deploy.

### Push to GitHub (run in git bash)

```bash
cd "/c/Users/ken/AppData/Roaming/Claude/local-agent-mode-sessions/88022b2f-2b47-4100-aa66-e6ec04d37f13/b21fc09e-3e25-469c-b69d-760fde4ad2b2/local_62f0cb03-baea-4827-a748-686912d03763/outputs"
git init
git add .
git commit -m "Initial commit: First Choice site"
git branch -M main
git remote add origin https://github.com/kennywright10-rgb/firstchoiceatl.git
git push -u origin main
```

GitHub may prompt for authentication (browser sign-in or a personal access token as the password) on the `push` step — that's expected.
