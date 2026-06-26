# JetRockets — Frontend Trainee Test Assignment

Layout built from the [JetRockets Frontend Trainee Figma mockup](https://www.figma.com/design/1NWvnnpn8RzLjDdv2giz0f/JetRockets---Frontend-Trainee?node-id=0-1).

**Live demo:** <https://danielnichiata96.github.io/jetrockets-frontend-trainee/>

## Stack

Plain **HTML + CSS**, no frameworks. The page itself needs no build step — it
deploys straight to GitHub Pages. The only tooling is an optional Node script
that compresses the hero images (see _Image optimisation_). JavaScript is added
only where an interaction genuinely needs it.

## Project structure

```
.
├── index.html
├── css/
│   ├── reset.css        # predictable cross-browser baseline
│   ├── tokens.css       # design tokens (colors, spacing, type) from Figma
│   ├── base.css         # element defaults + typography
│   ├── layout.css       # two-column auth layout + hero
│   └── components.css    # reusable UI (button, checkbox, badge, …)
├── assets/images/       # served assets: optimised hero .webp + badge .svg
├── src/                 # source: full-res phone + logo SVGs from Figma
└── scripts/
    └── optimize-images.mjs
```

CSS is loaded in cascade order (reset → tokens → base → layout → components) so
specificity stays predictable and values come from a single source of truth.

## Running locally

It's a static site — open `index.html` in a browser, or serve it:

```bash
npx serve .
```

## Image optimisation

Figma exports the phone screenshots and the logo as SVGs with a full-res raster
embedded (~1.2 MB each). A small script rasterises them to WebP (with
transparency) at ~2× their display size — the hero alone drops from
**3.6 MB → ~150 KB**:

```bash
npm install        # installs sharp
npm run optimize:images
```

Sources live in `src/`; the served `.webp` files land in `assets/images/`.

## Decisions & handling the ambiguity

> The brief states the mockup is *intentionally imperfect*. The approach chosen
> was **faithful reproduction + pragmatic polish**: match the design, but fix
> what is clearly a defect and record every change here.

1. **Frame named "Login page", but the content is a sign-up form** ("Create
   account", First/Last name, Confirm password, Terms). Treated it as what it
   *is* — an account-creation screen — and titled the page accordingly.

2. **Empty fields with labels above.** In the Figma component the input boxes
   carried leftover "First name" text, but the rendered mockup shows the boxes
   *empty* with the label sitting above each one. Matched that — empty inputs,
   clear `<label>` per field — rather than reproducing the leftover placeholder.

3. **Field order looked wrong in the JSON, but wasn't.** Reading the JSON, "Last
   name" appeared last. Checking the actual x/y coordinates from the Figma API
   showed the real grid is *First name | Last name* on row one. Verified before
   "fixing" — so the design order was kept as-is.

4. **A calendar icon floated loose**, unattached to any field. Anchored it inside
   the "Date of birth" input, where it was clearly meant to go.

5. **Semantics over pixels for inputs.** Used real `type`s (`password`, etc.),
   `<label for>` associations, and `autocomplete` hints — invisible in the
   mockup but essential for a real, accessible form (and natural in Rails later).

6. **Mixed metaphors kept, not invented away.** "Remember me" / "Forgot
   password?" are unusual on a sign-up screen, but they're in the design, so they
   stay — flagged here rather than silently removed.

7. **Official assets, never redrawn.** The hero phones, logo and Google mark are
   the real exported images — raster-in-SVG compressed to WebP (logo 1.2 MB →
   **3 KB**). The Google Play / App Store badges are the **official vector
   artwork**: store brand guidelines require the real badges, so they're used
   as-is rather than hand-drawn (an early version recreated them — corrected).

## Built with Rails in mind

The deliverable is static, but it's structured so it could drop into a Rails /
Hotwire app with minimal change — which is the growth path this role is about:

- **Component-shaped markup.** Figma's reusable "Entry field" maps 1:1 to a
  `.field` block here, and would become a `FieldComponent` (ViewComponent) /
  partial. The CSS layers (tokens → base → layout → components) mirror that split.
- **Rails param conventions.** Inputs are named `user[first_name]`,
  `user[password_confirmation]`, etc. — exactly what `params.require(:user)`
  strong params expect. The `<form action="/users" method="post">` reflects a
  real `UsersController#create`.
- **Server-driven, no SPA.** Plain form POST, JS kept minimal — the model
  Hotwire/Turbo builds on, rather than a client framework.

## Accessibility

- Semantic structure: `<main>`, `<aside>` (hero), `<header>` (heading);
  `lang` attribute; skip link.
- Real input `type`s + `<label for>` + `autocomplete`; fields `required`.
- Visible keyboard focus, respects `prefers-reduced-motion`.
- **Colour contrast meets WCAG AA.** The design's `#007aff` is only 4.0:1 on
  white (below AA for 14px text), so interactive blue (buttons, links, focus)
  uses `#0f70da` (4.8:1) and control borders are darkened to ≥3:1 (SC 1.4.11).
  The brand `#007aff` stays on the large decorative hero gradient.

## Forms

It's a static site, so `js/main.js` progressively enhances the form: the browser
runs native validation (`required`, `minlength`), then the submit is intercepted
to show a confirmation instead of POSTing to `/users` (which would 404 here). The
Rails-style `action`/field names are kept to show the intended server endpoint.

## Assets

- **Hero artwork** — three real phone screenshots, optimised to WebP and
  layered with the tall one in front.
- **Logo & Google mark** — real exported assets, optimised to WebP (1–3 KB).
- **Store badges** — official Google Play / App Store vector artwork (SVG).
- **Calendar icon** — the design's own SVG, inline for theming.
- **Hero disc** — Figma "Ellipse 2" reproduced as a pure-CSS gradient, with the
  colours/direction sampled from the exported asset (no raster shipped).

## Deployment (GitHub Pages)

```bash
git push -u origin main
```

Then in **Settings → Pages → Source: `main` branch, `/root`**. The site
publishes at `https://<user>.github.io/<repo>/` — add that URL to the
**Live demo** line at the top.
