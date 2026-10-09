export type ExperienceId = 'casco' | 'depi' | 'selftaught'

export interface Experience {
  id: ExperienceId
  companyLink: string
}

/**
 * Newest first. Timeline sides alternate automatically (first = right/end side).
 * Title, company, period, description and achievements live in the locale files:
 * t(`journey.items.${id}.title`).
 */
export const experiences: readonly Experience[] = [
  { id: 'casco', companyLink: 'https://www.cascotec.com/' },
  { id: 'depi', companyLink: 'https://depi.gov.eg/' },
  { id: 'selftaught', companyLink: '' },
]
