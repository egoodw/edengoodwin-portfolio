# Website — Update & Validation Checklist

Things that need to be verified, updated, or decided before the site goes live.
Edit `js/content.js` for all text changes. See inline comments there for guidance.

---

## Content to Verify

- [x] **ORCID** — `0000-0001-5680-468X` confirmed correct (verified via orcid.org)
- [ ] **h-index** — currently `"4"` in content.js; confirm or correct (identityB sidebar now matches)
- [x] **Citations** — ~240 confirmed; `citations` and `stats.citations` are consistent
- [x] **Publication count** — `07` = published only (4 of 11 PUBS entries are in-prep/in-submission); both hero and cvStats now show `07`
- [x] **Talk count** — `stats.talks = "11"` (invited/seminars, shown in hero) vs `cvStats "21"` (all contributed, shown in CV strip) — both correct for their context
- [x] **Patent count** — 3 patents in PATENTS array; no hero stat needed (decision: not adding one)
- [x] **Available date** — "Fall 2026" confirmed
- [x] **lastUpdated / siteVersion** — updated to `2026-05-07` / `v. 2026.05`
- [x] **Email address** — `eden.goodwin@carleton.ca` confirmed
- [x] **Mailing address** — Steacie Building, 1125 Colonel By Dr confirmed

---

## Sections to Complete

- [ ] **Publications (PUBS array, sections.jsx)** — verify all 11 entries are correct and up-to-date; add DOI links where missing
- [ ] **Patents (PATENTS array, sections.jsx)** — verify all 3 entries; add filing/grant dates if available
- [ ] **CV entries (CV_ITEMS, sections.jsx)** — review education, positions, grants, awards, presentations, mentorship, service for accuracy
- [ ] **Interactive demos (DemosSection)** — currently showing placeholder boxes; wire up actual mol-viewer / slider components when ready
- [ ] **Headshots** — three `<Placeholder>` components across the layout variations need real photos
- [ ] **CV PDF** — path not yet provided; update `ctaCV` href in `Goodwin Group source.html` once file is ready

---

## Design / Layout Decisions

- [x] **Default variation** — Variation A (Editorial) confirmed; already the default in source.html
- [x] **Dark mode** — confirmed wanted; implementation needed (see below)
- [ ] **Dark mode implementation** — CSS variables are in place; need to add `[data-theme="dark"]` overrides in the main stylesheet and a toggle button (suggest adding to TweaksPanel)
- [ ] **Mobile layout** — test on phone; grid-heavy sections (Variation B, CV) may need responsive breakpoints
- [ ] **VarSwitcher visibility** — decide whether to keep the switcher accessible to visitors at launch, or hide it

---

## Technical Checks

- [ ] Validate that `js/content.js` loads without errors in browser console on first open
- [ ] Confirm Babel standalone (CDN) compiles JSX without warnings in production
- [ ] Test "try sample data" button in QCMpy (`/Website/qcmpy/app.html`) — separate from main site
- [ ] Check all `<a href="#">` links that are still placeholders and replace with real targets

---

## Before Publishing

- [x] **Hosting** — GitHub Pages confirmed
- [ ] Set up GitHub repo and Pages configuration (`gh-pages` branch or `/docs` folder)
- [ ] Add `404.html` for GitHub Pages (React SPA routing fallback if needed)
- [ ] Confirm final domain / URL (custom domain on GitHub Pages, or `username.github.io/...`)
- [ ] Run a spell-check pass on content.js
- [ ] Remove any remaining `// TODO` or placeholder comments from JSX files
