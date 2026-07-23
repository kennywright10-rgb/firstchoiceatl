# First Choice — Local SEO Site

Static site for First Choice, a local SEO agency for home service businesses (plumbing, HVAC, electrical, roofing, etc.). No build step — plain HTML/CSS/JS.

## Structure

- `index.html`, `services.html`, `service-maps.html`, `service-reputation.html`, `service-ai.html`, `service-website.html`, `audit.html`, `book-a-call.html` — the 8 main site pages
- `styles.css` — shared design system (colors, layout, components) used by every main site page
- `site.js` — shared nav, announcement bar, footer, form-submit handler, and testimonial carousel, injected at runtime into every main site page
- `seoaudit.html` — standalone Google Ads landing page ("AI SEO Services — Atlanta Metro"). Self-contained (own inline CSS/JS, no site nav) so paid traffic can't click away before converting. See `First Choice - Google Ads Plan.docx` for the full campaign plan this page pairs with.

Editing the header, footer, or global styles only requires changing `site.js` / `styles.css` — the individual main-site HTML pages don't need to be touched. `seoaudit.html` is intentionally independent of that system and must be edited directly.

## Before going live

`audit.html`, `book-a-call.html`, and `seoaudit.html` all post to Formspree with a placeholder form ID:

```
action="https://formspree.io/f/YOUR_FORM_ID"
```

Replace `YOUR_FORM_ID` in all three files with real Formspree form IDs before launch. `seoaudit.html` also has a placeholder Google Ads conversion tag (`AW-CONVERSION_ID/CONVERSION_LABEL`) in its inline script — replace that with your real conversion ID/label once the Google Ads conversion action is set up.

## Deploying to Vercel

1. Push this folder to a GitHub repo (see commands below).
2. In Vercel: **New Project → Import** the GitHub repo.
3. Framework Preset: **Other**. Build Command: leave blank. Output Directory: leave blank.
4. Deploy.

### Push to GitHub (run in git bash)

The repo is already initialized in this folder and connected to `kennywright10-rgb/firstchoiceatl`. For any future update, just:

```bash
cd "/c/Users/ken/Desktop/claude/First Choice/General"
git add .
git commit -m "Describe what changed"
git push
```

GitHub may prompt for authentication (browser sign-in or a personal access token as the password) — that's expected. Since Vercel is connected to this GitHub repo, every push to `main` triggers a new deployment automatically.
