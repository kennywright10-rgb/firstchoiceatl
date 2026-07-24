# First Choice — Local SEO Site

Static site for First Choice, a local SEO agency for home service businesses (plumbing, HVAC, electrical, roofing, etc.). No build step — plain HTML/CSS/JS.

## Structure

- `index.html`, `services.html`, `service-maps.html`, `service-reputation.html`, `service-ai.html`, `service-website.html`, `audit.html`, `book-a-call.html`, `guide.html` — the 9 main site pages
- `styles.css` — shared design system (colors, layout, components) used by every main site page
- `site.js` — shared nav, announcement bar, footer, form-submit handler, and testimonial carousel, injected at runtime into every main site page. The announcement bar's "Download the Free Local Visibility Guide" link points to `guide.html`.
- `seoaudit.html` — standalone Google Ads landing page ("AI SEO Services — Atlanta Metro"). Self-contained (own inline CSS/JS, no site nav) so paid traffic can't click away before converting. See `First Choice - Google Ads Plan.docx` for the full campaign plan this page pairs with.
- `guide.html` — a short, dedicated name + email form for people who just want the free guide (as opposed to `audit.html`, which asks for a full business profile for a personalized audit). This is what the top announcement bar links to.
- `winning-the-recommendation.pdf` — the "Winning the Recommendation" lead-magnet guide itself. Once deployed, it's live at `https://firstchoicelocalatl.com/winning-the-recommendation.pdf`. Both `guide.html` and `audit.html` link straight to it on their success screens, and it's the file to link in the Formspree autoresponder email (see below).

Editing the header, footer, or global styles only requires changing `site.js` / `styles.css` — the individual main-site HTML pages don't need to be touched. `seoaudit.html` is intentionally independent of that system and must be edited directly.

## Before going live

`audit.html`, `book-a-call.html`, `guide.html`, and `seoaudit.html` all post to Formspree with a placeholder form ID:

```
action="https://formspree.io/f/YOUR_FORM_ID"
```

Replace `YOUR_FORM_ID` in all three files with real Formspree form IDs before launch. `seoaudit.html` also has a placeholder Google Ads conversion tag (`AW-CONVERSION_ID/CONVERSION_LABEL`) in its inline script — replace that with your real conversion ID/label once the Google Ads conversion action is set up.

## Emailing the guide after someone submits a form

Both `guide.html` and `audit.html` show an instant "Download Your Free Guide Now" button on their success screens, so the person gets the PDF the moment they submit, no email required.

To *also* email them the link, turn on Formspree's autoresponder:

1. Log in to Formspree and open the form all four forms share (form ID `xqeryerj`, or whichever ID is live in the `action=` attribute across `guide.html`, `audit.html`, `book-a-call.html`, and `seoaudit.html`).
2. Go to **Settings → Plugins** and turn on **Autoresponder / Confirmation Email**. (This is available on Formspree's paid plans; the free plan only sends a basic default confirmation without a custom link.)
3. Set:
   - **Subject:** `Your Free Local Visibility Guide is here`
   - **Message:**
     ```
     Hi {{first_name}},

     Thanks for your interest in First Choice! Here's your copy of Winning the Recommendation, our guide to how AI decides which local businesses to recommend, and what to do about it:

     https://firstchoicelocalatl.com/winning-the-recommendation.pdf

     Talk soon,
     The First Choice Team
     ```
4. Formspree sends this automatically to whatever address is in each form's `email` field.

**Heads up:** because all four forms currently point at the same Formspree endpoint, turning on the autoresponder sends this exact message to *everyone* who submits *any* form on the site, including audit and book-a-call requests, not just guide requests. That's harmless here since the message is just "here's the guide" and works as a nice bonus for every lead. If you'd rather guide requests get a distinct message from audit/book-a-call requests, create a second Formspree form, point `guide.html`'s `action=` at that new endpoint, and set a different autoresponder on each.

If you're on Formspree's free plan and don't want to upgrade just for this, the on-page download link on both `guide.html` and `audit.html` is already live and doesn't require any Formspree plugin.

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
