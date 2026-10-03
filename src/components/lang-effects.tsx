"use client";

import { useEffect } from "react";
import { useT } from "@/i18n/use-t";

/** Обновляет заголовок вкладки и описание страницы при смене языка. */
export function LangEffects() {
  const { t } = useT();

  useEffect(() => {
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [t]);

  return null;
}
