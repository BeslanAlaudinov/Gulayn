"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/use-t";
import { ArrowRight, ChevronDown, Mic, Plus } from "./icons";

const TICK = 45;
const HOLD_TICKS = 44;
const ERASE_STEP = 3;

/** Печатает и стирает примеры промптов по кругу. */
function useTypewriter(prompts: { model: string; text: string }[]) {
  const reduce = useReducedMotion();
  const [state, setState] = useState({ i: 0, n: 0, mode: "type" as "type" | "hold" | "erase", hold: 0 });

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setState((s) => {
        const len = prompts[s.i].text.length;
        if (s.mode === "type") return s.n < len ? { ...s, n: s.n + 1 } : { ...s, mode: "hold", hold: 0 };
        if (s.mode === "hold") return s.hold < HOLD_TICKS ? { ...s, hold: s.hold + 1 } : { ...s, mode: "erase" };
        return s.n > 0
          ? { ...s, n: Math.max(0, s.n - ERASE_STEP) }
          : { i: (s.i + 1) % prompts.length, n: 0, mode: "type", hold: 0 };
      });
    }, TICK);
    return () => clearInterval(id);
  }, [reduce, prompts]);

  const current = prompts[state.i];
  return { typed: reduce ? current.text : current.text.slice(0, state.n), model: current.model };
}

/**
 * Промпт-бар выглядит как поле ввода, но работает как кнопка:
 * ввести задачу на лендинге нельзя, человек всё равно идёт на регистрацию.
 */
export function PromptBar() {
  const { t } = useT();
  const { typed, model } = useTypewriter(t.hero.prompts);

  return (
    <div className="relative w-full max-w-[720px] rounded-[21px] bg-line-strong p-px">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[1040px] -translate-x-1/2 -translate-y-[42%] bg-[radial-gradient(ellipse_at_center,rgb(255_107_53/0.24)_0%,rgb(255_107_53/0.08)_40%,rgb(255_107_53/0)_70%)]"
      />
      <div aria-hidden="true" className="sweep absolute inset-0 rounded-[21px]" />
      <a
        href="#register"
        aria-label={t.hero.start}
        className="group relative flex flex-col gap-6 rounded-[20px] bg-card pb-4 pl-5 pr-4 pt-5 text-left transition-colors hover:bg-prompt-hover"
      >
        <span className="block h-13 overflow-hidden text-base leading-6 text-text sm:h-auto sm:min-h-7 sm:text-xl sm:leading-7" aria-hidden="true">
          {typed}
          <span className="caret ml-1 inline-block h-6 w-0.5 translate-y-1 bg-accent" />
        </span>
        <span className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-[10px] border border-line text-muted">
              <Plus />
            </span>
            <span className="flex h-9 items-center gap-2 rounded-[10px] border border-line px-3 text-sm text-soft">
              <span className="size-2 rounded-[2px] bg-accent" />
              <span>{model}</span>
              <ChevronDown />
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="hidden size-9 items-center justify-center text-muted sm:flex">
              <Mic />
            </span>
            <span className="flex h-9 items-center gap-2 rounded-[10px] whitespace-nowrap bg-accent pl-4 pr-3 text-sm font-medium text-on-accent transition-colors group-hover:bg-accent-hover">
              <span className="sm:hidden">{t.hero.startShort}</span>
              <span className="hidden sm:inline">{t.hero.start}</span>
              <ArrowRight />
            </span>
          </span>
        </span>
      </a>
    </div>
  );
}
