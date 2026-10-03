"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";
import { faq, faqGroups } from "@/data/content";
import { Mail, PlusMinus, Send } from "./icons";
import { EASE, SectionHead, Stagger, StaggerItem } from "./reveal";

/** Частые вопросы: темы слева, ответы справа. Открыт только один ответ, раскрывается плавно. */
export function Faq() {
  const [group, setGroup] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const items = faq.filter((f) => f.group === group);

  const pickGroup = (g: number) => {
    setGroup(g);
    setOpen(0);
  };

  return (
    <section id="faq" className="mx-auto max-w-[1248px] scroll-mt-16 px-4 py-16 sm:px-8 sm:py-20">
      <SectionHead
        title="Частые вопросы"
        lead="Ответы из базы знаний Gulayn. Если чего-то нет, поддержка отвечает в Telegram."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
        <Stagger className="self-start lg:sticky lg:top-28" gap={0.08} delay={0.3}>
          <div role="group" aria-label="Темы вопросов" className="flex flex-col gap-1">
            {faqGroups.map((g, i) => (
              <StaggerItem key={g}>
                <button
                  type="button"
                  aria-pressed={group === i}
                  onClick={() => pickGroup(i)}
                  className="relative flex h-12 w-full items-center justify-between rounded-xl px-4 text-left text-base text-muted transition-colors duration-300 hover:text-text aria-pressed:text-text"
                >
                  {group === i && (
                    <motion.span
                      layoutId="faq-group"
                      className="absolute inset-0 rounded-xl bg-card"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative">{g}</span>
                  <i className="relative text-sm not-italic text-faint">{faq.filter((f) => f.group === i).length}</i>
                </button>
              </StaggerItem>
            ))}
          </div>
          <StaggerItem className="mt-6 rounded-[20px] border border-line bg-card p-5">
            <b className="block text-base font-medium">Не нашли ответ?</b>
            <span className="mt-1.5 block text-sm leading-normal text-dim">Пишите, отвечаем быстро и по делу.</span>
            <div className="mt-4 flex flex-col gap-2">
              <a href="https://t.me/gulayn_bot" className="flex h-10 items-center gap-2.5 rounded-[10px] border border-line bg-well px-3 text-sm transition-colors hover:border-line-strong">
                <Send /> Telegram @gulayn_bot
              </a>
              <a href="mailto:support@gulayn.ru" className="flex h-10 items-center gap-2.5 rounded-[10px] border border-line bg-well px-3 text-sm transition-colors hover:border-line-strong">
                <Mail /> support@gulayn.ru
              </a>
            </div>
          </StaggerItem>
        </Stagger>

        <Stagger key={group} className="flex flex-col" gap={0.08} delay={group === 0 ? 0.45 : 0}>
          {items.map((f, i) => {
            const isOpen = open === i;
            const id = `${baseId}-${group}-${i}`;
            return (
              <StaggerItem key={f.q} className={i > 0 ? "border-t border-line" : ""}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={`flex w-full items-center justify-between gap-6 text-left text-lg transition-colors hover:text-soft ${
                      i === 0 ? "pb-5" : "py-5"
                    }`}
                  >
                    {f.q}
                    <span
                      className={`flex size-8 flex-none items-center justify-center rounded-[10px] border border-line transition-colors duration-300 ${
                        isOpen ? "bg-card-2 text-text" : "text-muted"
                      }`}
                    >
                      <PlusMinus />
                    </span>
                  </button>
                </h3>
                <div id={id} role="region" className="answer" data-open={isOpen} inert={!isOpen}>
                  <div>
                    <p className="mb-6 max-w-[720px] text-base leading-relaxed text-muted">{f.a}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
