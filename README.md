# JetRockets — Frontend Trainee Test Assignment

Layout built from the [JetRockets Frontend Trainee Figma mockup](https://www.figma.com/design/1NWvnnpn8RzLjDdv2giz0f/JetRockets---Frontend-Trainee?node-id=0-1).

**Live demo:** _add GitHub Pages URL here_

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
├── src/hero/            # source: full-res phone SVGs exported from Figma
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

Figma exports the hero phones as SVGs with a full-res raster embedded (~1.2 MB
each). A small script rasterises them to WebP (with transparency) at ~2× their
display size, taking the hero from **3.6 MB → ~150 KB**:

```bash
npm install        # installs sharp
npm run optimize:images
```

Sources live in `src/hero/`; the served `.webp` files land in `assets/images/`.

## Decisions & handling the ambiguity

> The brief states the mockup is *intentionally imperfect*. The approach chosen
> was **faithful reproduction + pragmatic polish**: match the design, but fix
> what is clearly a defect and record every change here.

1. **Frame named "Login page", but the content is a sign-up form** ("Create
   account", First/Last name, Confirm password, Terms). Treated it as what it
   *is* — an account-creation screen — and titled the page accordingly.

2. **Every input's placeholder said "First name"** — a leftover from the Figma
   master component (instances overrode only the label, not the inner text).
   Replaced each with a placeholder that matches its field (e.g. Password →
   "Password", e-mail → `bill.sanders@example.com`). Clear defect → fixed.

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

7. **Images are placeholders for now.** The app screenshots, store badges and
   logo bitmap are raster assets in Figma. They're rendered as styled
   placeholders pending export via the Figma API (see _Next steps_).

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

- Semantic landmarks (`header`, `main`, `footer`), `lang` attribute, skip link.
- Real input `type`s + `<label for>` + `autocomplete`; required fields marked.
- Visible keyboard focus, respects `prefers-reduced-motion`.
- _(track contrast / alt text / heading order as the layout grows.)_

## Asset status

- **Hero artwork** — three real phone screenshots exported from Figma, optimised
  to WebP and layered with the tall one in front.
- **Store badges** — rebuilt as inline-style SVGs (`assets/images/badge-*.svg`).
- **Logo** — a colourful placeholder mark stands in for the brand bitmap
  (pending a manual export of the small logo image).

> Note: the design values (colours, type, spacing, positions) were read from the
> Figma REST API. Its per-token cost quota was later exhausted, so the raster
> assets were exported manually from Figma rather than pulled via the API.

## Next steps

- Swap the logo placeholder for the exported `logo.png`.
- Publish to GitHub Pages and add the live URL above.

## Deployment (GitHub Pages)

1. Push to GitHub.
2. **Settings → Pages → Source: `main` branch, `/root`.**
3. The site publishes at `https://<user>.github.io/<repo>/`.
