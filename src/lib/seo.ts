import { defaultLanguage, getLanguageFromPath, localizePath, stripLanguagePrefix, supportedLanguages } from '@/i18n/config'

const siteUrl = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

function upsertLink(attrs: Record<string, string>, href: string) {
  const selector = `link[rel="${attrs.rel}"]` + (attrs.hreflang ? `[hreflang="${attrs.hreflang}"]` : '')
  let link = document.head.querySelector<HTMLLinkElement>(selector)
  if (!link) {
    link = document.createElement('link')
    Object.entries(attrs).forEach(([key, value]) => link!.setAttribute(key, value))
    document.head.appendChild(link)
  }
  link.href = href
}

/** Points canonical, og:url and hreflang alternates at the current page (needs VITE_SITE_URL). */
export function updateSeoLinks(pathname: string) {
  if (!siteUrl) return
  const base = stripLanguagePrefix(pathname)
  const urlFor = (language: (typeof supportedLanguages)[number]) => siteUrl + localizePath(base, language)

  const current = urlFor(getLanguageFromPath(pathname))
  upsertLink({ rel: 'canonical' }, current)
  document.head.querySelector('meta[property="og:url"]')?.setAttribute('content', current)

  supportedLanguages.forEach((language) => upsertLink({ rel: 'alternate', hreflang: language }, urlFor(language)))
  upsertLink({ rel: 'alternate', hreflang: 'x-default' }, urlFor(defaultLanguage))
}
