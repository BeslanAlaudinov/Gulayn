"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { galleryMedia } from "@/data/content";
import type { TagKey } from "@/i18n/dict";
import { useT } from "@/i18n/use-t";
import { ArrowRight, Check, Copy } from "./icons";
import { AnimatePresence, motion } from "motion/react";
import { EASE, Reveal, Stagger, StaggerItem } from "./reveal";
import { asset } from "@/lib/asset";

const segColor: Record<TagKey, string> = {
  subj: "text-tag-subj border-tag-subj/40",
  light: "text-tag-light border-tag-light/50",
  cam: "text-tag-cam border-tag-cam/50",
  mood: "text-tag-mood border-tag-mood/50",
};

const segFocused: Record<TagKey, string> = {
  subj: "text-tag-subj border-tag-subj",
  light: "text-tag-light border-tag-light",
  cam: "text-tag-cam border-tag-cam",
  mood: "text-tag-mood border-tag-mood",
};

/** Третий экран: разбор промптов по смысловым частям. */
export function PromptGallery() {
  const { t } = useT();
  const g = t.gallery;
  const gallery = g.items.map((text, i) => ({ ...text, ...galleryMedia[i] }));
  const tagKeys: TagKey[] = ["subj", "light", "cam", "mood"];
  const tagColor: Record<TagKey, string> = {
    subj: "bg-tag-subj",
    light: "bg-tag-light",
    cam: "bg-tag-cam",
    mood: "bg-tag-mood",
  };
  const [cur, setCur] = useState(0);
  const [focus, setFocus] = useState<TagKey | null>(null);
  const [copied, setCopied] = useState(false);
  const item = gallery[cur];

  const count = galleryMedia.length;
  const go = useCallback(
    (i: number) => {
      setCur((i + count) % count);
      setCopied(false);
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.target instanceof HTMLElement) || !e.target.closest("#gallery")) return;
      if (e.key === "ArrowLeft") go(cur - 1);
      if (e.key === "ArrowRight") go(cur + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cur, go]);

  const copy = async () => {
    const text = item.segments.map((s) => s.text).join("");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="gallery" className="mx-auto max-w-[1248px] px-4 py-16 sm:px-8 sm:py-20">
      <Stagger className="flex flex-wrap items-end justify-between gap-6" gap={0.15}>
        <StaggerItem>
          <h2 className="max-w-[600px] text-[32px] font-medium leading-[1.08] tracking-[-1px] sm:text-5xl sm:tracking-[-1.6px]">
            {g.title}
          </h2>
        </StaggerItem>
        <StaggerItem>
          <p className="max-w-[440px] text-base leading-normal text-muted">
            {g.lead}
          </p>
        </StaggerItem>
      </Stagger>

      <Stagger className="mt-12 grid grid-cols-4 gap-2 sm:grid-cols-7" gap={0.08} delay={0.3}>
        {gallery.map((it, i) => (
          <StaggerItem key={it.image}>
            <button
              type="button"
              aria-pressed={i === cur}
              onClick={() => go(i)}
              className="group flex w-full flex-col gap-2 rounded-[14px] border border-transparent p-1.5 pb-2.5 text-left text-xs text-muted transition-colors hover:text-text aria-pressed:bg-card aria-pressed:text-text"
            >
              <span className="relative block h-16 overflow-hidden rounded-[10px]">
                <Image
                  src={asset(it.image)}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover brightness-[.55] saturate-[.8] transition-[filter] group-hover:brightness-[.85] group-aria-pressed:brightness-100 group-aria-pressed:saturate-100"
                />
              </span>
              <span className="truncate px-1">{it.title}</span>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.6} className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-card lg:aspect-square lg:w-full lg:self-stretch">
          <AnimatePresence initial={false}>
            <motion.div
              key={item.image}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Image src={asset(item.image)} alt={item.title} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <span className="absolute left-4 top-4 flex h-8 items-center rounded-[10px] bg-black/60 px-3 text-sm text-white">
            {g.type[item.kind]}
          </span>
        </div>

        <div className="flex flex-col gap-7 rounded-3xl border border-line bg-card p-6 sm:p-8">
          <motion.h3
            key={item.title}
            className="text-[32px] font-medium tracking-[-1px]"
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {item.title}
          </motion.h3>

          <div role="group" aria-label={g.highlight} className="flex flex-wrap gap-2">
            {tagKeys.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={focus === key}
                onClick={() => setFocus(focus === key ? null : key)}
                className="flex h-9 items-center gap-2 rounded-[10px] border border-line px-3 text-sm text-muted transition-colors hover:text-text aria-pressed:border-line-strong aria-pressed:bg-card-2 aria-pressed:text-text"
              >
                <i className={`size-2.5 rounded-[3px] ${tagColor[key]}`} />
                {g.tags[key]}
              </button>
            ))}
          </div>

          <motion.p
            key={`prompt-${cur}-${t.lang.short}`}
            className="text-lg leading-relaxed tracking-[-0.6px] text-muted sm:text-2xl"
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            {item.segments.map((s, i) =>
              s.tag ? (
                <span
                  key={i}
                  className={`border-b-2 pb-0.5 transition-colors ${
                    focus === null ? segColor[s.tag] : focus === s.tag ? segFocused[s.tag] : "border-transparent text-faint"
                  }`}
                >
                  {s.text}
                </span>
              ) : (
                <span key={i}>{s.text}</span>
              ),
            )}
          </motion.p>

          <p className="rounded-2xl border border-line bg-well px-5 py-4 text-sm leading-relaxed text-muted">
            <b className="font-medium text-text">{g.tipLead}</b> {item.tip}
          </p>

          <div className="mt-auto flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copy}
              className={`flex h-12 items-center gap-2 rounded-[14px] border px-5 text-base transition-colors ${
                copied ? "border-tag-mood/50 text-tag-mood" : "border-line-strong hover:bg-hover"
              }`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={copied ? "check" : "copy"}
                  className="flex"
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {copied ? <Check /> : <Copy />}
                </motion.span>
              </AnimatePresence>
              <span aria-live="polite">{copied ? g.copied : g.copy}</span>
            </button>
            <a
              href="#register"
              className="flex h-12 items-center gap-2 rounded-[14px] bg-accent px-5 text-base font-medium text-on-accent transition-colors hover:bg-accent-hover"
            >
              {g.try} <ArrowRight />
            </a>
          </div>
        </div>
      </Reveal>

      <p className="mt-6 text-xs text-dim">{g.note}</p>
    </section>
  );
}
