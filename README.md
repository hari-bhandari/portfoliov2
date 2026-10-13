# Hari Bhandari · Portfolio

Source for [haribhandari.me](https://haribhandari.me): software engineering, AI safety research and selected work.

Built with Gatsby 5, React 18 and styled-components. The terrain animation on the home and research pages is
hand-written WebGL (about 5 KB gzipped), loaded only when the browser is idle and paused whenever it is off-screen.

## Run locally

Requires Node 20 or 22 (see `.nvmrc`).

```bash
npm install
npm run develop      # http://localhost:3000
npm run build        # production build into public/
npm run serve        # serve the production build
```

## Editing content

All copy lives in `src/content/`, so most updates need no code changes.

| File              | What it holds                                                           |
| ----------------- | ----------------------------------------------------------------------- |
| `profile.json`    | Headline, introduction, metrics, about text, education, links           |
| `experience.json` | Roles and dates, responsibilities                                       |
| `projects.json`   | Case studies (with architecture diagrams), more work, venture, archive  |
| `research.json`   | SafeScout, roadmap, publications, interests                             |
| `skills.json`     | Skills grouped by how they are used                                     |

Each featured project gets its own page at `/projects/<slug>/`. Its `diagram` is a small grid of nodes and edges,
rendered as SVG by `src/components/Diagram.js`.

Before publishing, run:

```bash
npm run check:content            # structure and house style (no em dashes)
npm run check:content -- --links # also checks every external link and DOI
```

## Structure

```
src/
  content/        JSON content
  components/     Layout, navigation, cards, diagrams, research components
  components/scene/  WebGL terrain scene and its lazy-loading wrapper
  hooks/motion.js Scroll reveal, pointer tilt, reduced-motion helpers
  pages/          Home, projects, research, experience, about, contact, 404
  templates/      Case study page
  styles/         Global styles and theme tokens (dark and light)
scripts/
  make-assets.mjs   Regenerates the favicon and Open Graph image
  check-content.mjs Content checks
```

## Motion and accessibility

- Animations are short, eased and transform or opacity based. With `prefers-reduced-motion`, scroll reveals and
  tilts are disabled and the terrain renders as a single still frame.
- Light and dark themes follow the system setting, with a toggle that is remembered.
- Semantic landmarks, a skip link, visible focus styles and keyboard-operable navigation throughout.
