"use client";

import { dict } from "./dict";
import { useLang } from "./lang";

/** Тексты на текущем языке и сам язык. */
export function useT() {
  const { lang } = useLang();
  return { t: dict[lang], lang };
}
