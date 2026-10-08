export interface Experience {
  id: number
  title: string
  company: string
  companyLink: string
  period: string
  description: string
  achievements: readonly string[]
}

/** Newest first. Timeline sides alternate automatically (first = right/end side). */
export const experiences: readonly Experience[] = [
  {
    id: 3,
    title: 'Front-End Developer Intern',
    company: 'CASCO',
    companyLink: 'https://www.cascotec.com/',
    period: '2026 - present',
    description:
      "Working on real product UI at one of the world's leading testing and certification companies, focusing on building and improving web interfaces while spending a lot of time in Figma.",
    achievements: ['Working on real product UI', 'Collaborating with design in Figma', 'Applying React & modern CSS'],
  },
  {
    id: 2,
    title: 'React Front-End Developer Trainee',
    company: 'Digital Egypt Pioneers Initiative (DEPI)',
    companyLink: 'https://depi.gov.eg/',
    period: '2025 - 2026',
    description:
      'Currently enrolled in an intensive React Front-End Development track focused on building modern, responsive web applications and applying industry best practices.',
    achievements: [
      'Completed HTML5, CSS3 & Responsive Design modules',
      'Building real-world React projects',
      'Improving problem-solving & UI skills',
    ],
  },
  {
    id: 1,
    title: 'Web Development Journey Started',
    company: 'Self-Taught Learning',
    companyLink: '',
    period: '2023 - 2025',
    description:
      'Started learning web development fundamentals including HTML, CSS, and JavaScript while building small projects to practice and improve skills.',
    achievements: ['Built first responsive websites', 'Completed core web development fundamentals', 'Started GitHub portfolio'],
  },
]