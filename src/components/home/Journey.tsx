import { experiences } from '@/content/journey'
import { cn } from '@/lib/utils'

export default function Journey() {
  return (
    <section id="journey" className="bg-section-alt px-4 py-24">
      <div className="site-container">
        <div className="mb-16 text-center">
          <span className="mb-4 block text-xs font-semibold tracking-widest text-accent uppercase">My Journey</span>
          <h2 className="m-0 text-5xl leading-[1.1] font-extrabold text-fg max-md:text-[2rem]">
            The Path{' '}
            <span className="bg-linear-135/srgb from-brand-from to-brand-to bg-clip-text text-transparent">
              So Far
            </span>
          </h2>
        </div>

        <ol className="relative m-0 mx-auto max-w-[900px] list-none p-0">
          <li
            aria-hidden="true"
            className="absolute inset-y-0 start-1/2 w-0.5 -translate-x-1/2 bg-linear-to-b from-brand-from to-brand-to rtl:translate-x-1/2 max-md:start-5"
          />
          {experiences.map((exp, index) => {
            const onEnd = index % 2 === 0
            return (
              <li
                key={exp.id}
                className={cn(
                  'relative mb-12 flex items-center last:mb-0',
                  onEnd ? 'flex-row' : 'flex-row-reverse',
                  'max-md:flex-row max-md:ps-[50px]',
                )}
              >
                <div className="absolute start-1/2 z-[2] -translate-x-1/2 rtl:translate-x-1/2 max-md:start-5">
                  <div className="relative size-4 animate-pulse-dot rounded-full border-[3px] border-page bg-accent before:absolute before:top-1/2 before:left-1/2 before:[transform:translate(-50%,-50%)] before:size-full before:animate-ripple before:rounded-full before:bg-accent before:content-[''] motion-reduce:animate-none motion-reduce:before:animate-none" />
                </div>
                <div
                  className={cn(
                    'absolute text-sm whitespace-nowrap text-fg-muted',
                    onEnd ? 'start-[calc(50%+2rem)] text-start' : 'end-[calc(50%+2rem)] text-end',
                    'max-md:start-[46%] max-md:end-auto max-md:-top-[6%] max-md:mb-2 max-md:text-start max-md:text-accent',
                  )}
                >
                  {exp.period}
                </div>
                <div
                  className={cn(
                    'w-[calc(50%-3rem)] rounded-2xl border border-line bg-card p-6 transition-[transform,border-color] duration-300 hover:-translate-y-[3px] hover:border-accent/30',
                    onEnd ? 'ms-8' : 'me-8',
                    'max-md:ms-2.5 max-md:me-0 max-md:w-full',
                  )}
                >
                  <h3 className="mb-[0.3rem] text-[1.1rem] leading-[1.2] font-bold text-fg">{exp.title}</h3>
                  <p className="mb-[0.8rem] text-[0.85rem] text-accent">
                    {exp.companyLink ? (
                      <a
                        href={exp.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-inherit no-underline"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </p>
                  <p className="mb-4 text-[0.9rem] leading-[1.6] text-fg-muted">{exp.description}</p>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {exp.achievements.map((a) => (
                      <li
                        key={a}
                        className="rounded-full border border-brand-from/30 bg-brand-from/15 px-[0.7rem] py-[0.3rem] text-xs font-medium text-accent"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}