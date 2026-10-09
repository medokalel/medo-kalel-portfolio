import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import { languages, localizePath, storeLanguage, stripLanguagePrefix } from '@/i18n/config'
import { cn } from '@/lib/utils'

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const { otherLanguage } = useLanguage()
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  const target = languages[otherLanguage]

  const switchLanguage = () => {
    storeLanguage(otherLanguage) // remember the explicit choice
    void i18n.changeLanguage(otherLanguage)
    // Same page, other language URL (/projects ↔ /ar/projects); keep the scroll position.
    navigate(localizePath(stripLanguagePrefix(pathname), otherLanguage) + search + hash, {
      preventScrollReset: true,
    })
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      // Spoken in the CURRENT language ("Switch language to Arabic"); the visible text is the target's own name.
      aria-label={t('language.switchTo', { language: target.label })}
      className={cn(
        'inline-flex cursor-pointer items-center gap-2 rounded-full border border-fg-muted/30 bg-transparent px-[0.9rem] py-[0.35rem]',
        'text-[0.85rem] font-medium text-fg-muted transition-colors duration-300 hover:border-accent hover:text-accent',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      )}
    >
      <i className="fas fa-globe text-[0.8rem]" aria-hidden="true" />
      <span lang={otherLanguage}>{target.nativeLabel}</span>
    </button>
  )
}
