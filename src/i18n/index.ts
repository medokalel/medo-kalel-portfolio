import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { defaultLanguage, isLanguage, languages, storageKey, supportedLanguages } from './config'
import ar from './locales/ar.json'
import en from './locales/en.json'

/** Keeps <html lang> and <html dir> in sync with the active language (RTL for Arabic). */
function applyDocumentLanguage(lng: string) {
  const language = isLanguage(lng) ? lng : defaultLanguage
  document.documentElement.lang = language
  document.documentElement.dir = languages[language].dir
  document.title = i18n.t('meta.title')
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ar: { translation: ar } },
    supportedLngs: supportedLanguages,
    fallbackLng: defaultLanguage,
    // English by default: only a language the visitor explicitly chose (saved) is used.
    detection: { order: ['localStorage'], lookupLocalStorage: storageKey, caches: ['localStorage'] },
    load: 'languageOnly',
    interpolation: { escapeValue: false }, // React already escapes
  })

applyDocumentLanguage(i18n.resolvedLanguage ?? defaultLanguage)
i18n.on('languageChanged', applyDocumentLanguage)

export default i18n