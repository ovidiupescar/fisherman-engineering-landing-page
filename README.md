# Fisherman Engineering Landing Page

Public website for Fisherman Engineering SRL — a safety-critical engineering consultancy focused on automotive safety, robotics safety, embedded software, and AI management systems.

The site is built with Astro and Tailwind CSS. It presents the company positioning, service areas, brand identity, and open-source work such as the Human-Robot Interface project.

## What it includes

- Responsive Astro landing page for Fisherman Engineering
- Six service cards: functional safety, robotics & machinery safety, embedded software & systems integration, systems engineering & architecture, AI transformation & integration, and AI governance & ISO 42001
- AI Transformation capabilities and Engineering Leadership sections
- Selected Engineering Projects: a featured BRAIN card (static SVG preview, no animation runtime) and the open-source HRI robotics stack
- `/projects/brain` case study: an interactive BRAIN illustration (SVG components in `src/lib/brain-scene.js`, Capture / Curate / Retrieve animated with Motion in `src/scripts/brain-figure.js`, desktop and mobile layouts, reduced-motion support) and a sanitized architecture diagram
- FE Signal Halo brand identity assets and design guidelines
- Lightweight static build suitable for simple hosting

## Tech stack

- Astro 5
- Tailwind CSS 4
- TypeScript configuration
- Static assets in `public/`
- Brand source files in `design/`

## Project structure

```text
/
├── design/              Brand assets, logo explorations, and guidelines
├── public/              Static images, icons, and favicon assets
├── src/
│   ├── layouts/         Shared Astro layout
│   ├── pages/           Site pages
│   └── styles/          Global CSS and design tokens
├── astro.config.mjs
├── package.json
└── tailwind.config.mjs
```

## Local development

Install dependencies:

```sh
npm install
```

Run the development server:

```sh
npm run dev
```

Build the production site:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Brand focus

The current visual system uses the FE Signal Halo identity: a technical, high-trust design language for safety engineering across automotive, robotics, and autonomous systems.

## License

Copyright Fisherman Engineering SRL. Public repository for website source and brand presentation.
