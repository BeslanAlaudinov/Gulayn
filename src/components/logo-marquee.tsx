"use client";

import { brands } from "@/data/content";
import { useT } from "@/i18n/use-t";
import { asset } from "@/lib/asset";

/** Бегущая строка с логотипами и названиями нейросетей. Список продублирован для бесшовного цикла. */
export function LogoMarquee() {
  const { t } = useT();
  return (
    <section
      aria-label={t.hero.marquee}
      className="relative w-full overflow-hidden pb-20 pt-12 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]"
    >
      <ul className="marquee flex w-max items-center gap-12">
        {[...brands, ...brands].map((b, i) => (
          <li
            key={`${b.name}-${i}`}
            aria-hidden={i >= brands.length || undefined}
            className="group flex flex-none items-center gap-2.5 text-dim transition-colors hover:text-soft"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- монохромный SVG, оптимизация не нужна */}
            <img
              src={asset(`/logos/${b.logo}.svg`)}
              alt=""
              width={30}
              height={30}
              className="logo-mono size-7.5 object-contain opacity-50 transition-opacity group-hover:opacity-95"
            />
            <span className="whitespace-nowrap text-lg">{b.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
