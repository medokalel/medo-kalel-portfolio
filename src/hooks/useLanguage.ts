import { useTranslation } from 'react-i18next'
import {
  defaultLanguage,
  isLanguage,
  languages,
  localizePath,
  type Direction,
  type Language,
} from '@/i18n/config'

export interface UseLanguage {
  language: Language
  dir: Direction
  /** The other supported language (there are two), for a simple toggle. */
  otherLanguage: Language
  /** Prefixes an internal path with the current language: localize('/projects') → '/ar/projects'. */
  localize: (path: string) => string
}

export function useLanguage(): UseLanguage {
  const { i18n } = useTranslation()
  const language = isLanguage(i18n.resolvedLanguage) ? i18n.resolvedLanguage : defaultLanguage
  return {
    language,
    dir: languages[language].dir,
    otherLanguage: language === 'en' ? 'ar' : 'en',
    localize: (path) => localizePath(path, language),
  }
}
