import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { getAllProjectsSorted, getProjectById, formatDate } from '@/content/projects'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/hooks/useLanguage'
import { languages } from '@/i18n/config'
import { reveal } from '@/lib/reveal'
import NotFoundPage from '@/pages/NotFoundPage'

type Item = { title: string; body: string }

const sectionTitle = 'mb-5 font-system text-[1.6rem] leading-[1.2] font-bold text-fg max-md:text-[1.3rem]'
const bodyText = 'm-0 font-system text-base leading-[1.8] text-fg-muted'

export default function CaseStudyPage() {
  const { projectId } = useParams()
  const project = getProjectById(projectId)
  const { t, i18n } = useTranslation()
  const { language, localize } = useLanguage()

  const title = project ? t(`projects.items.${project.id}.title`) : ''
  const idea = project ? t(`caseStudy.items.${project.id}.idea`) : ''

  // Page-specific <title> and description; restored to the site defaults when leaving the page.
  useEffect(() => {
    if (!project) return
    const meta = document.head.querySelector('meta[name="description"]')
    document.title = t('caseStudy.metaTitle', { title })
    meta?.setAttribute('content', idea.slice(0, 155))
    return () => {
      document.title = i18n.t('meta.title')
      meta?.setAttribute('content', i18n.t('meta.description'))
    }
  }, [project, title, idea, language, t, i18n])

  if (!project) return <NotFoundPage />

  // Keys are built from the project id, so they can't be checked against the typed resources at compile time.
  // The locale-parity test guarantees every project has every field in both languages.
  const raw = t as unknown as (key: string, options?: object) => unknown
  const key = (name: string) => `caseStudy.items.${project.id}.${name}`
  const text = (name: string) => raw(key(name)) as string
  const list = (name: string) => raw(key(name), { returnObjects: true }) as Item[]
  const outcomes = raw(key('outcome'), { returnObjects: true }) as string[]

  const sorted = getAllProjectsSorted()
  const next = sorted[(sorted.findIndex((p) => p.id === project.id) + 1) % sorted.length]
  const nextTitle = t(`projects.items.${next.id}.title`)

  return (
    <main id="main" className="min-h-screen bg-page">
      <div className="border-b border-ink/5 bg-linear-to-b/srgb from-brand-from/8 to-transparent px-4 pt-16 pb-12 max-md:pt-12 max-md:pb-8">
        <div className="site-container">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              to={localize('/projects')}
              className="group inline-flex items-center gap-2 font-system text-[0.9rem] font-medium text-fg-muted no-underline transition-colors duration-300 hover:text-accent-fg"
            >
              <i
                className="fas fa-arrow-left transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1"
                aria-hidden="true"
              />
              {t('caseStudy.back')}
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          <span className="mb-4 block font-system text-xs font-semibold tracking-widest text-accent-fg uppercase">
            {t('caseStudy.label')}
          </span>
          <h1 className="mb-4 max-w-[800px] font-system text-[3.2rem] leading-[1.1] font-extrabold text-fg max-lg:text-[2.4rem] max-md:text-[1.9rem]">
            {title}
          </h1>
          <p className="mb-6 max-w-[640px] font-system text-[1.1rem] leading-[1.6] text-fg-muted">
            {t(`projects.items.${project.id}.description`)}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 font-system text-[0.85rem] text-fg-subtle">
            <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/15 px-3 py-1 font-medium text-success-fg">
              <i className="fas fa-user" aria-hidden="true" />
              {t('caseStudy.soloBadge')}
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="far fa-calendar-alt text-accent-fg" aria-hidden="true" />
              <time dateTime={project.date}>{formatDate(project.date, languages[language].locale)}</time>
            </span>
            <span className="inline-flex items-center gap-2">
              {t(`projects.categories.${project.category}`)}
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-external-link-alt" aria-hidden="true" />
              {t('caseStudy.visitLive')}
              <span className="sr-only"> {t('projects.opensInNewTab', { title })}</span>
            </Button>
            <Button href={project.codeUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
              <i className="fas fa-code" aria-hidden="true" />
              {t('caseStudy.viewCode')}
              <span className="sr-only"> {t('projects.opensInNewTab', { title })}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-12 pb-24">
        <div className="site-container grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="flex min-w-0 flex-col gap-14">
            <img
              src={project.image}
              alt={t('projects.screenshotAlt', { title })}
              width={1000}
              height={500}
              className="aspect-[16/10] w-full rounded-2xl border border-line object-cover"
            />

            <section {...reveal()}>
              <h2 className={sectionTitle}>{t('caseStudy.sections.idea')}</h2>
              <p className={bodyText}>{idea}</p>
            </section>

            <section {...reveal()}>
              <h2 className={sectionTitle}>{t('caseStudy.sections.role')}</h2>
              <p className={bodyText}>{text('role')}</p>
            </section>

            <section {...reveal()}>
              <h2 className={sectionTitle}>{t('caseStudy.sections.challenges')}</h2>
              <ol className="m-0 flex list-none flex-col gap-4 p-0">
                {list('challenges').map((item, index) => (
                  <li key={item.title} className="rounded-2xl border border-line bg-card p-6">
                    <h3 className="mb-2 flex items-center gap-3 font-system text-[1.1rem] font-bold text-fg">
                      <span
                        aria-hidden="true"
                        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-from/15 text-[0.8rem] text-accent-fg"
                      >
                        {index + 1}
                      </span>
                      {item.title}
                    </h3>
                    <p className={bodyText}>{item.body}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section {...reveal()}>
              <h2 className={sectionTitle}>{t('caseStudy.sections.decisions')}</h2>
              <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
                {list('decisions').map((item) => (
                  <li key={item.title} className="rounded-2xl border border-line bg-card p-6">
                    <h3 className="mb-2 font-system text-[1.05rem] font-bold text-fg">{item.title}</h3>
                    <p className="m-0 font-system text-[0.92rem] leading-[1.7] text-fg-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section {...reveal()}>
              <h2 className={sectionTitle}>{t('caseStudy.sections.outcome')}</h2>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {outcomes.map((line) => (
                  <li key={line} className="flex items-start gap-3 font-system text-base leading-[1.7] text-fg-muted">
                    <i className="fas fa-check mt-[0.35rem] text-[0.8rem] text-success-fg" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section {...reveal()} className="rounded-2xl border border-brand-from/30 bg-brand-from/10 p-6">
              <h2 className={sectionTitle}>{t('caseStudy.sections.learned')}</h2>
              <p className={bodyText}>{text('learned')}</p>
            </section>
          </article>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border border-line bg-card p-6">
              <h2 className="mb-4 font-system text-[1rem] font-bold text-fg">{t('caseStudy.stack')}</h2>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-brand-from/30 bg-brand-from/15 px-3 py-1 font-system text-xs font-medium text-accent-fg"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <nav aria-label={t('caseStudy.next')} className="site-container mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8">
          <Link
            to={localize('/projects')}
            className="font-system text-[0.9rem] font-medium text-fg-muted no-underline hover:text-accent-fg"
          >
            {t('caseStudy.allProjects')}
          </Link>
          <Link
            to={localize(`/projects/${next.id}`)}
            className="group inline-flex items-center gap-2 font-system text-[0.95rem] font-semibold text-accent-fg no-underline hover:underline"
          >
            {t('caseStudy.next')}: {nextTitle}
            <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </main>
  )
}
