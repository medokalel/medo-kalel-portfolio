import type { CSSProperties } from 'react'

/**
 * Scroll-reveal helper. Spread the result on any element:
 *
 *   <div {...reveal()}>…</div>          // fade/slide in when scrolled into view
 *   <div {...reveal(120)}>…</div>       // same, with a 120ms delay (stagger)
 *
 * The animation itself lives in `src/styles/design-system.css` and only runs when the user has NOT asked for
 * reduced motion. With reduced motion (or no IntersectionObserver) the content is simply visible.
 */
let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        ;(entry.target as HTMLElement).dataset.revealed = ''
        observer?.unobserve(entry.target)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )
  return observer
}

function attach(el: HTMLElement | null) {
  if (!el || 'revealed' in el.dataset) return
  if (typeof IntersectionObserver === 'undefined') {
    el.dataset.revealed = ''
    return
  }
  const io = getObserver()
  io.observe(el)
  return () => io.unobserve(el)
}

export function reveal(delayMs = 0) {
  return {
    'data-reveal': '',
    ref: attach,
    style: delayMs ? ({ '--reveal-delay': `${delayMs}ms` } as CSSProperties) : undefined,
  }
}
