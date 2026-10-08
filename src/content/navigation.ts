export interface NavItem {
  id: 'about' | 'projects' | 'services' | 'contact'
  href: `#${string}`
}

/** Labels live in the locale files: t(`nav.${item.id}`). */
export const navItems: readonly NavItem[] = [
  { id: 'about', href: '#about' },
  { id: 'projects', href: '#projects' },
  { id: 'services', href: '#services' },
  { id: 'contact', href: '#contact' },
]

export const ctaHref = '#contact'