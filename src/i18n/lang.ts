"use client";

import { useSyncExternalStore } from "react";

export type Lang = "ru" | "en";
export const LANG_KEY = "gulayn-lang";

/** Язык живёт в атрибуте lang на <html>: его ставит скрипт до отрисовки и меняет переключатель. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  return () => observer.disconnect();
}

const getLang = (): Lang => (document.documentElement.lang === "en" ? "en" : "ru");

function applyLang(next: Lang) {
  document.documentElement.lang = next;
  try {
    localStorage.setItem(LANG_KEY, next);
  } catch {}
}

/** Смена языка с плавным перетеканием, как у темы. */
export function setLang(next: Lang) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || document.hidden || !("startViewTransition" in document)) {
    applyLang(next);
    return;
  }
  // Переход может сорваться (вкладку свернули на середине) — смена всё равно применится.
  document.startViewTransition(() => applyLang(next)).ready.catch(() => {});
}

export function useLang() {
  const lang = useSyncExternalStore(subscribe, getLang, () => "ru" as Lang);
  return { lang, toggle: () => setLang(lang === "ru" ? "en" : "ru") };
}
