import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ProjectCard from '@/components/projects/ProjectCard'
import { buttonVariants } from '@/components/ui/button-variants'
import { getLatestProjects } from '@/content/projects'
import { cn } from '@/lib/utils'

export default function Projects() {
  const { t } = useTranslation()
  const latestProjects = getLatestProjects(4)

  return (
    <section id="projects" className="bg-page px-4 py-24">
      <div className="site-container">
        <div className="mb-12 text-center">
          <span className="mb-4 block font-system text-xs font-semibold tracking-widest text-accent-fg uppercase">
            {t('projects.label')}
          </span>
          <h2 className="mb-4 font-system text-5xl leading-[1.1] font-extrabold text-fg max-md:text-[2rem]">
            {t('projects.titleStart')}{' '}
            <span className="bg-linear-135/srgb from-brand-from to-brand-to bg-clip-text text-transparent">
              {t('projects.titleHighlight')}
            </span>
          </h2>
          <p className="mx-auto mb-0 max-w-[600px] font-system text-base leading-[1.6] text-fg-muted">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {latestProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/projects"
            className={cn(
              buttonVariants({ size: 'md' }),
              'group gap-3 px-8 py-[0.9rem] font-system',
              'shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:-translate-y-[3px] hover:shadow-[0_8px_30px_rgba(139,92,246,0.4)]',
              'max-md:px-[1.6rem] max-md:py-[0.8rem] max-md:text-[0.9rem]',
            )}
          >
            <span>{t('projects.viewAll')}</span>
            <i
              className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              aria-hidden="true"
            ></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
