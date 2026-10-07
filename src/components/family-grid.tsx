"use client";

import { useT } from "@/i18n/use-t";
import { asset } from "@/lib/asset";
import { ArrowRight, ArrowUpRight } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./reveal";

type Cat = "text" | "image" | "video" | "audio";
type Family = { id: string; name: string; company: string; total: number; logo: string; cats: Cat[]; desc: { ru: string; en: string } };

/** Семейства и число моделей из каталога gulayn.ru (октябрь 2026). */
const families: Family[] = [
  {
    id: "gpt",
    name: "GPT",
    company: "OpenAI",
    total: 23,
    logo: "openai",
    cats: [
      "text",
      "image",
      "audio"
    ],
    desc: {
      ru: "Семейство OpenAI для текста, рассуждений, изображений, видео, речи и транскрибации.",
      en: "OpenAI family for text, reasoning, images, video, speech and transcription."
    }
  },
  {
    id: "claude",
    name: "Claude",
    company: "Anthropic",
    total: 8,
    logo: "claude",
    cats: [
      "text"
    ],
    desc: {
      ru: "Модели Anthropic для аккуратного письма, анализа, кода и длинных документов.",
      en: "Anthropic models for careful writing, analysis, coding and long documents."
    }
  },
  {
    id: "gemini",
    name: "Gemini",
    company: "Google",
    total: 22,
    logo: "gemini",
    cats: [
      "text",
      "video",
      "audio"
    ],
    desc: {
      ru: "Семейство Google AI для мультимодального текста, изображений, видео и длинного контекста.",
      en: "Google AI family for multimodal text, images, video and long context."
    }
  },
  {
    id: "mistral",
    name: "Mistral",
    company: "Mistral AI",
    total: 9,
    logo: "mistral",
    cats: [
      "text",
      "audio"
    ],
    desc: {
      ru: "Европейские модели для кода, многоязычного текста и экономичного развёртывания.",
      en: "European AI models for coding, multilingual text and efficient deployment."
    }
  },
  {
    id: "minimax",
    name: "MiniMax",
    company: "MiniMax",
    total: 14,
    logo: "minimax",
    cats: [
      "text",
      "image",
      "video",
      "audio"
    ],
    desc: {
      ru: "Семейство MiniMax для чата, генерации изображений, видео Hailuo, голоса и музыки.",
      en: "MiniMax family for chat, image generation, Hailuo video, speech and music."
    }
  },
  {
    id: "qwen",
    name: "Qwen",
    company: "Alibaba Cloud",
    total: 13,
    logo: "qwen",
    cats: [
      "text",
      "image",
      "video"
    ],
    desc: {
      ru: "Семейство Alibaba Qwen для многоязычного текста, кода и генерации изображений.",
      en: "Alibaba Qwen family for multilingual text, coding and image generation."
    }
  },
  {
    id: "runway",
    name: "Runway",
    company: "Runway",
    total: 11,
    logo: "runway",
    cats: [
      "video",
      "image"
    ],
    desc: {
      ru: "Креативная генерация и обработка видео для роликов, рекламы и кинематографичного движения.",
      en: "Creative video generation and editing for clips, ads and cinematic motion."
    }
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    company: "ElevenLabs",
    total: 11,
    logo: "elevenlabs",
    cats: [
      "audio"
    ],
    desc: {
      ru: "Голосовой AI для выразительной речи, транскрибации и генерации музыки.",
      en: "Voice AI for expressive speech, transcription and music generation."
    }
  }
];

/** Остальные семейства для полосы под карточками: 31 в ленте минус 8 в карточках. */
const more = {
  count: 23,
  names: ["Grok", "DeepSeek", "Midjourney", "Kling", "Flux", "Suno"],
  logos: ["grok", "deepseek", "midjourney", "kling", "flux", "pika", "suno", "kimi"],
};

/** Семейства нейросетей: карточки, у каждого семейства компания, число моделей и направления. */
export function FamilyGrid() {
  const { t, lang } = useT();
  const s = t.families;
  const stats = [["200+", s.modelsLabel], ["31+", s.familiesLabel]];
  return (
    <section id="families" className="mx-auto max-w-[1248px] px-4 py-16 sm:px-8 sm:py-20">
      <Stagger className="flex flex-wrap items-end justify-between gap-6" gap={0.15}>
        <div>
          <StaggerItem>
            <h2 className="text-[32px] font-medium leading-[1.08] tracking-[-1px] sm:text-5xl sm:tracking-[-1.6px]">{s.title}</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 max-w-[560px] text-lg leading-normal text-muted">{s.lead}</p>
          </StaggerItem>
        </div>
        <StaggerItem className="flex gap-12 tabular-nums">
          {stats.map(([n, l]) => (
            <div key={l}>
              <b className="block text-2xl font-medium tracking-[-0.8px] sm:text-[32px] sm:tracking-[-1px]">{n}</b>
              <span className="mt-1 block text-sm text-dim">{l}</span>
            </div>
          ))}
        </StaggerItem>
      </Stagger>

      <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" gap={0.06} delay={0.3}>
        {families.map((f) => (
          <StaggerItem key={f.id}>
            <a
              href="#register"
              className="group flex h-full flex-col gap-4 rounded-[20px] border border-line bg-card p-6 transition-colors duration-300 hover:border-line-strong lg:min-h-70"
            >
              <span className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-card-2">
                  {/* eslint-disable-next-line @next/next/no-img-element -- монохромный SVG */}
                  <img src={asset(`/logos/${f.logo}.svg`)} alt="" width={24} height={24} className="logo-mono size-6 object-contain" />
                </span>
                <span className="rounded-lg border border-line px-2 py-1 text-xs text-dim tabular-nums">{s.models(f.total)}</span>
              </span>
              <span>
                <b className="block text-xl font-medium tracking-[-0.6px]">{f.name}</b>
                <span className="mt-1 block text-sm text-dim">{f.company}</span>
              </span>
              <span className="text-sm leading-normal text-muted">{f.desc[lang]}</span>
              <span className="mt-auto flex items-end justify-between gap-3">
                <span className="flex flex-wrap gap-1">
                  {f.cats.map((c) => (
                    <span key={c} className="flex h-6 items-center rounded-lg bg-card-2 px-2 text-xs text-muted">
                      {s.cats[c]}
                    </span>
                  ))}
                </span>
                <ArrowUpRight className="mb-1 flex-none text-dim transition-[translate,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </span>
            </a>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.3} className="mt-6">
        <div className="flex flex-col items-start gap-4 rounded-[20px] border border-dashed border-line-strong px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <span aria-hidden="true" className="hidden items-center gap-4 lg:flex">
            {more.logos.map((l) => (
              // eslint-disable-next-line @next/next/no-img-element -- монохромный SVG
              <img key={l} src={asset(`/logos/${l}.svg`)} alt="" width={20} height={20} className="logo-mono size-5 object-contain opacity-50" />
            ))}
          </span>
          <p className="text-base text-muted">{s.more(more.count, more.names.join(", "))}</p>
          <a
            href="#register"
            className="flex h-11 flex-none items-center gap-2 whitespace-nowrap rounded-xl bg-accent pl-5 pr-4 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
          >
            {s.catalog} <ArrowRight />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
