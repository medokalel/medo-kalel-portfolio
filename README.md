# Mohamed Khalel — Portfolio

Personal portfolio of Mohamed Khalel, a front-end developer. Bilingual (English / Arabic with full RTL), light and dark themes, responsive, and accessible.

**Live site:** https://medo-kalel-portfolio.vercel.app

## Features

- Home page: hero, about, tech stack, featured projects, journey, services, contact form
- All-projects page with category filter (`/projects`)
- English (default) and Arabic with RTL layout, persisted in `localStorage`
- Light and dark theme, persisted, applied before first paint (no flash)
- Contact form with validation and EmailJS delivery
- Accessibility: skip link, landmarks, focus management, reduced-motion support, WCAG AA contrast (checked with axe in both themes and both languages)
- SEO: meta description, Open Graph, Twitter card, canonical, JSON-LD, `robots.txt`

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19, TypeScript (strict) |
| Build | Vite |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`), `clsx` + `tailwind-merge` + `class-variance-authority` |
| Routing | React Router 7 |
| i18n | i18next, react-i18next, i18next-browser-languagedetector |
| Fonts | Inter (Latin), IBM Plex Sans Arabic via `@fontsource` (Arabic) |
| Email | EmailJS |
| Tests | Vitest, Testing Library, jsdom |

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env     # Windows cmd: copy .env.example .env
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

### Environment variables

Copy `.env.example` to `.env` and fill in the values. `.env` is git-ignored.

| Variable | Description |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_SITE_URL` | Public site URL without trailing slash, used for canonical and Open Graph tags |

Variables prefixed with `VITE_` are embedded in the browser bundle, so never put private keys in them. After changing `.env`, restart the dev server. On Vercel, add the same variables under *Project → Settings → Environment Variables* and redeploy.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production (`dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |

## Project structure

```
src/
├─ components/
│  ├─ home/        # Page sections (Hero, About, Projects, Contact, ...)
│  ├─ layout/      # Layout, Navbar, Footer
│  ├─ projects/    # ProjectCard
│  └─ ui/          # Button, LanguageSwitcher, ThemeToggle, ScrollToTop
├─ content/        # Non-text data: project list, skills, links, tech stack
├─ hooks/          # useLanguage, useTheme
├─ i18n/           # i18next setup and locales/{en,ar}.json
├─ lib/            # utils (cn), validation, theme
├─ pages/          # HomePage, ProjectsPage
├─ styles/         # design-system.css (tokens), swiper.css
├─ test/           # Test setup
├─ App.tsx         # Router
└─ main.tsx        # Entry point
```

Rule of thumb: **text lives in `src/i18n/locales`, data (ids, dates, URLs, icons) lives in `src/content`**, and components combine the two.

## Internationalization

- Supported languages are defined in `src/i18n/config.ts`. English is the default; only a language the visitor explicitly picked (saved in `localStorage` as `portfolio-language`) is used.
- Changing the language updates `<html lang>`, `<html dir>`, the page title, and the description / Open Graph meta tags.
- Keys are typed from `en.json`, so a missing or misspelled key fails `tsc`.

**Add or change text**

1. Add the key to `en.json`.
2. Add the same key to `ar.json`.
3. Use it with `t('section.key')`.

`npm test` fails if the two files drift apart (missing keys, empty values, mismatched `{{placeholders}}`).

**Add a language**: add it to `languages` in `config.ts`, create `locales/<code>.json`, register it in `src/i18n/index.ts`, and add its font to the font tokens in `src/index.css` if needed.

**RTL**: use logical utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `border-s`) instead of `left`/`right`, and `rtl:` variants for things that must flip (arrows, translations).

## Theming and design tokens

All colors and fonts are tokens in `src/styles/design-system.css`:

- Runtime variables live in `:root` (dark, default) and `[data-theme="light"]`.
- Tailwind utilities (`bg-page`, `text-fg`, `text-fg-muted`, `border-line`, `bg-card`, `text-accent-fg`, `border-ink/10`, ...) read those variables, so they switch with the theme automatically.
- Do not hard-code colors in components. Use `text-accent-fg` / `text-success-fg` for text and `bg-accent` / `border-accent` for fills and borders.

The theme is stored under `portfolio-theme`. A small inline script in `index.html` applies it before first paint.

## Testing

```bash
npm test
```

Covers form validation, locale file consistency (English vs Arabic), theme persistence, and the language and theme switchers.

## Deployment

The site is deployed on Vercel from the `main` branch. Set the four environment variables above in the Vercel project, then push to `main` or redeploy. `vercel.json` rewrites every path to `index.html` so client-side routes such as `/projects` work on refresh and direct links.

## Known limitations

- The Testimonials section is disabled until real testimonials exist.
- The language is not part of the URL, so there is no `hreflang` and search engines see the English version. Adding `/ar` routes is the way to fix this.