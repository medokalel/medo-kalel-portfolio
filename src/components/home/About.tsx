import { useTranslation } from 'react-i18next'
import avatar from '@/assets/images/avatar.webp'
import { skills, stats } from '@/content/profile'

const badges = [
  { id: 'certified', icon: 'fas fa-award' },
  { id: 'coffee', icon: 'fas fa-coffee' },
] as const

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="relative bg-page px-4 py-24">
      <div className="site-container">
        <div className="grid grid-cols-1 items-start gap-x-6 lg:grid-cols-2">
          <div className="max-lg:mb-12">
            <span className="mb-4 block text-xs font-semibold tracking-widest text-accent-fg uppercase">
              {t('about.label')}
            </span>
            <h2 className="mb-6 text-5xl leading-[1.1] font-extrabold text-fg max-lg:text-[2.2rem] max-sm:text-[1.8rem]">
              {t('about.titleLine1')}
              <br />
              <span className="bg-linear-135/srgb from-brand-from to-brand-to bg-clip-text text-transparent">
                {t('about.titleHighlight')}
              </span>
            </h2>
            <p className="mb-[1.2rem] text-base leading-[1.7] text-fg-muted">
              {t('about.p1')}
            </p>
            <p className="mb-[1.2rem] text-base leading-[1.7] text-fg-muted">
              {t('about.p2')}
            </p>
            <p className="mb-[1.2rem] text-base leading-[1.7] text-fg-muted">
              {t('about.p3')}
            </p>

            <dl className="mt-8 mb-0 flex justify-between gap-12 max-lg:gap-8 max-sm:gap-6">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col-reverse">
                  <dt className="mt-[0.3rem] text-[0.85rem] font-normal text-fg-subtle">{t(`about.stats.${stat.id}`)}</dt>
                  <dd className="m-0 text-4xl leading-none font-extrabold text-brand-from max-lg:text-[2rem] max-sm:text-[1.8rem]">
                    <bdi dir="ltr">{stat.value}</bdi>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex justify-center">
            <div className="flex w-full max-w-[480px] flex-col items-center rounded-3xl border border-line bg-card p-10 text-center max-lg:max-w-full max-sm:p-6">
              <div className="mb-6 flex size-[130px] items-center justify-center rounded-full bg-linear-135/srgb from-brand-from to-brand-to">
                <img
                  src={avatar}
                  alt={t('about.portraitAlt')}
                  width={130}
                  height={130}
                  className="size-full rounded-full object-cover"
                />
              </div>
              <h3 className="mb-[0.3rem] text-[1.3rem] leading-[1.2] font-bold text-fg">{t('brand')}</h3>
              <p className="mb-[0.8rem] text-[0.9rem] text-fg-muted">{t('about.role')}</p>
              <div className="mb-6 flex items-center gap-2 text-[0.85rem] text-fg-subtle">
                <i className="fas fa-map-marker-alt text-accent-fg" aria-hidden="true"></i>
                <span>{t('about.location')}</span>
              </div>
              <div className="mb-6 h-px w-full bg-line"></div>
              <h4 className="mb-4 text-[0.9rem] leading-[1.2] font-semibold text-fg">{t('about.skillsTitle')}</h4>
              <ul className="mb-6 flex flex-wrap justify-center gap-2 p-0">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-brand-from/30 bg-brand-from/15 px-3 py-1 text-xs font-medium text-accent-fg"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="flex w-full gap-[0.8rem]">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-1 flex-col items-center gap-[0.3rem] rounded-[0.8rem] border border-line bg-fg/5 p-4"
                  >
                    <i className={`${badge.icon} text-[1.2rem] text-accent-fg`} aria-hidden="true"></i>
                    <span className="text-[0.8rem] text-fg-muted">{t(`about.badges.${badge.id}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
