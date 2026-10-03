import { ChevronDown, Globe, GulaynMark } from "./icons";
import { MobileMenu } from "./mobile-menu";
import { ThemeIconButton } from "./theme-toggle";

const links = [
  { href: "#models", label: "Модели" },
  { href: "#features", label: "Возможности" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#raffle", label: "Розыгрыш" },
  { href: "#faq", label: "FAQ" },
];

/** Шапка-чёлка: прилипает к верхнему краю окна и остаётся на месте при скролле. */
export function Header() {
  return (
    <header className="theme-dark notch fixed left-1/2 top-0 z-50 flex -translate-x-1/2 items-center gap-4 sm:gap-6 rounded-b-[20px] bg-black py-2 pl-4 pr-2">
      <a href="#top" className="flex items-center gap-2 text-text">
        <GulaynMark />
        <span className="text-base font-medium">Gulayn</span>
      </a>
      <nav aria-label="Основное меню" className="hidden gap-5 text-sm lg:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="whitespace-nowrap text-muted transition-colors hover:text-text">
            {l.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Язык: русский"
          className="hidden h-9 items-center gap-1.5 rounded-[10px] px-2.5 text-sm text-muted transition-colors hover:bg-hover hover:text-text sm:flex"
        >
          <Globe />
          RU
          <ChevronDown />
        </button>
        <ThemeIconButton className="hidden size-9 items-center justify-center rounded-[10px] text-muted transition-colors hover:bg-hover hover:text-text sm:flex" />
        <a href="#login" className="hidden px-3 py-2 text-sm text-muted transition-colors hover:text-text sm:block">
          Войти
        </a>
        <a href="#register" className="whitespace-nowrap rounded-xl bg-text px-4 py-2 text-sm font-medium text-bg">
          Попробовать
        </a>
        <MobileMenu links={links} />
      </div>
    </header>
  );
}
