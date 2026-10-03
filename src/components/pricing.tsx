"use client";

import { useState } from "react";
import { personalPlans, teamPlans, type Plan, type TeamPlan } from "@/data/content";
import type { Dict } from "@/i18n/dict";
import type { Lang } from "@/i18n/lang";
import { useT } from "@/i18n/use-t";
import { num, rub } from "@/lib/format";
import { ArrowRight, Check, Minus } from "./icons";
import { motion } from "motion/react";
import { EASE, PopNumber, Stagger, StaggerItem } from "./reveal";

type Period = "m" | "y";

function Segmented<T extends string>({
  id,
  value,
  onChange,
  options,
  label,
}: {
  id: string;
  value: T;
  onChange: (v: T) => void;
  options: { v: T; label: string; badge?: string }[];
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex gap-1 rounded-[14px] bg-card p-1">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          aria-pressed={value === o.v}
          onClick={() => onChange(o.v)}
          className="group relative flex h-10 items-center gap-2 rounded-[10px] px-4 text-sm text-muted transition-colors duration-300 hover:text-text aria-pressed:text-bg"
        >
          {value === o.v && (
            <motion.span
              layoutId={`seg-${id}`}
              className="absolute inset-0 rounded-[10px] bg-text"
              transition={{ duration: 0.45, ease: EASE }}
            />
          )}
          <span className="relative">{o.label}</span>
          {o.badge && (
            <em className="relative rounded-md bg-accent/15 px-1.5 py-0.5 text-xs not-italic text-accent-soft group-aria-pressed:bg-accent group-aria-pressed:text-on-accent">
              {o.badge}
            </em>
          )}
        </button>
      ))}
    </div>
  );
}

function Tick({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <li className={`flex gap-2.5 text-sm leading-[1.45] ${on ? "text-soft" : "text-faint"}`}>
      <span className={`mt-0.5 flex-none ${on ? "text-accent" : "text-faint"}`}>{on ? <Check /> : <Minus />}</span>
      {children}
    </li>
  );
}

const priceOf = (monthly: number, period: Period) => (period === "m" ? monthly : monthly * 10);

type Ctx = { t: Dict["pricing"]; lang: Lang; period: Period };

const unit = ({ t, period }: Ctx) => (period === "m" ? t.perMonth : t.perYear);

