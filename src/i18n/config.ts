export const languages = {
  en: {
    label: 'English',
    nativeLabel: 'English',
    dir: 'ltr',
    locale: 'en-US',
    ogLocale: 'en_US',
  },
  // Arabic text with Western digits (2026), the common choice on Arabic tech sites.
  ar: {
    label: 'Arabic',
    nativeLabel: 'العربية',
    dir: 'rtl',
    locale: 'ar-EG-u-nu-latn',
    ogLocale: 'ar_AR',
  },
} as const

export type Language = keyof typeof languages
export type Direction = (typeof languages)[Language]['dir']

export const defaultLanguage: Language = 'en'
export const supportedLanguages = Object.keys(languages) as Language[]
export const storageKey = 'portfolio-language'

export const isLanguage = (value: string | undefined): value is Language =>
  value !== undefined && value in languages

/* ── URL ↔ language: English lives at the root, other languages under /<code> ── */

const pathPrefix = (language: Language) => (language === defaultLanguage ? '' : `/${language}`)

/** '/ar/projects' → 'ar'; everything else (including '/') → 'en'. */
export function getLanguageFromPath(pathname: string): Language {
  const first = pathname.split('/')[1]
  return isLanguage(first) && first !== defaultLanguage ? first : defaultLanguage
}

/** '/ar/projects' → '/projects' */
export function stripLanguagePrefix(pathname: string): string {
  const prefix = pathPrefix(getLanguageFromPath(pathname))
  return pathname.slice(prefix.length) || '/'
}

/** localizePath('/projects', 'ar') → '/ar/projects'; localizePath('/', 'ar') → '/ar' */
export function localizePath(path: string, language: Language): string {
  const prefix = pathPrefix(language)
  return path === '/' ? prefix || '/' : `${prefix}${path}`
}

/* ── The visitor's explicit choice (saved only when they press the switcher) ── */

export function readStoredLanguage(): Language | null {
  try {
    const value = localStorage.getItem(storageKey)
    return value !== null && isLanguage(value) ? value : null
  } catch {
    return null
  }
}

export function storeLanguage(language: Language) {
  try {
    localStorage.setItem(storageKey, language)
  } catch {
    // Storage can be blocked (private mode): the URL still decides the language.
  }
}
