"use client";

import { useLang } from "@/i18n/lang";
import { useT } from "@/i18n/use-t";
import { Globe } from "./icons";

/** Короткий переключатель для шапки: показывает текущий язык (RU / EN), по клику меняет. */
export function LangShortButton({ className }: { className?: string }) {
  const { toggle } = useLang();
  const { t } = useT();
  return (
    <button type="button" onClick={toggle} aria-label={t.lang.switchTo} className={className}>
      <Globe />
      {t.lang.short}
    </button>
  );
}

/** Переключатель с названием языка для подвала и мобильного меню. */
export function LangLabelButton({ className }: { className?: string }) {
  const { toggle } = useLang();
  const { t } = useT();
  return (
    <button type="button" onClick={toggle} aria-label={t.lang.switchTo} className={className}>
      <Globe />
      {t.lang.name}
    </button>
  );
}
