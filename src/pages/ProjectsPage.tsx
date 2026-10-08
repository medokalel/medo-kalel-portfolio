import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '@/components/projects/ProjectCard'
import { getAllProjectsSorted, type ProjectCategory } from '@/content/projects'
import { cn } from '@/lib/utils'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

type ProjectFilter = 'all' | ProjectCategory

const filters: { key: ProjectFilter; label: string; icon: string }[] = [
  { key: 'all', label: 'All Projects', icon: 'fa-layer-group' },
  { key: 'Portfolio', label: 'Portfolio', icon: 'fa-briefcase' },
  { key: 'Landing Page', label: 'Landing Page', icon: 'fa-rocket' },
  { key: 'E-Commerce', label: 'E-Commerce', icon: 'fa-cart-shopping' },
]

const allProjects = getAllProjectsSorted()

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all')

  const filteredProjects = allProjects.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter,
  )

  return (
    <div className="min-h-screen bg-page">
      <div className="border-b border-white/5 bg-linear-to-b/srgb from-brand-from/8 to-transparent px-4 pt-16 pb-12 max-md:pt-12 max-md:pb-8">
        <div className="site-container">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-system text-[0.9rem] font-medium text-fg-muted no-underline transition-colors duration-300 hover:text-accent"
            >
              <i
                className="fas fa-arrow-left transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1"
                aria-hidden="true"
              />
              Back to Home
            </Link>
            <LanguageSwitcher />
          </div>
          <h1 className="mb-4 font-system text-[3.5rem] leading-[1.1] font-extrabold text-fg max-lg:text-[2.5rem] max-md:text-[2rem]">
            All{' '}
            <span className="bg-linear-135/srgb from-brand-from to-brand-to bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="mb-4 max-w-[500px] font-system text-[1.1rem] leading-[1.6] text-fg-muted">
            Explore my complete collection of work across different categories
          </p>
        </div>
      </div>

      <section className="px-4 pt-12 pb-24">
        <div className="site-container">
          <div role="group" aria-label="Filter projects" className="mb-6 flex flex-wrap justify-center gap-3 max-md:gap-2">
            {filters.map((filter) => {
              const active = activeFilter === filter.key
              return (
                <button
                  key={filter.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter.key)}
                  className={cn(
                    'inline-flex cursor-pointer items-center gap-2 rounded-full border px-[1.4rem] py-[0.6rem] font-system text-[0.85rem] max-md:px-4 max-md:py-2 max-md:text-[0.8rem] font-medium transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                    active
                      ? 'border-accent bg-linear-135/srgb from-brand-from/25 to-brand-to/25 text-fg shadow-[0_0_25px_rgba(139,92,246,0.15),0_4px_15px_rgba(0,0,0,0.3)]'
                      : 'border-white/10 bg-white/3 text-fg-muted hover:border-accent/30 hover:bg-accent/10 hover:text-fg',
                  )}
                >
                  <i className={cn('fas', filter.icon)} aria-hidden="true" />
                  {filter.label}
                </button>
              )
            })}
          </div>

          <p
            aria-live="polite"
            className="mb-8 text-center font-system text-[0.9rem] font-medium text-fg-subtle"
          >
            Showing <span className="font-bold text-accent">{filteredProjects.length}</span> project
            {filteredProjects.length !== 1 ? 's' : ''}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} staggerIndex={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}