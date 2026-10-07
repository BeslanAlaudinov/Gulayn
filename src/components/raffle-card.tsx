"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Close } from "./icons";
import { asset } from "@/lib/asset";
import { useT } from "@/i18n/use-t";

/** Через сколько после захода на сайт всплывает карточка розыгрыша. */
const SHOW_AFTER_MS = 5000;

/**
 * Карточка розыгрыша в углу. Всплывает через 5 секунд после захода и ведёт на
 * страницу розыгрыша. Крестик скрывает её только до обновления страницы.
 */
export function RaffleCard() {
  const { t } = useT();
  const r = t.raffle;
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShown(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => setShown(false);

  return (
    <AnimatePresence>
      {shown && (
        <motion.aside
          id="raffle"
          aria-label={r.aria}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 z-40 flex w-[calc(100%-32px)] max-w-[360px] gap-4 rounded-[20px] border border-line-strong bg-card-2 p-4 shadow-[0_24px_48px_rgb(0_0_0/0.35)] sm:bottom-6 sm:right-6"
        >
          <span className="relative h-24 w-[76px] flex-none overflow-hidden rounded-xl bg-white">
            <Image src={asset("/images/iphone-17-pro-max.png")} alt="" fill sizes="76px" className="object-contain p-1" />
          </span>
          <div className="min-w-0 pr-6">
            <b className="block text-base font-medium">{r.title}</b>
            <span className="mt-1 block text-sm leading-snug text-dim">
              {r.text}
            </span>
            <a
              href="https://gulayn.ru/raffle"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
            >
              {r.cta} <ArrowRight size={14} />
            </a>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label={r.hide}
            className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-lg text-faint transition-colors hover:bg-hover hover:text-text"
          >
            <Close size={14} />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
