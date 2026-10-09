import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      // The label names the ACTION (what pressing does), and changes with the theme.
      aria-label={isDark ? t("theme.switchToLight") : t("theme.switchToDark")}
      className={cn(
        "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-fg-muted/30 bg-transparent",
        "text-[0.9rem] text-fg-muted transition-colors duration-300 hover:border-accent hover:text-accent-fg",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      <i
        className={cn("fas", isDark ? "fa-sun" : "fa-moon")}
        aria-hidden="true"
      />
    </button>
  );
}
