import i18n from '@/i18n'
import { stripLanguagePrefix } from '@/i18n/config'
import { projectIds, type ProjectId } from '@/content/project-ids'

export interface PageMeta {
  title: string
  description: string
}

const isProjectId = (value: string | undefined): value is ProjectId =>
  value !== undefined && (projectIds as readonly string[]).includes(value)

/** Shortens text to a search-snippet length, cutting at a word boundary. */
function snippet(text: string, max = 155): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), 0) || max).trimEnd() + '…'
}

/**
 * <title> and description for a URL, in the language i18n is currently set to.
 * Used by the prerender build (static HTML) and by the client after every navigation, so both always agree.
 */
export function getPageMeta(pathname: string): PageMeta {
  // Keys are built from the project id, so they can't be checked against the typed resources at compile time.
  const t = i18n.t.bind(i18n) as unknown as (key: string, options?: object) => string
  const path = stripLanguagePrefix(pathname).replace(/\/$/, '')
  const [, section, id] = path.split('/')

  if (section === 'projects' && isProjectId(id)) {
    const title = t(`projects.items.${id}.title`)
    return {
      title: t('caseStudy.metaTitle', { title }),
      description: snippet(t(`caseStudy.items.${id}.idea`)),
    }
  }
  if (section === 'projects' && !id) {
    return {
      title: `${t('projectsPage.titleStart')} ${t('projectsPage.titleHighlight')} | ${t('brand')}`,
      description: t('projectsPage.subtitle'),
    }
  }
  return { title: t('meta.title'), description: t('meta.description') }
}

function setMeta(selector: string, value: string) {
  document.head.querySelector(selector)?.setAttribute('content', value)
}

/** Writes the page's title and description into <head> (title, description, Open Graph, Twitter). */
export function applyPageMeta(pathname: string) {
  if (typeof document === 'undefined') return
  const { title, description } = getPageMeta(pathname)
  document.title = title
  setMeta('meta[name="description"]', description)
  setMeta('meta[property="og:title"]', title)
  setMeta('meta[property="og:description"]', description)
  setMeta('meta[name="twitter:title"]', title)
  setMeta('meta[name="twitter:description"]', description)
}
