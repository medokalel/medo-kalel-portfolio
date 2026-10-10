import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { formatDate, type Project } from '@/content/projects'
import { useLanguage } from '@/hooks/useLanguage'
import { languages } from '@/i18n/config'
import { cn } from '@/lib/utils'
import { reveal } from '@/lib/reveal'

const overlayLink = cn(
  'inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-[1.2rem] py-[0.6rem]',
  'font-system text-[0.85rem] font-medium text-white no-underline',
  'transition-[background-color,border-color] duration-300 hover:border-accent hover:bg-accent/30',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
)

interface ProjectCardProps {
  project: Project
  /** Position in the list: cards in the same row reveal one after another (0.1s apart). */
  staggerIndex?: number
}

export default function ProjectCard({ project, staggerIndex }: ProjectCardProps) {
  const { t } = useTranslation()
  const { language, localize } = useLanguage()
  const title = t(`projects.items.${project.id}.title`)

  return (
    <article
      className={cn(
        'group h-full overflow-hidden rounded-2xl border border-line bg-card',
        'transition-[transform,border-color] duration-300 hover:-translate-y-[5px] hover:border-accent/30',
      )}
      {...reveal(((staggerIndex ?? 0) % 3) * 100)}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={t('projects.screenshotAlt', { title })}
          width={1000}
          height={500}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/70 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={overlayLink}>
            <i className="fas fa-external-link-alt" aria-hidden="true"></i>
            {t('projects.liveDemo')}
            <span className="sr-only"> {t('projects.opensInNewTab', { title })}</span>
          </a>
          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={overlayLink}>
            <i className="fas fa-code" aria-hidden="true"></i>
            {t('projects.code')}
            <span className="sr-only"> {t('projects.opensInNewTab', { title })}</span>
          </a>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-[0.8rem] flex flex-wrap items-center justify-between gap-2 max-md:flex-col max-md:items-start max-md:gap-[0.4rem]">
          <span className="inline-block rounded-full border border-brand-from/30 bg-brand-from/15 px-[0.8rem] py-[0.3rem] font-system text-xs font-medium text-accent-fg">
            {t(`projects.categories.${project.category}`)}
          </span>
          <span className="inline-flex items-center gap-[0.4rem] font-system text-xs font-medium text-fg-subtle">
            <i className="far fa-calendar-alt text-[0.8rem] text-accent-fg" aria-hidden="true"></i>
            <time dateTime={project.date}>{formatDate(project.date, languages[language].locale)}</time>
          </span>
        </div>
        <h3 className="mb-2 font-system text-[1.2rem] leading-[1.2] font-bold text-fg">{title}</h3>
        <p className="mb-4 font-system text-[0.9rem] leading-[1.6] text-fg-muted">{t(`projects.items.${project.id}.description`)}</p>
        <ul className="m-0 flex flex-wrap gap-2 p-0">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-fg/10 bg-fg/5 px-[0.7rem] py-[0.3rem] font-system text-xs font-medium text-fg-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <Link
          to={localize(`/projects/${project.id}`)}
          className="group/cs mt-5 inline-flex items-center gap-2 font-system text-[0.9rem] font-semibold text-accent-fg no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t('projects.viewCaseStudy')}
          <span className="sr-only"> — {title}</span>
          <i
            className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover/cs:translate-x-1 rtl:-scale-x-100 rtl:group-hover/cs:-translate-x-1"
            aria-hidden="true"
          ></i>
        </Link>
      </div>
    </article>
  )
}