function PlanCard({ plan, team, ctx }: { plan: Plan | TeamPlan; team?: boolean; ctx: Ctx }) {
  const { t, lang, period } = ctx;
  const p = plan as Plan;
  const text = t.plans[plan.id];
  return (
    <article
      className={`relative flex h-full flex-col gap-5 rounded-3xl border p-7 ${
        plan.hot
          ? "border-accent/60 bg-[linear-gradient(180deg,rgb(255_107_53/0.08),rgb(255_107_53/0)_40%),var(--color-card)]"
          : "border-line bg-card"
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-medium">{text.name}</span>
          {plan.hot && (
            <span className="flex h-6.5 items-center rounded-lg bg-accent px-2.5 text-xs font-medium text-on-accent">{t.popular}</span>
          )}
        </div>
        <div className="mt-1 text-sm text-dim">{text.note}</div>
      </div>
      <div>
        <div className="flex items-baseline gap-1.5 tabular-nums">
          <b className="text-5xl font-medium leading-none tracking-[-1.8px]">
            <PopNumber value={rub(priceOf(plan.price, period), lang)} />
          </b>
          <span className="text-base text-dim">{unit(ctx)}</span>
        </div>
        <div className="mt-2 min-h-5 text-sm text-dim tabular-nums">
          {period === "y" && t.yearNote(rub(Math.round((plan.price * 10) / 12), lang), rub(plan.price * 2, lang))}
        </div>
      </div>
      <div className="rounded-2xl border border-line bg-well p-4">
        <b className="block text-xl font-medium tabular-nums">
          {t.tokens(num(plan.tokens, lang))}
          {team ? t.pool : ""}
        </b>
        {!team && (
          <span className="mt-1.5 block text-sm leading-[1.45] text-muted">
            {p.media
              ? t.coverMedia(num(p.msg, lang), num(p.img!, lang), num(p.vid!, lang))
              : t.coverText(num(p.msg, lang))}
          </span>
        )}
      </div>
      <ul className="flex flex-col gap-2.5">
        {team ? (
          <>
            <Tick on>{t.teamPool}</Tick>
            <Tick on>{t.teamSeats}</Tick>
            <Tick on>{t.teamOwner}</Tick>
            <Tick on>{t.raffle}</Tick>
          </>
        ) : (
          <>
            <Tick on={p.media}>{p.media ? t.allModels : t.textOnly}</Tick>
            <Tick on>{t.packs}</Tick>
            <Tick on={p.custom}>{t.custom}</Tick>
            <Tick on={p.raffle}>{t.raffle}</Tick>
          </>
        )}
      </ul>
      <a
        href="#register"
        className={`mt-auto flex h-12 items-center justify-center gap-2 rounded-[14px] border text-base transition-colors ${
          plan.hot
            ? "border-accent bg-accent font-medium text-on-accent hover:bg-accent-hover"
            : "border-line-strong hover:bg-hover"
        }`}
      >
        {t.choose(text.name)} <ArrowRight />
      </a>
    </article>
  );
}

function Shelf({ label, plan, desc, ctx }: { label: string; plan: Plan; desc: string; ctx: Ctx }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[20px] border border-line px-6 py-5">
      <div>
        <div className="text-xs text-dim">{label}</div>
        <div className="mt-1 text-lg font-medium tabular-nums">
          {ctx.t.plans[plan.id].name}{" "}
          <span className="whitespace-nowrap font-normal text-muted">
            · {rub(priceOf(plan.price, ctx.period), ctx.lang)} {unit(ctx)}
          </span>
        </div>
        <div className="mt-1 text-sm text-dim tabular-nums">{desc}</div>
      </div>
      <a
        href="#register"
        className="flex h-10 flex-none items-center gap-1.5 rounded-xl border border-line-strong px-3.5 text-sm transition-colors hover:bg-hover"
      >
        {ctx.t.chooseShort} <ArrowRight />
      </a>
    </div>
  );
}

/** Тарифы: три главных карточки, под ними Эконом, Бизнес и Ultra Elite. */
export function Pricing() {
  const [period, setPeriod] = useState<Period>("m");
  const [who, setWho] = useState<"me" | "team">("me");
  const [eco, base, pro, max, biz, ultra] = personalPlans;
  const { t: all, lang } = useT();
  const t = all.pricing;
  const ctx: Ctx = { t, lang, period };

  return (
    <section id="pricing" className="mx-auto max-w-[1248px] scroll-mt-16 px-4 py-16 sm:px-8 sm:py-20">
      <Stagger className="flex flex-wrap items-end justify-between gap-6" gap={0.15}>
        <div>
          <StaggerItem>
            <h2 className="text-[32px] font-medium leading-[1.08] tracking-[-1px] sm:text-5xl sm:tracking-[-1.6px]">{t.title}</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 max-w-[520px] text-lg leading-normal text-muted">
              {t.lead}
            </p>
          </StaggerItem>
        </div>
        <StaggerItem className="flex flex-wrap gap-3">
          <Segmented
            id="who"
            label={t.who}
            value={who}
            onChange={setWho}
            options={[
              { v: "me", label: t.me },
              { v: "team", label: t.team },
            ]}
          />
          <Segmented
            id="period"
            label={t.period}
            value={period}
            onChange={setPeriod}
            options={[
              { v: "m", label: t.month },
              { v: "y", label: t.year, badge: t.gift },
            ]}
          />
        </StaggerItem>
      </Stagger>

      {who === "me" ? (
        <>
          <Stagger key="me" className="mt-12 grid gap-3 lg:grid-cols-3" gap={0.15} delay={0.45}>
            {[base, pro, max].map((p) => (
              <StaggerItem key={p.id}>
                <PlanCard plan={p} ctx={ctx} />
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="mt-3 grid gap-3 lg:grid-cols-3" gap={0.12} delay={0.2}>
            <StaggerItem>
              <Shelf label={t.shelfChat} plan={eco} desc={t.shelfEco(num(eco.tokens, lang))} ctx={ctx} />
            </StaggerItem>
            <StaggerItem>
              <Shelf label={t.shelfStudio} plan={biz} desc={t.shelfBig(num(biz.tokens, lang), num(biz.img!, lang))} ctx={ctx} />
            </StaggerItem>
            <StaggerItem>
              <Shelf label={t.shelfAgency} plan={ultra} desc={t.shelfBig(num(ultra.tokens, lang), num(ultra.img!, lang))} ctx={ctx} />
            </StaggerItem>
          </Stagger>
        </>
      ) : (
        <Stagger key="team" onLoad className="mt-12 grid gap-3 lg:grid-cols-3" gap={0.12}>
          {teamPlans.map((p) => (
            <StaggerItem key={p.id}>
              <PlanCard plan={p} team ctx={ctx} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </section>
  );
}
