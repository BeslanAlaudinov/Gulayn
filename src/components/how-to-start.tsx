"use client";

import { useT } from "@/i18n/use-t";
import { Download, Refresh, Sparkle } from "./icons";
import { SectionHead, Stagger, StaggerItem } from "./reveal";
import { asset } from "@/lib/asset";

const mock = "flex flex-col gap-2.5 rounded-[20px] border border-line bg-card p-5 lg:h-58";
const field = "flex h-11 items-center rounded-xl border px-3.5 text-sm";
const fieldMuted = `${field} border-line bg-well text-dim`;

function Step({ n, title, text, children }: { n: number; title: string; text: string; children: React.ReactNode }) {
  return (
    <StaggerItem className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="flex size-8 flex-none items-center justify-center rounded-[10px] bg-accent text-sm font-medium text-on-accent">
          {n}
        </span>
        {n < 3 && (
          <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--color-line-strong)_0_6px,transparent_6px_12px)]" />
        )}
      </div>
      <h3 className="text-2xl font-medium tracking-[-0.8px]">{title}</h3>
      <p className="max-w-[340px] text-base leading-normal text-muted">{text}</p>
      {children}
    </StaggerItem>
  );
}

function ModelRow({ logo, name, tag, on = false }: { logo: string; name: string; tag: string; on?: boolean }) {
  return (
    <div
      className={`flex h-11 items-center gap-2.5 rounded-xl px-3 text-sm ${
        on ? "border border-line-strong bg-card-2 text-text" : "text-muted"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- монохромный SVG */}
      <img src={asset(`/logos/${logo}.svg`)} alt="" width={18} height={18} className="logo-mono size-4.5" />
      {name}
      <span className="ml-auto text-xs text-dim">{tag}</span>
    </div>
  );
}

/** «Как начать»: три шага на пунктирной линии, у каждого мини-интерфейс. */
export function HowToStart() {
  const { t } = useT();
  const s = t.start;
  return (
    <section id="start" className="mx-auto max-w-[1248px] px-4 py-16 sm:px-8 sm:py-20">
      <SectionHead
        title={s.title}
        lead={s.lead}
      />

      <Stagger className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-3" gap={0.22} delay={0.35}>
        <Step n={1} title={s.steps[0].title} text={s.steps[0].text}>
          <div className={mock}>
            <div className={fieldMuted}>{s.email}</div>
            <div className={`${field} justify-center border-text bg-text font-medium text-bg`}>{s.create}</div>
            <span className="flex h-8 items-center gap-2 self-start rounded-[10px] bg-accent/15 px-3 text-sm text-accent-soft">
              <Sparkle />
              {s.gift}
            </span>
          </div>
        </Step>

        <Step n={2} title={s.steps[1].title} text={s.steps[1].text}>
          <div className={`${mock} gap-1`}>
            <ModelRow logo="openai" name="GPT-5.6" tag={s.from(5)} />
            <ModelRow logo="nanobanana" name="Nano Banana" tag={s.from(2)} on />
            <ModelRow logo="kling" name="Kling" tag={s.from(28)} />
            <ModelRow logo="suno" name="Suno" tag={s.music} />
          </div>
        </Step>

        <Step n={3} title={s.steps[2].title} text={s.steps[2].text}>
          <div className={mock}>
            <div className="flex items-center gap-3 rounded-xl border border-line bg-well p-3">
              <span
                className="size-14 flex-none rounded-[10px]"
                style={{ background: "radial-gradient(60% 50% at 30% 40%, #ff8a57, transparent 70%), radial-gradient(60% 60% at 75% 65%, #7aa2ff, transparent 70%), #1b1b1e" }}
              />
              <span>
                <b className="block text-sm font-medium">{s.ready}</b>
                <span className="mt-1 block text-xs text-dim">{s.readyMeta}</span>
              </span>
            </div>
            <div className="mt-2 flex gap-2 lg:mt-auto">
              <span className={`${field} flex-1 justify-center gap-2 border-line bg-well text-soft`}>
                <Refresh />
                {s.refine}
              </span>
              <span className={`${field} flex-1 justify-center gap-2 border-accent bg-accent font-medium text-on-accent`}>
                <Download />
                {s.download}
              </span>
            </div>
          </div>
        </Step>
      </Stagger>
    </section>
  );
}
