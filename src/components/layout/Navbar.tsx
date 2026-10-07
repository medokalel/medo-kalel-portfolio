import { useCallback, useEffect, useRef, useState } from 'react'
import { brandName, ctaItem, navItems } from '@/content/navigation'
import { cn } from '@/lib/utils'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const ctaStyles = cn(
  'rounded-full bg-linear-135/srgb from-brand-from to-brand-to font-system font-semibold text-white no-underline',
  'transition-[transform,box-shadow] duration-300',
  'hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.4)]',
  focusRing,
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 50)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLElement>(null)

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setIsOpen(false)
    // After Escape / the close button, return focus to the burger. After a link click the
    // browser moves focus to the target section, so we leave it alone.
    if (restoreFocus) burgerRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the drawer is open: focus it, trap Tab, close on Escape / when the desktop layout
  // kicks in, and lock the page scroll behind it.
  useEffect(() => {
    if (!isOpen) return

    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu(true)
        return
      }
      if (event.key !== 'Tab' || !drawerRef.current) return

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>('a[href], button')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const desktop = window.matchMedia('(min-width: 48rem)')
    const onBreakpointChange = () => {
      if (desktop.matches) setIsOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpointChange)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpointChange)
    }
  }, [isOpen, closeMenu])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[1030] transition-[background-color,padding] duration-300 ease-in-out',
          scrolled
            ? 'bg-nav-scrolled py-[0.65rem] shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-[12px]'
            : 'bg-transparent py-4',
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-8"
        >
          <a
            href="#"
            className={cn(
              'shrink-0 font-system text-[1.5rem] font-bold text-accent no-underline',
              'transition-opacity duration-300 hover:opacity-85',
              focusRing,
            )}
          >
            {brandName}
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  'relative font-system text-[0.95rem] font-medium text-fg-muted no-underline',
                  'transition-colors duration-300 hover:text-fg',
                  'after:absolute after:-bottom-1 after:start-0 after:h-0.5 after:w-0 after:rounded-xs',
                  'after:bg-linear-135/srgb after:from-brand-from after:to-brand-to',
                  'after:transition-[width] after:duration-300 hover:after:w-full',
                  focusRing,
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <a
              href={ctaItem.href}
              className={cn(ctaStyles, 'px-[1.4rem] py-[0.55rem] text-[0.9rem] whitespace-nowrap max-md:hidden')}
            >
              {ctaItem.label}
            </a>
            <button
              ref={burgerRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(true)}
              className={cn(
                'cursor-pointer border-0 bg-transparent px-[0.65rem] py-[0.45rem] text-[1.1rem] leading-none text-fg-muted',
                'transition-colors duration-300 hover:text-fg md:hidden',
                focusRing,
              )}
            >
              <i className="fas fa-bars" aria-hidden="true"></i>
            </button>
          </div>
        </nav>
      </header>

      <aside
        id="mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!isOpen}
        className={cn(
          'fixed end-0 top-0 z-[1100] h-screen w-[300px] border-s border-line bg-drawer',
          'shadow-[-10px_0_40px_rgba(0,0,0,0.5)] rtl:shadow-[10px_0_40px_rgba(0,0,0,0.5)]',
          'transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full',
        )}
      >
        <div className="flex flex-col gap-6 p-6">
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={() => closeMenu(true)}
            className={cn(
              'mb-4 cursor-pointer self-end border-0 bg-transparent p-2 text-[1.5rem] text-fg-muted',
              'transition-colors duration-300 hover:text-fg',
              focusRing,
            )}
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>

          <nav aria-label="Mobile" className="flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => closeMenu(false)}
                className={cn(
                  'py-2 font-system text-[1.1rem] font-medium text-fg-muted no-underline',
                  'transition-colors duration-300 hover:text-fg',
                  focusRing,
                )}
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaItem.href}
              onClick={() => closeMenu(false)}
              className={cn(ctaStyles, 'mt-4 px-6 py-[0.8rem] text-center text-base')}
            >
              {ctaItem.label}
            </a>
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          aria-hidden="true"
          onClick={() => closeMenu(true)}
          className="fixed inset-0 z-[1050] animate-fade-in bg-overlay"
        />
      )}
    </>
  )
}