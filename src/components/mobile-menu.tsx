"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Globe } from "./icons";
import { EASE } from "./reveal";
import { ThemeLabelButton } from "./theme-toggle";

type Link = { href: string; label: string };

/** Меню для телефона и планшета: кнопка в чёлке и панель под ней. */
export function MobileMenu({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex size-9 items-center justify-center rounded-[10px] text-muted transition-colors hover:bg-hover hover:text-text"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <motion.path animate={open ? { d: "M6 6l12 12" } : { d: "M4 9h16" }} transition={{ duration: 0.3, ease: EASE }} />
          <motion.path animate={open ? { d: "M6 18L18 6" } : { d: "M4 15h16" }} transition={{ duration: 0.3, ease: EASE }} />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Меню"
            initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute left-1/2 top-[calc(100%+8px)] w-[min(320px,calc(100vw-32px))] -translate-x-1/2 rounded-[20px] border border-line-strong bg-black p-2 shadow-[0_24px_48px_rgb(0_0_0/0.4)]"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center rounded-xl px-4 text-base text-soft transition-colors hover:bg-hover hover:text-text"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#login"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center rounded-xl px-4 text-base text-soft transition-colors hover:bg-hover hover:text-text sm:hidden"
            >
              Войти
            </a>
            <div className="mt-2 flex gap-2 border-t border-line p-2 pt-4">
              <button
                type="button"
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[10px] border border-line text-sm text-muted transition-colors hover:text-text"
              >
                <Globe /> Русский
              </button>
              <ThemeLabelButton className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[10px] border border-line text-sm text-muted transition-colors hover:text-text" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
