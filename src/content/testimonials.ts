export interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  initials: string
  rating: number
}

/**
 * PLACEHOLDER content. The Testimonials section is currently disabled in HomePage.
 * Replace these with real, permission-approved testimonials before enabling it.
 */
export const testimonials: readonly Testimonial[] = [
  {
    id: 1,
    quote: 'Incredible work! The developer transformed our outdated website into a modern, responsive platform. Performance improved dramatically, and our users love the new interface.',
    name: 'Michael Chen',
    role: 'Product Manager, InnovateCo',
    initials: 'MC',
    rating: 5,
  },
  {
    id: 2,
    quote: 'Professional, skilled, and easy to communicate with. The React application built for us is robust, scalable, and perfectly matches our requirements. Highly recommended!',
    name: 'Emily Rodriguez',
    role: 'CTO, Digital Solutions',
    initials: 'ER',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Outstanding developer with deep knowledge of modern web technologies. Delivered a complex e-commerce platform that handles thousands of transactions seamlessly.',
    name: 'David Park',
    role: 'Founder, ShopFlow',
    initials: 'DP',
    rating: 5,
  },
  {
    id: 4,
    quote: 'Exceptional attention to detail and great problem-solving skills. The landing page conversion rate increased by 40% after the redesign. Truly impressive work!',
    name: 'Sarah Johnson',
    role: 'Marketing Director, GrowthLabs',
    initials: 'SJ',
    rating: 5,
  },
  {
    id: 5,
    quote: 'A pleasure to work with! Delivered the project ahead of schedule with clean, well-documented code. The component library built has saved our team countless hours.',
    name: 'Alex Thompson',
    role: 'Lead Developer, TechStart',
    initials: 'AT',
    rating: 5,
  },
]