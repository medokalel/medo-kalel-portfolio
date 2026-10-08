import { formatDate, type Project } from '@/content/projects'
import { cn } from '@/lib/utils'

const overlayLink = cn(
  'inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-[1.2rem] py-[0.6rem]',
  'font-system text-[0.85rem] font-medium text-white no-underline',
  'transition-[background-color,border-color] duration-300 hover:border-accent hover:bg-accent/30',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
)

interface ProjectCardProps {
  project: Project
  /** When set, the card fades in after `index × 0.1s` (staggered list). */
  staggerIndex?: number
}

export default function ProjectCard({ project, staggerIndex }: ProjectCardProps) {
  const staggered = staggerIndex !== undefined

  return (
    <article
      className={cn(
        'group h-full animate-fade-in-up overflow-hidden rounded-2xl border border-line bg-card',
        'transition-[transform,border-color] duration-300 hover:-translate-y-[5px] hover:border-accent/30',
        'motion-reduce:animate-none',
        staggered && 'opacity-0 motion-reduce:opacity-100',
      )}
      style={staggered ? { animationDelay: `${staggerIndex * 0.1}s` } : undefined}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/70 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={overlayLink}>
            <i className="fas fa-external-link-alt" aria-hidden="true"></i>
            Live Demo
            <span className="sr-only"> of {project.title} (opens in a new tab)</span>
          </a>
          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={overlayLink}>
            <i className="fas fa-code" aria-hidden="true"></i>
            Code
            <span className="sr-only"> of {project.title} (opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-[0.8rem] flex flex-wrap items-center justify-between gap-2 max-md:flex-col max-md:items-start max-md:gap-[0.4rem]">
          <span className="inline-block rounded-full border border-brand-from/30 bg-brand-from/15 px-[0.8rem] py-[0.3rem] font-system text-xs font-medium text-accent">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-[0.4rem] font-system text-xs font-medium text-fg-subtle">
            <i className="far fa-calendar-alt text-[0.8rem] text-accent" aria-hidden="true"></i>
            <time dateTime={project.date}>{formatDate(project.date)}</time>
          </span>
        </div>
        <h3 className="mb-2 font-system text-[1.2rem] leading-[1.2] font-bold text-fg">{project.title}</h3>
        <p className="mb-4 font-system text-[0.9rem] leading-[1.6] text-fg-muted">{project.description}</p>
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
      </div>
    </article>
  )
}