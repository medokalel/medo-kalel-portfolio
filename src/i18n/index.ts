import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { defaultLanguage, isLanguage, type Language, languages, supportedLanguages } from './config'
import ar from './locales/ar.json'
import en from './locales/en.json'

function setMeta(selector: string, value: string) {
  document.head.querySelector(selector)?.setAttribute('content', value)
}

/** Keeps description / Open Graph / Twitter tags in the active language (client-side). */
function syncMeta(language: Language) {
  const title = i18n.t('meta.title')
  const description = i18n.t('meta.description')
  setMeta('meta[name="description"]', description)
  setMeta('meta[property="og:title"]', title)
  setMeta('meta[property="og:description"]', description)
  setMeta('meta[property="og:locale"]', languages[language].ogLocale)
  setMeta('meta[name="twitter:title"]', title)
  setMeta('meta[name="twitter:description"]', description)
}

/** Keeps <html lang> and <html dir> in sync with the active language (RTL for Arabic). */
function applyDocumentLanguage(lng: string) {
  const language = isLanguage(lng) ? lng : defaultLanguage
  document.documentElement.lang = language
  document.documentElement.dir = languages[language].dir
  document.title = i18n.t('meta.title')
  syncMeta(language)
}

void i18n
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ar: { translation: ar } },
    supportedLngs: supportedLanguages,
    // The URL decides the language (see the root route loader in App.tsx); English is the default.
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    load: 'languageOnly',
    interpolation: { escapeValue: false }, // React already escapes
  })

applyDocumentLanguage(i18n.resolvedLanguage ?? defaultLanguage)
i18n.on('languageChanged', applyDocumentLanguage)

export default i18n
