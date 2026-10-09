import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";
import { languages } from "@/i18n/config";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const { t } = useTranslation();
  const { otherLanguage, setLanguage } = useLanguage();
  const target = languages[otherLanguage];

  return (
    <button
      type="button"
      onClick={() => setLanguage(otherLanguage)}
      // Spoken in the CURRENT language ("Switch language to Arabic"); the visible text is the target's own name.
      aria-label={t("language.switchTo", { language: target.label })}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full border border-fg-muted/30 bg-transparent px-[0.9rem] py-[0.35rem]",
        "text-[0.85rem] font-medium text-fg-muted transition-colors duration-300 hover:border-accent hover:text-accent-fg",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      <i className="fas fa-globe text-[0.8rem]" aria-hidden="true" />
      <span lang={otherLanguage}>{target.nativeLabel}</span>
    </button>
  );
}
