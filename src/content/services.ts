export type ServiceId = 'frontend' | 'responsive' | 'landing' | 'react' | 'ui' | 'performance'

export interface Service {
  id: ServiceId
  /** Font Awesome icon name, e.g. "fa-code" */
  icon: string
}

/** Title, description and features live in the locale files: t(`services.items.${id}.title`). */
export const services: readonly Service[] = [
  { id: 'frontend', icon: 'fa-code' },
  { id: 'responsive', icon: 'fa-palette' },
  { id: 'landing', icon: 'fa-mobile-alt' },
  { id: 'react', icon: 'fa-atom' },
  { id: 'ui', icon: 'fa-bolt' },
  { id: 'performance', icon: 'fa-tachometer-alt' },
]
