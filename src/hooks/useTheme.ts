import { useSyncExternalStore } from 'react'
import { getTheme, setTheme, subscribeTheme, type Theme } from '@/lib/theme'

export interface UseTheme {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export function useTheme(): UseTheme {
  // Shared store, so every toggle on the page (desktop + mobile menu) stays in sync.
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => 'dark' as const)
  return { theme, setTheme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}