import Image from "next/image";
import { ArrowRight, Pause, Play } from "./icons";
import { SectionHead, Stagger, StaggerItem } from "./reveal";
import { asset } from "@/lib/asset";

function Chip({ logo, children }: { logo: string; children: React.ReactNode }) {
  return (
    <span className="flex h-8 items-center gap-2 rounded-[10px] border border-line bg-card-2 pl-2 pr-3 text-sm text-soft">
      {/* eslint-disable-next-line @next/next/no-img-element -- монохромный SVG */}
      <img src={asset(`/logos/${logo}.svg`)} alt="" width={16} height={16} className="logo-mono size-4 object-contain opacity-80" />
      {children}
    </span>
  );
}

function TileTitle({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <h3 className="text-2xl font-medium tracking-[-0.8px]">{title}</h3>
      {note && <span className="text-sm text-dim sm:text-right">{note}</span>}
    </div>
  );
}

const tile =
  "relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-line bg-card p-6 transition-[border-color,transform] duration-500 ease-out hover:-translate-y-0.5 hover:border-line-strong";

const wave = [30, 52, 70, 44, 88, 62, 96, 40, 74, 58, 100, 66, 48, 84, 36, 72, 92, 54, 64, 42, 80, 58, 98, 46, 70, 86, 38, 62, 90, 50, 76, 44];

function ChatAnswer({ logo, children }: { logo: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 flex items-start gap-3">
      <span className="flex size-7 flex-none items-center justify-center rounded-lg bg-card-2">
        {/* eslint-disable-next-line @next/next/no-img-element -- монохромный SVG */}
        <img src={asset(`/logos/${logo}.svg`)} alt="" width={16} height={16} className="logo-mono size-4" />
      </span>
      <p className="text-sm leading-relaxed text-muted">{children}</p>
    </div>
  );
}

function Bubble({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`ml-auto max-w-full rounded-2xl rounded-br-sm bg-card-2 px-4 py-3 text-sm leading-normal sm:max-w-[72%] ${className}`}>
      {children}
    </div>
  );
}

