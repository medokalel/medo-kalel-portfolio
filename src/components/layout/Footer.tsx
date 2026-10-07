import { brandName } from '@/content/navigation'
import { cn } from '@/lib/utils'

const linkStyles = cn(
  'font-system text-[0.85rem] text-fg-muted no-underline transition-colors duration-300 hover:text-accent',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
)

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-line bg-page px-4 py-6">
      <div className="site-container">
        <div className="flex flex-wrap items-center justify-between gap-4 max-md:flex-col max-md:gap-[0.8rem] max-md:text-center">
          <p className="m-0 font-system text-[0.85rem] text-fg-muted">
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>

          <div className="flex items-center gap-6 max-md:gap-4">
            <a href="#" className={linkStyles}>
              Privacy
            </a>
            <a href="#" className={linkStyles}>
              Terms
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className={cn(
                'inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0',
                linkStyles,
              )}
            >
              Back to Top
              <i className="fas fa-arrow-up text-[0.75rem]" aria-hidden="true"></i>
            </button>
          </div>

          <p className="m-0 flex items-center gap-[0.4rem] font-system text-[0.85rem] text-fg-muted">
            Built with
            <i className="fas fa-heart animate-heartbeat text-[0.75rem] text-heart" aria-label="love" role="img"></i>
            using React &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}