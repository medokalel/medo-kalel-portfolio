import { useTranslation } from "react-i18next";
import { services } from "@/content/services";
import { reveal } from "@/lib/reveal";

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="bg-page px-4 py-24">
      <div className="site-container">
        <div className="mb-12 text-center" {...reveal()}>
          <span className="mb-4 block text-xs font-semibold tracking-widest text-accent-fg uppercase">
            {t("services.label")}
          </span>
          <h2 className="mb-4 text-5xl leading-[1.1] font-extrabold text-fg max-md:text-[2rem]">
            {t("services.titleStart")}{" "}
            <span className="bg-linear-135/srgb from-brand-from to-brand-to bg-clip-text text-transparent">
              {t("services.titleHighlight")}
            </span>
          </h2>
          <p className="mx-auto mb-0 max-w-[600px] text-base leading-[1.6] text-fg-muted">
            {t("services.subtitle")}
          </p>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.id}
              {...reveal((index % 3) * 100)}
              className="h-full rounded-2xl border border-line bg-card p-8 transition-[transform,border-color] duration-300 hover:-translate-y-[5px] hover:border-accent/30"
            >
              <div className="mb-[1.2rem] flex size-12 items-center justify-center rounded-[0.8rem] bg-linear-135/srgb from-brand-from to-brand-to">
                <i
                  className={`fas ${service.icon} text-[1.2rem] text-white`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-[0.8rem] text-xl leading-[1.2] font-bold text-fg">
                {t(`services.items.${service.id}.title`)}
              </h3>
              <p className="mb-[1.2rem] text-base leading-[1.6] text-fg-muted">
                {t(`services.items.${service.id}.description`)}
              </p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {(
                  t(`services.items.${service.id}.features`, {
                    returnObjects: true,
                  }) as string[]
                ).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-[0.878rem] text-fg-subtle"
                  >
                    <span
                      className="size-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
