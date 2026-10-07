"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { setLang, useLang, type Lang } from "@/i18n/lang";
import { useT } from "@/i18n/use-t";
import { Check, ChevronDown, Globe } from "./icons";

/** Языки списка: название на самом языке, чтобы его узнал тот, кто им говорит. */
const LANGS: { id: Lang; name: string }[] = [
  { id: "ru", name: "Русский" },
  { id: "en", name: "English" },
];

/**
 * Выпадающий список языков. Кнопка показывает текущий язык, список открывается
 * вниз (шапка) или вверх (подвал, мобильное меню). Закрывается кликом мимо и Esc.
 */
function LangMenu({
  className,
  wrapClassName = "",
  label,
  side,
}: {
  className?: string;
  wrapClassName?: string;
  label: "short" | "name";
  side: "down" | "up";
}) {
  const { lang } = useLang();
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (next: Lang) => {
    setOpen(false);
    if (next !== lang) setLang(next);
  };

  return (
    <div ref={root} className={`relative ${wrapClassName}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t.lang.choose}
        onClick={() => setOpen((v) => !v)}
        className={className}
      >
        <Globe />
        {t.lang[label]}
        <ChevronDown
          size={12}
          className={`opacity-70 transition-transform duration-300 ${(side === "up") !== open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={menuId}
            role="menu"
            initial={{ opacity: 0, y: side === "down" ? -6 : 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: side === "down" ? -4 : 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute z-50 min-w-[168px] rounded-[14px] border border-line-strong bg-card-2 p-1 shadow-[0_16px_40px_rgb(0_0_0/0.25)] ${
              side === "down" ? "right-0 top-full mt-2 origin-top-right" : "bottom-full left-0 mb-2 origin-bottom-left"
            }`}
          >
            {LANGS.map((l) => (
              <li key={l.id} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={l.id === lang}
                  onClick={() => pick(l.id)}
                  className="flex h-9 w-full items-center justify-between gap-3 rounded-[10px] px-3 text-left text-sm text-muted transition-colors hover:bg-hover hover:text-text aria-checked:text-text"
                >
                  {l.name}
                  {l.id === lang && <Check size={14} className="text-accent" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Выбор языка в шапке: кнопка с кодом языка (RU / EN), список вниз. */
export function LangShortButton({ className }: { className?: string }) {
  return <LangMenu className={className} wrapClassName="hidden sm:block" label="short" side="down" />;
}

/** Выбор языка в подвале и мобильном меню: кнопка с названием языка, список вверх. */
export function LangLabelButton({ className, wrapClassName }: { className?: string; wrapClassName?: string }) {
  return <LangMenu className={className} wrapClassName={wrapClassName} label="name" side="up" />;
}
