import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      inert={!isVisible}
      className={cn(
        'fixed end-6 bottom-6 z-[999] flex size-12 cursor-pointer items-center justify-center rounded-full border-0 bg-accent text-lg text-white',
        'shadow-[0_4px_12px_rgba(139,92,246,0.4)] transition-all duration-300',
        'hover:scale-110 hover:bg-[#7c3aed] hover:shadow-[0_6px_16px_rgba(139,92,246,0.5)] active:scale-95',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        'max-[768px]:end-4 max-[768px]:bottom-4 max-[768px]:size-11 max-[768px]:text-base',
        isVisible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-5 opacity-0',
      )}
    >
      <i className="fa-solid fa-chevron-up" aria-hidden="true" />
    </button>
  )
}