/** Второй экран: нейросети, собранные по задачам. */
export function ModelsBento() {
  return (
    <section id="models" className="mx-auto max-w-[1248px] px-4 py-16 sm:px-8 sm:py-20">
      <SectionHead
        center
        className="mx-auto max-w-[720px] text-center"
        title="Нейросеть под каждую задачу"
        lead={<>Пишите, рисуйте, снимайте и озвучивайте в одном окне. Лучшие модели собраны по задачам, переключение в&nbsp;один клик.</>}
      />

      <Stagger className="mt-16 grid grid-cols-6 gap-3" delay={0.35} gap={0.15}>
        <StaggerItem className="col-span-6 lg:col-span-4">
          <a href="#text" className={tile}>
            <TileTitle title="Текст и чат" note="Ответ можно переспросить у другой модели" />
            <div className="flex flex-wrap gap-2">
              <Chip logo="openai">GPT-6 Astra</Chip>
              <Chip logo="openai">GPT-5.6</Chip>
              <Chip logo="claude">Claude</Chip>
              <Chip logo="gemini">Gemini</Chip>
              <Chip logo="grok">Grok</Chip>
              <Chip logo="qwen">Qwen</Chip>
            </div>
            <div className="flex flex-1 flex-col justify-end rounded-2xl border border-line bg-well p-4">
              <Bubble>Разбери договор аренды и выпиши риски для арендатора</Bubble>
              <ChatAnswer logo="claude">
                <b className="font-medium text-text">Нашёл три риска.</b> Штраф за досрочный выезд равен трём месяцам
                аренды. Индексация цены не ограничена сверху. Текущий ремонт полностью на арендаторе, включая технику
                собственника.
              </ChatAnswer>
              <Bubble className="mt-5">Теперь коротко, для письма собственнику</Bubble>
              <ChatAnswer logo="openai">
                <b className="font-medium text-text">GPT-5.6:</b> Предлагаю ограничить индексацию 7% в год, снизить
                штраф до одного месяца и закрепить ремонт техники за собственником.
              </ChatAnswer>
              <div className="mt-4 flex flex-wrap items-center gap-2 whitespace-nowrap text-xs text-dim">
                <span>Модель в этом чате:</span>
                <span>Claude</span>
                <span className="rounded-lg bg-card-2 px-2 py-1 text-text">GPT-5.6</span>
                <span>Gemini</span>
              </div>
            </div>
          </a>
        </StaggerItem>

        <StaggerItem className="col-span-6 lg:col-span-2">
          <a href="#images" className={tile}>
            <TileTitle title="Изображения" />
            <div className="flex flex-wrap gap-2">
              <Chip logo="openai">GPT Image</Chip>
              <Chip logo="nanobanana">Nano Banana</Chip>
              <Chip logo="flux">FLUX</Chip>
            </div>
            <div className="mt-auto grid grid-cols-2 gap-2">
              <div className="relative col-span-2 aspect-[2/1] overflow-hidden rounded-xl">
                <Image src={asset("/images/gallery-dunes.jpg")} alt="Пустынные дюны" fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={asset("/images/abstract.jpg")} alt="Абстрактная 3D-форма" fill sizes="(min-width: 1024px) 180px, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={asset("/images/gallery-neon.jpg")} alt="Портрет в неоновом свете" fill sizes="(min-width: 1024px) 180px, 50vw" className="object-cover" />
              </div>
            </div>
          </a>
        </StaggerItem>

        <StaggerItem className="col-span-6 md:col-span-3">
          <a href="#video" className={tile}>
            <TileTitle title="Видео" note="Veo, Runway, Kling, MiniMax, Pika" />
            <div className="relative mt-auto aspect-[2/1] overflow-hidden rounded-2xl">
              <Image src={asset("/images/gallery-waterfall.jpg")} alt="Кадр с водопадом" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover brightness-[.8]" />
              <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white">
                <Play size={20} />
              </span>
              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 text-xs text-white">
                <span>0:02</span>
                <span className="h-1 flex-1 rounded-sm bg-white/25">
                  <i className="block h-full w-[38%] rounded-sm bg-accent" />
                </span>
                <span>0:05</span>
              </div>
            </div>
          </a>
        </StaggerItem>

        <StaggerItem className="col-span-6 md:col-span-3">
          <a href="#audio" className={tile}>
            <TileTitle title="Аудио" note="Голос, музыка и транскрибация" />
            <div className="flex flex-wrap gap-2">
              <Chip logo="elevenlabs">ElevenLabs</Chip>
              <Chip logo="suno">Suno</Chip>
              <Chip logo="gemini">Gemini TTS</Chip>
              <Chip logo="minimax">MiniMax</Chip>
            </div>
            <div className="mt-auto flex flex-col gap-4 rounded-2xl border border-line bg-well p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-11 flex-none items-center justify-center rounded-xl bg-accent text-on-accent">
                  <Pause />
                </span>
                <span>
                  <b className="block text-base font-medium">Утро у моря</b>
                  <span className="mt-1 block text-xs text-dim">Suno · инди для рекламы кофейни · 0:30</span>
                </span>
              </div>
              <div aria-hidden="true" className="flex h-18 items-center gap-1">
                {wave.map((h, i) => (
                  <i key={i} className={`flex-1 rounded-sm ${i < 12 ? "bg-accent" : "bg-wave-off"}`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </a>
        </StaggerItem>

        <StaggerItem className="col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-line bg-card p-6">
            <div className="flex flex-wrap gap-12">
              {[
                ["200+", "моделей"],
                ["31+", "сервис"],
                ["1 клик", "чтобы сменить модель"],
              ].map(([n, l]) => (
                <div key={l}>
                  <b className="block text-[32px] font-medium tracking-[-1px]">{n}</b>
                  <span className="mt-1 block text-sm text-dim">{l}</span>
                </div>
              ))}
            </div>
            <a
              href="#register"
              className="flex h-12 items-center gap-2 rounded-[14px] bg-accent pl-6 pr-5 text-base font-medium text-on-accent transition-colors hover:bg-accent-hover"
            >
              Попробовать бесплатно <ArrowRight />
            </a>
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
