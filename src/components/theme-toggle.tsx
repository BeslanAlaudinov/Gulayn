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

function setTheme(next: Theme) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 500);
  }
  if (next === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {}
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
