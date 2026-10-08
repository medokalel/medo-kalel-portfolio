import { useTranslation } from 'react-i18next'
import { defaultLanguage, isLanguage, languages, type Direction, type Language } from '@/i18n/config'

export interface UseLanguage {
  language: Language
  dir: Direction
  setLanguage: (language: Language) => void
  /** The other supported language (there are two), for a simple toggle. */
  otherLanguage: Language
}

export function useLanguage(): UseLanguage {
  const { i18n } = useTranslation()
  const language = isLanguage(i18n.resolvedLanguage) ? i18n.resolvedLanguage : defaultLanguage
  return {
    language,
    dir: languages[language].dir,
    setLanguage: (next) => void i18n.changeLanguage(next),
    otherLanguage: language === 'en' ? 'ar' : 'en',
  }
}