export interface NavItem {
  id: string
  label: string
  href: `#${string}`
}

export const brandName = 'Mohamed Khalel'

export const navItems: readonly NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const ctaItem: NavItem = { id: 'cta', label: "Let's Talk", href: '#contact' }