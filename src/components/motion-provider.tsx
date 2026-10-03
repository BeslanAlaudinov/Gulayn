"use client";

import { MotionConfig } from "motion/react";

/** Уважаем системную настройку «уменьшить движение» во всех анимациях Motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
