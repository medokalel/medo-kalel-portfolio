import { describe, expect, it } from 'vitest'
import { getLanguageFromPath, localizePath, readStoredLanguage, storeLanguage, stripLanguagePrefix } from './config'

describe('language in the URL', () => {
  it.each([
    ['/', 'en'],
    ['/projects', 'en'],
    ['/ar', 'ar'],
    ['/ar/projects', 'ar'],
    ['/arabic', 'en'],
  ])('getLanguageFromPath(%s) = %s', (path, language) => {
    expect(getLanguageFromPath(path)).toBe(language)
  })

  it.each([
    ['/ar', '/'],
    ['/ar/projects', '/projects'],
    ['/projects', '/projects'],
    ['/', '/'],
  ])('stripLanguagePrefix(%s) = %s', (path, stripped) => {
    expect(stripLanguagePrefix(path)).toBe(stripped)
  })

  it('localizePath adds the prefix for Arabic only', () => {
    expect(localizePath('/', 'en')).toBe('/')
    expect(localizePath('/', 'ar')).toBe('/ar')
    expect(localizePath('/projects', 'ar')).toBe('/ar/projects')
    expect(localizePath('/projects', 'en')).toBe('/projects')
  })

  it('remembers the explicit choice and ignores junk', () => {
    expect(readStoredLanguage()).toBeNull()
    storeLanguage('ar')
    expect(readStoredLanguage()).toBe('ar')
    localStorage.setItem('portfolio-language', 'fr')
    expect(readStoredLanguage()).toBeNull()
  })
})
