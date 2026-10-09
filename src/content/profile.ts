import type { Language } from '@/i18n/config'

/**
 * CV files live in public/cv/. To add an Arabic CV, drop the file there and point `ar` to it.
 * (Same file for both languages until then.)
 */
export const cvFiles: Record<Language, string> = {
  en: '/cv/Mohamed-Khalel-CV.pdf',
  ar: '/cv/Mohamed-Khalel-CV.pdf',
}

export interface SocialLink {
  id: string
  label: string
  href: string
  /** Font Awesome classes */
  icon: string
}

export const socialLinks: readonly SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/medokalel', icon: 'fab fa-github' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohamed-khalel1',
    icon: 'fab fa-linkedin-in',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/mohamedkhalel4',
    icon: 'fab fa-facebook',
  },
]

export const skills: readonly string[] = [
  'React',
  'TypeScript',
  'Tailwind',
  'Bootstrap',
  'HTML5',
  'CSS3',
  'JavaScript',
  'REST APIs',
  'Figma',
  'Git',
]

export interface Stat {
  id: 'experience' | 'projects' | 'clients'
  value: string
}

/** Labels live in the locale files: t(`about.stats.${stat.id}`). */
export const stats: readonly Stat[] = [
  { id: 'experience', value: '1+' },
  { id: 'projects', value: '10+' },
  { id: 'clients', value: '2' },
]
