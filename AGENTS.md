# AGENTS.md

Single-page landing site for **Gipi's** (baby nests), built with Vite + React 19 + TypeScript. All UI text is Spanish.

## Commands

- `npm run dev` — dev server with HMR
- `npm run build` — **typecheck (`tsc -b`) then `vite build`**. This is the verification step; there is no separate typecheck script.
- `npm run lint` — **oxlint** (not ESLint). No ESLint config exists; do not add ESLint.
- `npm run preview` — serve the built `dist/`

No tests and no CI exist for this repo.

## TS / style constraints

- `verbatimModuleSyntax` is on: use `import type { ... }` for type-only imports (e.g. `ReactNode`, `Variants`).
- `noUnusedLocals` / `noUnusedParameters` are enabled — dead imports/params fail the build.
- React Compiler is **not** enabled; don't add compiler directives expecting it.

## Architecture

- Each page section is a component in `src/components/` (`Hero`, `Products`, `Marquee`, `About`, `Testimonials`, `CTA`, `Navbar`, `Footer`); assembled in `src/App.tsx`.
- `src/components/Reveal.tsx` is the reusable scroll-reveal wrapper (framer-motion `whileInView`).
- Animations use **framer-motion v13** (`motion` / `AnimatePresence`).
- Brand palette (cream/beige) lives as CSS variables in `src/index.css` under `:root`; section/layout styles are in `src/App.css`. Keep new colors as variables there.
- No router, no state management, no API layer — anchors (`#productos`, etc.) link to section ids.