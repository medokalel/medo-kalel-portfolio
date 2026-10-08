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
  id: string
  value: string
  label: string
}

export const stats: readonly Stat[] = [
  { id: 'experience', value: '1+', label: 'Years Experience' },
  { id: 'projects', value: '10+', label: 'Projects Completed' },
  { id: 'clients', value: '2', label: 'Clients' },
]