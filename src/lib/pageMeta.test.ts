import { beforeAll, describe, expect, it } from 'vitest'
import i18n from '@/i18n'
import { projectIds } from '@/content/project-ids'
import { getPageMeta } from '@/lib/pageMeta'

describe('getPageMeta', () => {
  beforeAll(async () => {
    await i18n.changeLanguage('en')
  })

  it('uses the site title and description on the home page', () => {
    const meta = getPageMeta('/')
    expect(meta.title).toBe(i18n.t('meta.title'))
    expect(meta.description).toBe(i18n.t('meta.description'))
  })

  it('gives the projects page and every case study its own title', async () => {
    const home = getPageMeta('/').title
    expect(getPageMeta('/projects').title).not.toBe(home)
    for (const id of projectIds) {
      const title = getPageMeta(`/projects/${id}`).title
      expect(title).toContain('Case Study')
      expect(title).not.toBe(home)
    }

    await i18n.changeLanguage('ar')
    expect(getPageMeta('/ar/projects/velora').title).toContain('دراسة حالة')
    await i18n.changeLanguage('en')
  })

  it('keeps descriptions search-snippet sized', () => {
    for (const id of projectIds) expect(getPageMeta(`/projects/${id}`).description.length).toBeLessThanOrEqual(156)
  })
})
