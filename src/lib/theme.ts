export type Theme = 'dark' | 'light'

export const defaultTheme: Theme = 'dark'
export const themeStorageKey = 'portfolio-theme'

/** Browser UI colour (mobile address bar) per theme — keep in sync with --bg-primary. */
const themeColor: Record<Theme, string> = { dark: '#0a0a0f', light: '#f8fafc' }

export const isTheme = (value: string | null | undefined): value is Theme =>
  value === 'dark' || value === 'light'

const listeners = new Set<() => void>()

/** The inline script in index.html sets data-theme before first paint; dark when absent. */
export function getTheme(): Theme {
  const value = document.documentElement.dataset.theme
  return isTheme(value) ? value : defaultTheme
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor[theme])
  try {
    localStorage.setItem(themeStorageKey, theme)
  } catch {
    // Storage can be blocked (private mode): the choice just won't persist.
  }
  listeners.forEach((listener) => listener())
}