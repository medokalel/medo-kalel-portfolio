import { useTranslation } from "react-i18next";
import Button from "@/components/ui/Button";
import { cvFiles, socialLinks } from "@/content/profile";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface CodeSnippet {
  id: string;
  code: string;
  /** Position + float animation (decorative, hidden below `lg`). */
  className: string;
}

const codeSnippets: readonly CodeSnippet[] = [
  {
    id: "component",
    code: "const app = () => {\n    return <UI />\n  }",
    className: "start-[5%] top-[10%] animate-float-a",
  },
  {
    id: "function",
    code: "function build() {\n    deploy();\n  }",
    className: "end-[5%] top-[10%] animate-float-b",
  },
  {
    id: "css",
    code: ".container {\n    display: flex;\n  }",
    className: "start-[5%] bottom-[15%] animate-float-b",
  },
  {
    id: "git",
    code: 'git commit -m\n    "✨ feature"',
    className: "end-[5%] bottom-[10%] animate-float-a",
  },
];

function CodeSnippetCard({
  code,
  className,
}: Pick<CodeSnippet, "code" | "className">) {
  return (
    <div
      aria-hidden="true"
      dir="ltr"
      className={cn(
        "absolute max-w-[160px] opacity-20 max-lg:hidden motion-reduce:animate-none",
        className,
      )}
    >
      <pre className="mb-4 rounded-lg border border-ink/10 bg-ink/5 p-3 text-xs whitespace-pre text-fg">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [topLeft, topRight, bottomLeft, bottomRight] = codeSnippets;

  return (
    <section className="overflow-hidden bg-page">
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-8 max-xs:py-6">
        <div className="relative flex w-full flex-col items-center justify-center px-3">
          <CodeSnippetCard {...topLeft} />
          <CodeSnippetCard {...topRight} />

          <div className="z-10 flex w-full flex-col items-center px-4 text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/15 px-3 py-1 text-xs font-medium text-success-fg">
              <span className="size-2 animate-dot-pulse rounded-full bg-success motion-reduce:animate-none"></span>
              {t("hero.available")}
            </div>

            <h1 className="mb-6 text-7xl leading-[1.1] font-extrabold text-fg max-lg:text-[3.5rem] max-md:text-[2.5rem] max-xs:text-[2rem]">
              {t("hero.titleLine1")}
              <br />
              <span className="bg-linear-135/srgb from-accent to-brand-pink bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
              <br />
              {t("hero.titleLine3")}
            </h1>

            <p className="mb-8 text-xl text-fg-muted max-lg:text-[1.1rem] max-md:px-2 max-md:text-base">
              {t("hero.subtitle")}
            </p>

            <div className="mb-5 flex flex-wrap justify-center gap-4 max-md:w-full max-md:max-w-[280px] max-md:flex-col max-md:items-center">
              <Button href="#projects" className="max-md:w-full">
                {t("hero.viewWork")}
                <i
                  className="fas fa-arrow-right rtl:-scale-x-100"
                  aria-hidden="true"
                ></i>
              </Button>
              <Button
                href="#contact"
                variant="secondary"
                className="max-md:w-full"
              >
                {t("hero.contactMe")}
              </Button>
            </div>

            <a
              href={cvFiles[language]}
              download
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-accent-fg no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <i className="fas fa-download" aria-hidden="true"></i>
              {t("about.downloadCv")}
              <span className="sr-only"> ({t("about.cvFormat")})</span>
            </a>

            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("hero.opensInNewTab", { name: social.label })}
                  className="text-[1.2rem] text-fg-subtle no-underline transition-colors duration-300 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <i className={social.icon} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          <CodeSnippetCard {...bottomLeft} />
          <CodeSnippetCard {...bottomRight} />
        </div>

        <a
          href="#about"
          className="absolute bottom-8 z-10 flex animate-hero-bounce cursor-pointer flex-col items-center gap-2 no-underline motion-reduce:animate-none"
        >
          <span className="text-[0.8rem] text-fg-subtle">
            {t("hero.scroll")}
          </span>
          <i
            className="fas fa-chevron-down text-[0.9rem] text-fg-subtle"
            aria-hidden="true"
          ></i>
        </a>
      </div>

      {/*
        Decorative glows. They are deliberately NOT inside a `relative` parent: like the original
        design they are positioned against the first screen (the viewport), not the whole section.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute start-[35%] top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 animate-glow-in rounded-full bg-[#6366f133] blur-[120px] max-md:start-1/2 max-md:bg-[#6365f15a] motion-reduce:animate-none rtl:translate-x-1/2"
      ></div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute start-[60%] top-[60%] size-96 -translate-x-1/2 -translate-y-1/2 animate-glow-out rounded-full bg-[#8b5cf633] blur-[120px] max-md:hidden motion-reduce:animate-none rtl:translate-x-1/2"
      ></div>
    </section>
  );
}
