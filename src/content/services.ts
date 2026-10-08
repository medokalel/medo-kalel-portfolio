export interface Service {
  id: number
  /** Font Awesome icon name, e.g. "fa-code" */
  icon: string
  title: string
  description: string
  features: readonly string[]
}

export const services: readonly Service[] = [
  {
    id: 1,
    icon: 'fa-code',
    title: 'Front-End Development',
    description: 'Building responsive, performant web applications using modern frameworks and best practices.',
    features: ['React & Next.js', 'TypeScript', 'State Management', 'API Integration'],
  },
  {
    id: 2,
    icon: 'fa-palette',
    title: 'Responsive Design',
    description: 'Creating beautiful, accessible interfaces that work seamlessly across all devices and screen sizes.',
    features: ['Mobile-First', 'Cross-Browser', 'Accessibility', 'Modern CSS'],
  },
  {
    id: 3,
    icon: 'fa-mobile-alt',
    title: 'Landing Pages',
    description: 'Crafting high-converting landing pages with engaging animations and optimized user flows.',
    features: ['SEO Optimized', 'Fast Loading', 'Conversion Focused', 'Analytics Ready'],
  },
  {
    id: 4,
    icon: 'fa-atom',
    title: 'React Applications',
    description: 'Developing scalable single-page applications with complex state management and routing.',
    features: ['Redux/Zustand', 'React Router', 'Code Splitting', 'Testing'],
  },
  {
    id: 5,
    icon: 'fa-bolt',
    title: 'UI Implementation',
    description: 'Translating designs from Figma, Sketch, or Adobe XD into pixel-perfect, interactive interfaces.',
    features: ['Figma to Code', 'Design Systems', 'Component Libraries', 'Animations'],
  },
  {
    id: 6,
    icon: 'fa-tachometer-alt',
    title: 'Performance Optimization',
    description: 'Enhancing application speed and efficiency through code optimization and best practices.',
    features: ['Bundle Size', 'Lazy Loading', 'Caching', 'Lighthouse Scores'],
  },
]