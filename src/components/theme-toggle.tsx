"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "./icons";

export const THEME_KEY = "gulayn-theme";

type Theme = "dark" | "light";

/** Тема живёт в атрибуте data-theme на <html>: его ставит скрипт до отрисовки и меняет переключатель. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

function applyTheme(next: Theme) {
  const root = document.documentElement;
  if (next === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {}
}

/**
 * Плавная смена через View Transitions: браузер перетекает снимок «до» в снимок «после».
 * Где API нет или включено уменьшение движения, тема меняется мгновенно.
 */
function setTheme(next: Theme) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("startViewTransition" in document)) {
    applyTheme(next);
    return;
  }
  document.startViewTransition(() => applyTheme(next));
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as Theme);
  return { theme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") };
}

/** Кнопка-иконка для шапки: показывает тему, в которую переключит. */
export function ThemeIconButton({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
      className={className}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}

/** Кнопка с подписью для подвала. */
export function ThemeLabelButton({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button type="button" onClick={toggle} className={className}>
      {theme === "dark" ? <Moon /> : <Sun />}
      {theme === "dark" ? "Тёмная тема" : "Светлая тема"}
    </button>
  );
}
