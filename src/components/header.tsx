"use client";

import { useT } from "@/i18n/use-t";
import { GulaynMark } from "./icons";
import { LangShortButton } from "./lang-toggle";
import { MobileMenu } from "./mobile-menu";
import { ThemeIconButton } from "./theme-toggle";

/** Шапка-чёлка: прилипает к верхнему краю окна и остаётся на месте при скролле.
 *  На телефоне висит под 6px полосой из layout: у края должна быть только полоса, иначе Safari 26 не красит строку состояния. */
export function Header() {
  const { t } = useT();
  const links = [
    { href: "#models", label: t.header.nav.models },
    { href: "#features", label: t.header.nav.features },
    { href: "#pricing", label: t.header.nav.pricing },
    { href: "#raffle", label: t.header.nav.raffle },
    { href: "#faq", label: t.header.nav.faq },
  ];

  return (
    <header className="theme-dark notch fixed left-1/2 top-[max(env(safe-area-inset-top),6px)] z-50 flex -translate-x-1/2 items-center gap-4 rounded-b-[20px] bg-black py-2 pl-4 pr-2 sm:top-[env(safe-area-inset-top)] sm:gap-6">
      <a href="#top" className="flex items-center gap-2 text-text">
        <GulaynMark />
        <span className="text-base font-medium">Gulayn</span>
      </a>
      <nav aria-label={t.header.mainNav} className="hidden gap-5 text-sm lg:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="whitespace-nowrap text-muted transition-colors hover:text-text">
            {l.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-1">
        <LangShortButton className="hidden h-9 items-center gap-1.5 rounded-[10px] px-2.5 text-sm text-muted transition-colors hover:bg-hover hover:text-text sm:flex" />
        <ThemeIconButton className="hidden size-9 items-center justify-center rounded-[10px] text-muted transition-colors hover:bg-hover hover:text-text sm:flex" />
        <a href="#login" className="hidden whitespace-nowrap px-3 py-2 text-sm text-muted transition-colors hover:text-text sm:block">
          {t.header.login}
        </a>
        <a href="#register" className="whitespace-nowrap rounded-xl bg-text px-4 py-2 text-sm font-medium text-bg">
          {t.header.try}
        </a>
        <MobileMenu links={links} />
      </div>
    </header>
  );
}
