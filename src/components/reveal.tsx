"use client";

import { motion, type Variants } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;
/** Базовая длительность появления. Медленнее, чтобы лесенка читалась. */
export const DURATION = 0.9;

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  // После анимации фильтр и сдвиг снимаются, чтобы элемент не держал отдельный слой
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION, ease: EASE },
    transitionEnd: { filter: "none", transform: "none" },
  },
};

const inView = { whileInView: "shown", viewport: { once: true, amount: 0.2 } } as const;
const onMount = { animate: "shown" } as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Сразу при загрузке, а не при появлении в зоне видимости. */
  onLoad?: boolean;
};

/** Плавное появление блока: снизу, с лёгким размытием. Один раз. */
export function Reveal({ children, className, delay = 0, onLoad = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{
        hidden: item.hidden,
        shown: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: DURATION, ease: EASE, delay },
          transitionEnd: { filter: "none", transform: "none" },
        },
      }}
      {...(onLoad ? onMount : inView)}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Пауза между соседними элементами. */
  gap?: number;
  /** Задержка перед первым элементом, чтобы сначала успели появиться заголовок и подзаголовок. */
  delay?: number;
  onLoad?: boolean;
};

/** Контейнер, чьи дочерние StaggerItem появляются по очереди, лесенкой. */
export function Stagger({ children, className, gap = 0.12, delay = 0, onLoad = false }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{ hidden: {}, shown: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...(onLoad ? onMount : inView)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/** Заголовок раздела и подзаголовок: сначала один, следом второй. */
export function SectionHead({
  title,
  lead,
  className,
  center = false,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <Stagger className={className} gap={0.15}>
      <StaggerItem>
        <h2 className="text-[32px] font-medium leading-[1.08] tracking-[-1px] sm:text-5xl sm:tracking-[-1.6px]">{title}</h2>
      </StaggerItem>
      {lead && (
        <StaggerItem>
          <p className={`mt-4 max-w-[560px] text-lg leading-normal text-muted ${center ? "mx-auto" : ""}`}>{lead}</p>
        </StaggerItem>
      )}
    </Stagger>
  );
}

/** Число, которое мягко перещёлкивается при каждом изменении. */
export function PopNumber({ value, className }: { value: string; className?: string }) {
  return (
    <motion.span
      key={value}
      className={`inline-block ${className ?? ""}`}
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {value}
    </motion.span>
  );
}
