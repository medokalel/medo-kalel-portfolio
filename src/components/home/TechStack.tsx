import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { firstRow, secondRow, type Tech } from "@/content/techstack";
import { cn } from "@/lib/utils";
import { reveal } from "@/lib/reveal";

function TechCard({ tech, hidden = false }: { tech: Tech; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className="flex size-[140px] shrink-0 flex-col items-center justify-center gap-[0.8rem] rounded-2xl border border-line bg-card transition-[transform,border-color] duration-300 hover:scale-[1.08] hover:border-accent/30 max-md:size-[110px] max-sm:size-[100px]"
    >
      <div
        className="relative flex size-[50px] items-center justify-center before:absolute before:size-10 before:rounded-full before:bg-(--tech-color) before:opacity-30 before:blur-[12px] before:content-['']"
        style={{ "--tech-color": tech.color } as CSSProperties}
        aria-hidden="true"
      >
        <div
          className="relative z-[1] size-8 rounded-full"
          style={{ backgroundColor: tech.color }}
        />
      </div>
      <span className="text-[0.85rem] font-semibold text-fg max-md:text-xs max-sm:text-[0.7rem]">
        {tech.name}
      </span>
    </li>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  label,
}: {
  items: readonly Tech[];
  reverse?: boolean;
  label: string;
}) {
  return (
    <div dir="ltr" className="relative w-full">
      <ul
        aria-label={label}
        className={cn(
          "m-0 flex w-max list-none gap-6 p-0 will-change-transform max-md:gap-4 max-sm:gap-3",
          "motion-reduce:animate-none",
          reverse
            ? "animate-marquee-reverse max-md:[animation-duration:20s]"
            : "animate-marquee max-md:[animation-duration:20s]",
        )}
      >
        {items.map((tech, i) => (
          <TechCard key={`a-${i}`} tech={tech} />
        ))}
        {items.map((tech, i) => (
          <TechCard key={`b-${i}`} tech={tech} hidden />
        ))}
      </ul>
    </div>
  );
}

export default function TechStack() {
  const { t } = useTranslation();

  return (
    <section
      id="techstack"
      className="max-w-[100vw] overflow-hidden bg-section-alt py-[6.5rem]"
    >
      <div>
        <div className="mb-12 px-4 text-center" {...reveal()}>
          <span className="mb-4 block text-xs font-semibold tracking-widest text-accent-fg uppercase">
            {t("techstack.label")}
          </span>
          <h2 className="mb-4 text-5xl leading-[1.1] font-extrabold text-fg max-md:text-[2rem]">
            {t("techstack.titleStart")}{" "}
            <span className="bg-linear-135/srgb from-brand-from to-brand-to bg-clip-text text-transparent">
              {t("techstack.titleHighlight")}
            </span>
          </h2>
          <p className="mx-auto mb-0 max-w-[600px] text-base leading-[1.6] text-fg-muted">
            {t("techstack.subtitle")}
          </p>
        </div>
        <div className="flex w-full flex-col gap-6">
          <MarqueeRow items={firstRow} label={t("techstack.row1")} />
          <MarqueeRow items={secondRow} reverse label={t("techstack.row2")} />
        </div>
      </div>
    </section>
  );
}
