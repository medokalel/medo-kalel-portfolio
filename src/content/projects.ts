// Shared data for all projects.
// Add a new project here and it appears on the home page and the projects page automatically.

import type { ProjectId } from './project-ids'
import ecommerce from '@/assets/images/ecommerce.webp'
import landingPage from '@/assets/images/velora.webp'
import youssefKamelPortfolio from '@/assets/images/youssef-portfolio.webp'
import ahmedSamirPortfolio from '@/assets/images/ahmed-portfolio.webp'
import alexPortfolio from '@/assets/images/alex-portfolio.webp'
import qrLandingPage from '@/assets/images/qr-landing.webp'

export type ProjectCategory = 'ecommerce' | 'landing' | 'portfolio'
export type { ProjectId }

/** Title and description live in the locale files: t(`projects.items.${id}.title`). */
export interface Project {
  id: ProjectId
  category: ProjectCategory
  image: string
  tags: readonly string[]
  liveUrl: string
  codeUrl: string
  /** ISO date, YYYY-MM-DD */
  date: string
}

export const projectsData: readonly Project[] = [
  {
    id: 'ecommerce',
    category: 'ecommerce',
    image: ecommerce,
    tags: ['React', 'JavaScript', 'Bootstrap', 'CSS3'],
    liveUrl: 'https://react-ecommerce-app-sigma.vercel.app/',
    codeUrl: 'https://github.com/medokalel/react-ecommerce-app',
    date: '2026-05-13'
  },
  {
    id: 'velora',
    category: 'landing',
    image: landingPage,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    liveUrl: 'https://medokalel.github.io/velora-coffee/',
    codeUrl: 'https://github.com/medokalel/velora-coffee',
    date: '2026-05-08'
  },
  {
    id: 'qr',
    category: 'landing',
    image: qrLandingPage,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    liveUrl: 'https://qr-landing-page-nine.vercel.app/',
    codeUrl: 'https://github.com/medokalel/qr-landing-page',
    date: '2026-05-14'
  },
  {
    id: 'alex',
    category: 'portfolio',
    image: alexPortfolio,
    tags: ['React', 'JavaScript', 'CSS3', 'Bootstrap'],
    liveUrl: 'https://alex-portfolio-weld.vercel.app/',
    codeUrl: 'https://github.com/medokalel/alex-portfolio',
    date: '2026-07-07'
  },
  {
    id: 'ahmed',
    category: 'portfolio',
    image: ahmedSamirPortfolio,
    tags: ['React', 'JavaScript', 'CSS3', 'Bootstrap'],
    liveUrl: 'https://ahmed-samir-portfolio-pi.vercel.app/',
    codeUrl: 'https://github.com/medokalel/ahmed-samir-portfolio',
    date: '2026-07-06'
  },
  {
    id: 'youssef',
    category: 'portfolio',
    image: youssefKamelPortfolio,
    tags: ['React', 'JavaScript', 'CSS3', 'Bootstrap'],
    liveUrl: 'https://youssef-kamel-portfolio.vercel.app/',
    codeUrl: 'https://github.com/medokalel/youssef-kamel-portfolio',
    date: '2026-07-08'
  }
]

/** All projects, newest first. ISO dates sort correctly as plain strings. */
export const getAllProjectsSorted = (): Project[] =>
  [...projectsData].sort((a, b) => b.date.localeCompare(a.date))

export const getLatestProjects = (count = 4): Project[] => getAllProjectsSorted().slice(0, count)

/** Formats a YYYY-MM-DD date. Parsed as a local date so it never shifts a day with the time zone. */
export const formatDate = (isoDate: string, locale = 'en-US'): string => {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const getProjectById = (id: string | undefined): Project | undefined =>
  projectsData.find((project) => project.id === id)
