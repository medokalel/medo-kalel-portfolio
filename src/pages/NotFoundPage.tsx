import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main id="main" className="flex min-h-screen flex-col bg-page px-4 py-6">
      <div className="site-container flex w-full items-center justify-end gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Numerals stay LTR even in Arabic */}
        <p
          dir="ltr"
          aria-hidden="true"
          className="mb-4 bg-linear-135/srgb from-brand-from to-brand-to bg-clip-text font-system text-[7rem] leading-none font-extrabold text-transparent max-md:text-[5rem]"
        >
          404
        </p>
        <h1 className="mb-3 font-system text-[2rem] leading-[1.2] font-extrabold text-fg max-md:text-[1.6rem]">
          {t('notFound.title')}
        </h1>
        <p className="mb-8 max-w-[420px] font-system text-[1.05rem] leading-[1.6] text-fg-muted">
          {t('notFound.description')}
        </p>
        <Link to="/" className={cn(buttonVariants({ size: 'md' }), 'gap-2 font-system')}>
          <i className="fas fa-arrow-left rtl:rotate-180" aria-hidden="true" />
          {t('notFound.backHome')}
        </Link>
      </div>
    </main>
  )
}
