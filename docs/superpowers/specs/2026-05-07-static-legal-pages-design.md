# Static Legal Pages for Crawlers — Design

**Date:** 2026-05-07
**Status:** Approved
**Scope:** Make `/privacy-policy` and `/terms-and-conditions` discoverable by Meta's developer-app URL crawler (and any other JS-disabled crawler) on a Vite + React Router SPA hosted on GitHub Pages.

## Problem

The site is a client-rendered React SPA. Routing is handled by `react-router-dom` v7. The deploy workflow copies `dist/index.html` to `dist/404.html` so GitHub Pages can serve the SPA shell for any unknown path (the standard SPA-on-GH-Pages trick).

Side effect: when Meta's crawler requests `https://tatachicc.my.id/privacy-policy`, GitHub Pages returns the `404.html` body **with HTTP status 404**. The crawler does not execute JavaScript, so it sees a 404 with no policy content and rejects the URL as undetectable. The same applies to `/terms-and-conditions`.

## Goal

Direct HTTP requests to `/privacy-policy` and `/terms-and-conditions` must return:

- HTTP `200`
- A complete HTML document containing the full policy text in the initial response body (no JS execution required)
- Appropriate `<title>`, `<meta name="description">`, and Open Graph tags for the page

In-app navigation from the SPA homepage must continue to work (current React Router behaviour preserved).

## Non-Goals

- Migrating to Jekyll, Next.js, Astro, or any other framework.
- Server-side rendering or hydration of the existing React components.
- Build-time pre-rendering tooling (`vite-plugin-prerender-spa`, `react-snap`, etc.).
- Changing the deploy workflow.

These were considered and rejected as overkill for two low-volatility legal pages.

## Approach

Add two hand-written, self-contained static HTML files to the `public/` directory. Vite copies `public/` verbatim into `dist/`, so they ship to `gh-pages` unchanged.

### Files

- `public/privacy-policy/index.html`
- `public/terms-and-conditions/index.html`

Placing them in directories named after the route means GitHub Pages serves them at `https://tatachicc.my.id/privacy-policy/` and `https://tatachicc.my.id/terms-and-conditions/`. GH Pages auto-redirects the no-trailing-slash form (`301`) to the trailing-slash form, so both URL shapes resolve.

### File contents

Each file is a complete HTML document, independent of the SPA bundle:

- `<!doctype html>` with `<html lang="en">`.
- `<head>` carries:
  - Page-specific `<title>` (e.g. `Privacy Policy — @tata.chicc`).
  - Page-specific `<meta name="description">`.
  - Open Graph tags (`og:title`, `og:description`, `og:type=website`, `og:url`) pointing at the canonical URL of the page.
  - `<meta name="robots" content="index, follow">`.
  - Favicon links matching `index.html`.
  - A `<style>` block with minimal inline CSS — system font stack, centred max-width container, basic typographic scale, and `prefers-color-scheme` media query for light/dark.
- `<body>` carries:
  - A "Back" link rendered as a plain `<a href="/">` (full-page navigation back to the SPA root).
  - `<h1>` and a "Last updated" line.
  - One `<section>` per clause, mirroring the text in `src/components/PrivacyPolicy.jsx` and `src/components/TermsAndConditions.jsx` exactly.
  - A footer line: `© 2025 @tata.chicc. All rights reserved.`

No external CSS, no JS, no React, no analytics. The pages must be readable by a crawler with the bare HTML alone.

### React routes

`src/App.jsx` keeps both routes:

```jsx
<Route path="/terms-and-conditions" element={<TermsAndConditions />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
```

In-app `<Link>` clicks are intercepted client-side by React Router and never hit GH Pages, so the static files do not conflict with SPA navigation. On a hard refresh of one of those URLs, GH Pages serves the static HTML instead of the React version — an accepted trade-off for legal pages, since the static version is functionally equivalent (just without the theme toggle and animations).

### Deploy workflow

`.github/workflows/deploy.yml` is unchanged. The `cp dist/index.html dist/404.html` step is still required as the SPA fallback for any *other* unknown route.

## Data flow

| Visitor | Request | GH Pages response | Result |
|---|---|---|---|
| Meta crawler | `GET /privacy-policy` | `301` → `/privacy-policy/`, then `200` static HTML | Full policy text in body. URL detected. |
| Direct visitor / refresh | `GET /privacy-policy/` | `200` static HTML | Plain HTML page renders; "Back" link returns to SPA root. |
| In-app SPA user clicks `<Link to="/privacy-policy">` | No HTTP request — client-side route change | React Router renders `PrivacyPolicy.jsx` | Animated React version with theme toggle. |
| Visitor of any other unknown path | `GET /something-else` | `404.html` (which is the SPA shell) | SPA bootstraps and shows the matched route. |

## Verification

1. **Local build:** `pnpm build`. Confirm `dist/privacy-policy/index.html` and `dist/terms-and-conditions/index.html` exist and contain the full policy text.
2. **Local preview:** `pnpm preview`, open `http://localhost:4173/privacy-policy/` and view source — policy text must appear in the initial HTML, not injected by JS.
3. **Production HTTP status:** after deploy, `curl -I https://tatachicc.my.id/privacy-policy` returns `200` (possibly via `301`). `curl -I https://tatachicc.my.id/privacy-policy/` returns `200`.
4. **Production body content:** `curl -sL https://tatachicc.my.id/privacy-policy/ | grep -i "privacy policy"` returns matches from the body, not just the React shell.
5. **In-app navigation regression check:** load the SPA homepage in a browser, click the privacy-policy link, confirm the React version (with theme toggle and animations) renders without a full reload.
6. **Meta resubmit:** re-enter both URLs in the Meta developer app and confirm detection.

## Risks and mitigations

- **Content drift between static HTML and React components.** The text of the policy is duplicated in two places. Mitigation: the policy text is low-volatility (changes maybe once a year). When it does change, update both copies in the same commit. A short reminder in each file's HTML comment will note the canonical sibling.
- **GH Pages trailing-slash redirect not present.** If for some reason the auto-redirect does not fire, Meta would still see the SPA fallback at `/privacy-policy`. Mitigation: verification step 3 catches this; if it fails, point Meta at the trailing-slash URL explicitly.
- **Style mismatch between static and React versions.** Acceptable — they target different audiences (crawlers vs. interactive users).
