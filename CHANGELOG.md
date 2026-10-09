# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] - 2026-10-09

Major revamp: Bootstrap → Tailwind CSS v4, JavaScript → TypeScript, Arabic/RTL support, light/dark themes, SEO, accessibility, and tests.

### Added

- Language in the URL: Arabic at `/ar/*`, `hreflang` alternates, per-page canonical, generated `sitemap.xml` and `robots.txt`.
- Social preview image (`public/og-image.png`), 404 page, `vercel.json` SPA rewrites, scroll restoration between routes.
- Arabic translation with full RTL layout, IBM Plex Sans Arabic, and a language switcher (English remains the default).
- Typed i18n (i18next + react-i18next); translation keys are checked at compile time.
- Light and dark themes with a toggle, persistence, and no flash on load.
- Design tokens in `src/styles/design-system.css`, shared by both themes.
- Contact form validation with accessible inline errors, focus on the first invalid field, and EmailJS configuration through environment variables.
- SEO: localized title and description, Open Graph, Twitter card, canonical URL, JSON-LD, `robots.txt`.
- Accessibility: `<main>` landmark, skip-to-content link, sr-only heading on the projects page, WCAG AA color contrast in both themes.
- Test suite (Vitest + Testing Library): validation, locale parity, theme, switchers.
- `README.md` and this changelog.
- Download CV button in the About section (language-aware, files in public/cv/)

### Changed

- Language detection now follows the URL; the saved preference only redirects returning Arabic visitors.
- Project images converted to WebP (about 3.6 MB → 106 KB total) and lazy-loaded.
- `/projectspage` renamed to `/projects` (old URL redirects).

#### Bootstrap → Tailwind CSS v4

- Removed Bootstrap, React-Bootstrap, and the legacy Bootstrap stylesheet layer.
- Replaced all CSS Modules and component stylesheets with Tailwind utilities; remaining shared CSS lives in `design-system.css` and `swiper.css`.
- Introduced `cn()` (`clsx` + `tailwind-merge`) and `class-variance-authority` for component variants (`Button`).
- Replaced physical `left`/`right` spacing with logical utilities (`start`/`end`, `ms`/`me`) so the layout mirrors in RTL.
- Verified pixel parity of the English dark theme against the Bootstrap version section by section. The only intentional difference: `h3` line-height, re-applied explicitly because Bootstrap's reboot used to set it.

#### JavaScript → TypeScript

- Converted every `.js` / `.jsx` file to `.ts` / `.tsx` and enabled strict mode (`erasableSyntaxOnly`, `verbatimModuleSyntax`); removed `allowJs`.
- Added the `@` → `src` import alias.
- Moved hard-coded data out of components into typed modules in `src/content/` (projects, services, journey, tech stack, profile).
- Restructured into `components/{home,layout,projects,ui}`, `pages`, `hooks`, `lib`, `i18n`, `styles`.
- Typed environment variables in `vite-env.d.ts`.

#### Other

- Favicon now points to `/favicon.svg` from `public/`.
- Mobile menu drawer only casts a shadow while open.

### Removed

- Privacy and Terms footer links.
- Bootstrap, React-Bootstrap, `legacy-bootstrap.css`, `App.css`, all `*.module.css` files, the `Template/` folder, and `generate-react-cli.json`.
- EmailJS keys hard-coded in `Contact.jsx` (moved to `.env`).

### Security

- EmailJS credentials moved out of source into environment variables. EmailJS public keys are visible in the browser by design; restrict allowed domains in the EmailJS dashboard. If the old keys were ever pushed to a public repository, consider rotating them.

### Migration notes

- Create `.env` from `.env.example` (see README), and set the same variables on Vercel before deploying.
- `npm install` after pulling; `npm uninstall bootstrap react-bootstrap` if they are still listed.