import { describe, expect, it } from 'vitest'
import { projectsData } from '@/content/projects'
import { projectIds } from '@/content/project-ids'
import ar from '@/i18n/locales/ar.json'
import en from '@/i18n/locales/en.json'

const locales = { en, ar } as const

describe('case studies', () => {
  it('has a case study for every project', () => {
    expect(projectsData.map((p) => p.id).sort()).toEqual([...projectIds].sort())
  })

  for (const [name, locale] of Object.entries(locales)) {
    it(`${name}: every project has all sections filled in`, () => {
      for (const id of projectIds) {
        const study = locale.caseStudy.items[id]
        expect(study.idea.length, `${id}.idea`).toBeGreaterThan(80)
        expect(study.role.length, `${id}.role`).toBeGreaterThan(20)
        expect(study.learned.length, `${id}.learned`).toBeGreaterThan(80)
        expect(study.challenges.length, `${id}.challenges`).toBeGreaterThanOrEqual(2)
        expect(study.decisions.length, `${id}.decisions`).toBeGreaterThanOrEqual(2)
        expect(study.outcome.length, `${id}.outcome`).toBeGreaterThanOrEqual(2)
        for (const item of [...study.challenges, ...study.decisions]) {
          expect(item.title.length).toBeGreaterThan(3)
          expect(item.body.length).toBeGreaterThan(40)
        }
      }
    })
  }

  it('both languages have the same number of challenges, decisions and outcomes', () => {
    for (const id of projectIds) {
      for (const field of ['challenges', 'decisions', 'outcome'] as const) {
        expect(ar.caseStudy.items[id][field].length, `${id}.${field}`).toBe(en.caseStudy.items[id][field].length)
      }
    }
  })
})
