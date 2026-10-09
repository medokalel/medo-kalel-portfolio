import { describe, expect, it } from 'vitest'
import ar from './locales/ar.json'
import en from './locales/en.json'

/** Flattens nested objects/arrays into `a.b.0` style paths. */
function paths(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object') return [prefix]
  return Object.entries(value).flatMap(([key, child]) => paths(child, prefix ? `${prefix}.${key}` : key))
}

// Arabic has more plural forms than English, so *_zero/_two/_few/_many are allowed to exist only in ar.
const pluralSuffix = /_(zero|one|two|few|many|other)$/
const base = (path: string) => path.replace(pluralSuffix, '')

const valueAt = (locale: unknown, path: string) =>
  path.split('.').reduce<unknown>((node, key) => (node as Record<string, unknown>)[key], locale)

describe('locale files', () => {
  const enBase = new Set(paths(en).map(base))
  const arBase = new Set(paths(ar).map(base))

  it('Arabic has every English key', () => {
    expect([...enBase].filter((key) => !arBase.has(key))).toEqual([])
  })

  it('English has every Arabic key', () => {
    expect([...arBase].filter((key) => !enBase.has(key))).toEqual([])
  })

  it('has no empty strings', () => {
    for (const [name, locale] of Object.entries({ en, ar })) {
      const empty = paths(locale).filter((path) => valueAt(locale, path) === '')
      expect(empty, `empty values in ${name}`).toEqual([])
    }
  })

  it('keeps the same placeholders ({{...}}) in both languages', () => {
    const placeholders = (text: string) => [...text.matchAll(/{{\s*(\w+)\s*}}/g)].map((m) => m[1]).sort()
    for (const path of paths(en)) {
      // Plural forms legitimately differ (Arabic singular/dual can spell the number out).
      if (pluralSuffix.test(path)) continue
      const enText = valueAt(en, path)
      const arText = valueAt(ar, path)
      if (typeof enText === 'string' && typeof arText === 'string') {
        expect(placeholders(arText), path).toEqual(placeholders(enText))
      }
    }
  })
})