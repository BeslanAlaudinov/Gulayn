"use client";

import { useT } from "@/i18n/use-t";
import { ArrowRight, Download } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import { asset } from "@/lib/asset";

const tiles = [
  { logo: "openai", name: "ChatGPT" },
  { logo: "claude", name: "Claude" },
  { logo: "gemini", name: "Gemini" },
  { logo: "midjourney", name: "Midjourney" },
  { logo: "kling", name: "Kling" },
  { logo: "", name: "Gulayn" },
  { logo: "suno", name: "Suno" },
  { logo: "runway", name: "Runway" },
  { logo: "elevenlabs", name: "ElevenLabs" },
  { logo: "deepseek", name: "DeepSeek" },
  { logo: "grok", name: "Grok" },
  { logo: "flux", name: "Flux" },
];

/** Финальный призыв: слева действие, справа сетка нейросетей с Gulayn в центре. */
export function Cta() {
  const { t } = useT();
  const c = t.cta;
  return (
    <section className="mx-auto max-w-[1248px] px-4 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <div className="grid overflow-hidden rounded-[32px] border border-line bg-card lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Stagger className="flex flex-col gap-8 p-7 sm:p-12" gap={0.15} delay={0.25}>
            <StaggerItem>
              <h2 className="text-[32px] font-medium leading-[1.08] tracking-[-1px] sm:text-5xl sm:tracking-[-1.6px]">
                {c.title1}
                <br />
                {c.title2}
              </h2>
            </StaggerItem>
            <StaggerItem className="-mt-4">
              <p className="max-w-[560px] text-lg leading-normal text-muted">
                {c.lead}
              </p>
            </StaggerItem>
            <StaggerItem className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <a
                href="#register"
                className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[14px] bg-accent pl-6 pr-5 text-base font-medium text-on-accent transition-colors hover:bg-accent-hover"
              >
                {c.create} <ArrowRight />
              </a>
              <a
                href="#download"
                className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[14px] border border-line-strong px-5 text-base transition-colors hover:bg-hover"
              >
                <Download /> {c.download}
              </a>
            </StaggerItem>
            <StaggerItem className="mt-auto flex gap-8 text-sm text-dim">
              {c.stats.map(([n, l]) => (
                <div key={l}>
                  <b className="mb-1 block text-2xl font-medium tracking-[-0.8px] text-text tabular-nums">{n}</b>
                  {l}
                </div>
              ))}
            </StaggerItem>
          </Stagger>

          <div className="relative border-t border-line bg-well p-6 sm:p-10 lg:border-l lg:border-t-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(255_107_53/0.14),transparent_60%)]"
            />
            <Stagger className="relative grid h-full grid-cols-4 content-center gap-2.5" gap={0.06} delay={0.5}>
              {tiles.map((t) => (
                <StaggerItem key={t.name}>
                  {t.logo ? (
                    <span className="flex aspect-square flex-col items-center justify-center gap-2.5 rounded-[18px] border border-line bg-card text-xs text-dim">
                      {/* eslint-disable-next-line @next/next/no-img-element -- монохромный SVG */}
                      <img src={asset(`/logos/${t.logo}.svg`)} alt="" width={28} height={28} className="logo-mono size-7 opacity-85" />
                      {t.name}
                    </span>
                  ) : (
                    <span className="flex aspect-square flex-col items-center justify-center gap-2.5 rounded-[18px] bg-accent text-xs text-on-accent">
                      <svg width="28" height="28" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                        <path d="M42.6 21.4 A15 15 0 1 0 42.6 42.6" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                        <path d="M34 33 L44 33" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                      </svg>
                      Gulayn
                    </span>
                  )}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
