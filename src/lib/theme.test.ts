import { describe, expect, it, vi } from 'vitest'
import { getTheme, setTheme, subscribeTheme, themeStorageKey } from './theme'

describe('theme', () => {
  it('defaults to dark when nothing is set', () => {
    expect(getTheme()).toBe('dark')
  })

  it('applies, persists and announces a change', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeTheme(listener)

    setTheme('light')

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem(themeStorageKey)).toBe('light')
    expect(getTheme()).toBe('light')
    expect(listener).toHaveBeenCalledTimes(1)

    unsubscribe()
    setTheme('dark')
    expect(listener).toHaveBeenCalledTimes(1)
  })
})