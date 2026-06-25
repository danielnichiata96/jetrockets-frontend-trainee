# JetRockets — Frontend Trainee Test Assignment

Layout built from the [JetRockets Frontend Trainee Figma mockup](https://www.figma.com/design/1NWvnnpn8RzLjDdv2giz0f/JetRockets---Frontend-Trainee?node-id=0-1).

**Live demo:** _add GitHub Pages URL here_

## Stack

Plain **HTML + CSS** — no frameworks, no build step. The role evaluates raw
layout skill, and a static site deploys directly to GitHub Pages. JavaScript is
added only where an interaction genuinely needs it.

## Project structure

```
.
├── index.html
├── css/
│   ├── reset.css        # predictable cross-browser baseline
│   ├── tokens.css       # design tokens (colors, spacing, type) from Figma
│   ├── base.css         # element defaults + typography
│   ├── layout.css       # container, sections, grids
│   └── components.css    # reusable UI (buttons, cards, …)
└── assets/images/
```

CSS is loaded in cascade order (reset → tokens → base → layout → components) so
specificity stays predictable and values come from a single source of truth.

## Running locally

It's a static site — open `index.html` in a browser, or serve it:

```bash
npx serve .
```

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

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`), `lang` attribute, skip link.
- Visible keyboard focus, respects `prefers-reduced-motion`.
- _(track contrast / alt text / heading order as the layout grows.)_

## Next steps

- Export the raster assets from Figma (app screenshots, Google Play / App Store
  badges, logo) and swap them in for the current placeholders.
- Publish to GitHub Pages and add the live URL above.

## Deployment (GitHub Pages)

1. Push to GitHub.
2. **Settings → Pages → Source: `main` branch, `/root`.**
3. The site publishes at `https://<user>.github.io/<repo>/`.
