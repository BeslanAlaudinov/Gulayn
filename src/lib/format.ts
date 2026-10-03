import type { Lang } from "@/i18n/lang";

const locale = (lang: Lang) => (lang === "en" ? "en-US" : "ru-RU");

/** 43000 → «43 000» (ru) или «43,000» (en), с неразрывными пробелами. */
export function num(n: number, lang: Lang = "ru") {
  return n.toLocaleString(locale(lang)).replace(/\s/g, " ");
}

/** 12345 → «12 345 ₽» (ru) или «12,345 ₽» (en). Цены в рублях в обеих версиях. */
export function rub(n: number, lang: Lang = "ru") {
  return `${num(n, lang)} ₽`;
}
