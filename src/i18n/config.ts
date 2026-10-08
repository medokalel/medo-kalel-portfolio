export const languages = {
  en: { label: 'English', nativeLabel: 'English', dir: 'ltr' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
} as const

export type Language = keyof typeof languages
export type Direction = (typeof languages)[Language]['dir']

export const defaultLanguage: Language = 'en'
export const supportedLanguages = Object.keys(languages) as Language[]
export const storageKey = 'portfolio-language'

export const isLanguage = (value: string | undefined): value is Language =>
  value !== undefined && value in languages