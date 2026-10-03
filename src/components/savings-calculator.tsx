"use client";

import { useState } from "react";
import { services } from "@/data/content";
import { useT } from "@/i18n/use-t";
import { num, rub } from "@/lib/format";
import { ArrowRight, Check } from "./icons";
import { PopNumber, Reveal, Stagger, StaggerItem } from "./reveal";
import { asset } from "@/lib/asset";

const PRO_PRICE = 999;

/** Калькулятор выгоды: отмечаете подписки, видите экономию против тарифа «Про». */
export function SavingsCalculator() {
  const { t, lang } = useT();
  const c = t.calc;
  const [picked, setPicked] = useState(() => new Set(services.filter((s) => s.on).map((s) => s.id)));

  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const sum = services.filter((s) => picked.has(s.id)).reduce((a, s) => a + s.price, 0);
  const save = sum - PRO_PRICE;

  return (
    <section id="calculator" className="mx-auto max-w-[880px] px-4 py-16 text-center sm:px-8 sm:py-20">
      <Stagger gap={0.15}>
        <StaggerItem>
          <h2 className="text-[32px] font-medium leading-[1.08] tracking-[-1px] sm:text-5xl sm:tracking-[-1.6px]">
            {c.title}
          </h2>
        </StaggerItem>
        <StaggerItem>
          <div className="mt-8 text-[64px] font-medium leading-none tracking-[-2.4px] tabular-nums sm:text-[96px] sm:tracking-[-4px]" aria-live="polite">
            <PopNumber value={save > 0 ? num(save, lang) : "0"} />
            <small className="text-[24px] tracking-[-1px] text-dim sm:text-[32px]">{c.perMonth}</small>
          </div>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-3 text-lg text-muted tabular-nums">
            {save > 0 ? c.yearly(rub(save * 12, lang)) : c.cheaper}
          </p>
        </StaggerItem>
      </Stagger>

      <Stagger className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4" gap={0.07} delay={0.45}>
        {services.map((s) => {
          const on = picked.has(s.id);
          return (
            <StaggerItem key={s.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.id)}
                className="group relative flex w-full flex-col items-start gap-3 rounded-2xl border border-line p-4 text-left transition-colors aria-pressed:border-line-strong aria-pressed:bg-card"
              >
                <span className="absolute right-3 top-3 flex size-[22px] items-center justify-center rounded-[7px] border-[1.5px] border-faint text-transparent group-aria-pressed:border-accent group-aria-pressed:bg-accent group-aria-pressed:text-on-accent">
                  <Check size={14} />
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element -- монохромный SVG */}
                <img src={asset(`/logos/${s.logo}.svg`)} alt="" width={24} height={24} className="logo-mono size-6 opacity-40 group-aria-pressed:opacity-100" />
                <span>
                  <span className="block text-sm text-dim group-aria-pressed:text-text">{s.name}</span>
                  <span className="mt-1 block text-base tabular-nums text-dim group-aria-pressed:text-text">{rub(s.price, lang)}</span>
                </span>
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal delay={0.4}>
        <p className="mt-8 text-sm text-dim">
          {c.basis}
        </p>
        <a
          href="#pricing"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-[14px] bg-accent pl-6 pr-5 text-base font-medium text-on-accent transition-colors hover:bg-accent-hover"
        >
          {c.cta} <ArrowRight />
        </a>
      </Reveal>
    </section>
  );
}
