import { Globe, GulaynMark } from "./icons";
import { ThemeLabelButton } from "./theme-toggle";
import { Reveal, Stagger, StaggerItem } from "./reveal";

const columns = [
  {
    title: "Продукт",
    links: [
      ["Модели", "#models"],
      ["Возможности", "#features"],
      ["Тарифы", "#pricing"],
      ["Розыгрыш", "#raffle"],
      ["Скачать", "#download"],
    ],
  },
  {
    title: "Компания",
    links: [
      ["О сервисе", "#about"],
      ["FAQ", "#faq"],
      ["Контакты", "#contacts"],
    ],
  },
  {
    title: "Документы",
    links: [
      ["Политика конфиденциальности", "#privacy"],
      ["Условия использования", "#terms"],
      ["Cookie", "#cookies"],
      ["Настройки cookie", "#cookie-settings"],
    ],
  },
  {
    title: "Поддержка",
    links: [
      ["Telegram @gulayn_bot", "https://t.me/gulayn_bot"],
      ["Канал @gulayn_ai", "https://t.me/gulayn_ai"],
      ["support@gulayn.ru", "mailto:support@gulayn.ru"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line sm:mt-20">
      <div className="mx-auto max-w-[1248px] px-4 pb-8 pt-16 sm:px-8">
        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]" gap={0.1}>
          <StaggerItem className="col-span-2 flex max-w-[280px] flex-col gap-4 text-sm leading-relaxed text-dim lg:col-span-1">
            <span className="flex items-center gap-2.5 text-lg font-medium text-text">
              <GulaynMark size={28} />
              Gulayn
            </span>
            Все нейросети в одной подписке: текст, картинки, видео и звук.
          </StaggerItem>
          {columns.map((c) => (
            <StaggerItem key={c.title}>
              <h4 className="mb-4 text-sm font-medium">{c.title}</h4>
              {c.links.map(([label, href]) => (
                <a key={label} href={href} className="block py-1.5 text-sm text-muted transition-colors hover:text-text">
                  {label}
                </a>
              ))}
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.4} className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-dim">
          <span>© 2026 Gulayn · Гулейн</span>
          <div className="flex gap-2">
            <button type="button" className="flex h-9 items-center gap-2 rounded-[10px] border border-line px-3 text-muted transition-colors hover:border-line-strong hover:text-text">
              <Globe /> Русский
            </button>
            <ThemeLabelButton className="flex h-9 items-center gap-2 rounded-[10px] border border-line px-3 text-muted transition-colors hover:border-line-strong hover:text-text" />
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
