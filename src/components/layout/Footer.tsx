import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const linkStyles = cn(
  'font-system text-[0.85rem] text-fg-muted no-underline transition-colors duration-300 hover:text-accent',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
)

export default function Footer() {
  const { t } = useTranslation()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-line bg-page px-4 py-6">
      <div className="site-container">
        <div className="flex flex-wrap items-center justify-between gap-4 max-md:flex-col max-md:gap-[0.8rem] max-md:text-center">
          <p className="m-0 font-system text-[0.85rem] text-fg-muted">
            &copy; {new Date().getFullYear()} {t('brand')}. {t('footer.rights')}
          </p>

          <div className="flex items-center gap-6 max-md:gap-4">
            <a href="#" className={linkStyles}>
              {t('footer.privacy')}
            </a>
            <a href="#" className={linkStyles}>
              {t('footer.terms')}
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className={cn(
                'inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0',
                linkStyles,
              )}
            >
              {t('footer.backToTop')}
              <i className="fas fa-arrow-up text-[0.75rem]" aria-hidden="true"></i>
            </button>
          </div>

          <p className="m-0 flex items-center gap-[0.4rem] font-system text-[0.85rem] text-fg-muted">
            {t('footer.builtWith')}
            <i className="fas fa-heart animate-heartbeat text-[0.75rem] text-brand-pink" aria-label={t('footer.love')} role="img"></i>
            {t('footer.using')}
          </p>
        </div>
      </div>
    </footer>
  )
}