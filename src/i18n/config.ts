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