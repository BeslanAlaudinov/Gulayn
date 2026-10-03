import { ArrowRight, Card, Monitor } from "./icons";
import { Stagger, StaggerItem } from "./reveal";

const reasons: { lead: string; rest: string }[] = [
  { lead: "ChatGPT, Midjourney, Runway и ElevenLabs за 999 ₽", rest: " вместо 5 160 ₽, которые стоят их подписки по отдельности." },
  { lead: "26 быстрых моделей без счётчика.", rest: " Повседневный чат с подпиской не тратит токены." },
  { lead: "Неудачная генерация бесплатна,", rest: " а цена каждой модели видна ещё до запроса." },
  { lead: "Остаток токенов не сгорает:", rest: " он переходит на следующий месяц, если продлить подписку в течение трёх дней." },
  { lead: "Модель меняется посреди разговора.", rest: " Спросили Claude, переспросили GPT, контекст на месте." },
  { lead: "Переписка не идёт на обучение моделей", rest: " и удаляется сама через 120 дней." },
];

/** «Почему Gulayn»: закреплённый заголовок слева, крупные тезисы справа. */
export function WhyGulayn() {
  return (
    <section id="features" className="mx-auto max-w-[1248px] px-4 py-16 sm:px-8 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Stagger className="flex flex-col gap-8 self-start lg:sticky lg:top-28" gap={0.15}>
          <StaggerItem>
            <h2 className="text-[32px] font-medium leading-[1.08] tracking-[-1px] sm:text-5xl sm:tracking-[-1.6px]">
              Почему Gulayn
            </h2>
          </StaggerItem>
          <StaggerItem className="-mt-4">
            <p className="max-w-[520px] text-lg leading-normal text-muted">
              Без общих слов: только то, что вы получите после регистрации.
            </p>
          </StaggerItem>
          <StaggerItem className="flex flex-col gap-3 text-sm text-dim">
            <span className="flex items-center gap-2.5">
              <Monitor size={18} />
              Windows, Android и браузер на одном балансе
            </span>
            <span className="flex items-center gap-2.5">
              <Card size={18} />
              Оплата картой через ЮKassa или криптовалютой
            </span>
          </StaggerItem>
          <StaggerItem>
            <a
              href="#register"
              className="inline-flex h-12 items-center gap-2 rounded-[14px] bg-accent pl-6 pr-5 text-base font-medium text-on-accent transition-colors hover:bg-accent-hover"
            >
              Попробовать бесплатно <ArrowRight />
            </a>
          </StaggerItem>
        </Stagger>

        <Stagger className="flex flex-col" gap={0.14} delay={0.3}>
          {reasons.map((r, i) => (
            <StaggerItem
              key={r.lead}
              className={`grid grid-cols-[48px_minmax(0,1fr)] gap-4 ${i === 0 ? "pb-8" : "border-t border-line py-8"} ${
                i === reasons.length - 1 ? "pb-0" : ""
              }`}
            >
              <span className="pt-2.5 text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[22px] leading-[1.35] tracking-[-0.8px] text-faint sm:text-[28px]">
                <b className="font-medium text-text">{r.lead}</b>
                {r.rest}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
