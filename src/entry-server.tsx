/**
 * Prerender entry (built with `vite build --ssr`, run by scripts/prerender.mjs).
 * Renders every public page to static HTML so crawlers, link previews and slow connections get real content.
 * The browser then renders the app over it (createRoot) exactly as before.
 */
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom'
import { projectIds } from '@/content/project-ids'
import { languages, localizePath, supportedLanguages, type Language } from '@/i18n/config'
import i18n from '@/i18n'
import { getPageMeta, type PageMeta } from '@/lib/pageMeta'
import { routes } from '@/routes'

export interface PrerenderedPage extends PageMeta {
  path: string
  html: string
  language: Language
  dir: 'ltr' | 'rtl'
  ogLocale: string
}

/** Language-neutral page paths; each is rendered once per language. */
const basePaths = ['/', '/projects', ...projectIds.map((id) => `/projects/${id}`)]

export const prerenderPaths = supportedLanguages.flatMap((language) =>
  basePaths.map((path) => localizePath(path, language)),
)

export async function render(path: string): Promise<PrerenderedPage> {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`http://localhost${path}`))
  if (context instanceof Response) throw new Error(`Unexpected response ${context.status} while prerendering ${path}`)

  const router = createStaticRouter(handler.dataRoutes, context)
  const html = renderToString(<StaticRouterProvider router={router} context={context} hydrate={false} />)

  const language = i18n.language as Language
  return { path, html, language, dir: languages[language].dir, ogLocale: languages[language].ogLocale, ...getPageMeta(path) }
}
