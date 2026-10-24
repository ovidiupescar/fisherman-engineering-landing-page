# BRAIN figure tools

The BRAIN illustration is built from plain SVG components in `src/lib/brain-scene.js` and animated
with Motion in `src/scripts/brain-figure.js` (loaded only on `/projects/brain`). These tools help
check it; nothing here ships with the site.

- `render.mjs` renders the desktop, mobile and preview layouts to `out/*.png` with headless Chrome,
  and writes the social image `public/brain/brain-og.png`.
  `node tools/brain-figure/render.mjs`
- `verify-*.json` are action scripts for the Anatomy skill's `drive.mjs` (headless Chrome against the
  dev server): mode frames on desktop and mobile, tablet layout, keyboard tabs, headings, homepage.
  `node ~/.claude/skills/anatomy/scripts/drive.mjs http://localhost:4321/projects/brain --actions tools/brain-figure/verify-desktop.json --preload tools/brain-figure/full-motion.js --width 1440 --height 1100`
- `full-motion.js` is a preload that makes `prefers-reduced-motion` report "no preference", for
  filming the full animation on a machine that has reduced motion switched on. Leave it out to
  check the reduced-motion path (every step jumps to its end state).
- `assets/hermes-icon-dark.svg` is the official Hermes Agent icon from
  github.com/NousResearch/hermes-agent (`assets/icon-master-dark.svg`), kept as the source of
  `public/brain/hermes-agent.png` (192 px, rendered unmodified).

The Grok Bot characters are placeholders drawn in the Grok Bot style; they are not xAI assets.
