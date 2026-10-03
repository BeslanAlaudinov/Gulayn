"use client";

import { useT } from "@/i18n/use-t";
import { LogoMarquee } from "./logo-marquee";
import { PromptBar } from "./prompt-bar";
import { Reveal } from "./reveal";

export function Hero() {
  const { t } = useT();
  return (
    <section id="top" className="relative flex flex-col items-center overflow-hidden sm:min-h-[900px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(var(--dot)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_40%,#000_30%,transparent_100%)]"
      />

      <div className="relative z-10 flex w-full max-w-[880px] flex-col items-center px-4 pt-32 text-center">
        <Reveal onLoad>
          <h1 className="text-[44px] font-medium leading-[1.04] tracking-[-1.6px] sm:text-[72px] sm:tracking-[-2.8px]">
            {t.hero.title1}
            <br />
            <span className="text-dim">{t.hero.title2}</span>
          </h1>
        </Reveal>
        <Reveal onLoad delay={0.25}>
          <p className="mt-6 max-w-[600px] text-lg leading-normal text-muted">
            {t.hero.lead}
          </p>
        </Reveal>
        <Reveal onLoad delay={0.5} className="mt-12 flex w-full justify-center">
          <PromptBar />
        </Reveal>
        <Reveal onLoad delay={0.7}>
          <p className="mt-4 text-sm text-dim">{t.hero.note}</p>
        </Reveal>
      </div>

      <Reveal onLoad delay={0.9} className="relative z-10 mt-8 w-full sm:mt-auto">
        <LogoMarquee />
      </Reveal>
    </section>
  );
}
