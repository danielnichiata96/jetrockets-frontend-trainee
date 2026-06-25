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

> The brief states the mockup is *intentionally imperfect*. This section records
> the judgment calls I made so they can be reviewed.

- _(example)_ The mockup left spacing inconsistent between cards; I standardized
  to the 8px scale defined in `tokens.css` for visual rhythm.
- _(add each decision as you build — what was ambiguous, what you chose, why.)_

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`), `lang` attribute, skip link.
- Visible keyboard focus, respects `prefers-reduced-motion`.
- _(track contrast / alt text / heading order as the layout grows.)_

## Deployment (GitHub Pages)

1. Push to GitHub.
2. **Settings → Pages → Source: `main` branch, `/root`.**
3. The site publishes at `https://<user>.github.io/<repo>/`.
