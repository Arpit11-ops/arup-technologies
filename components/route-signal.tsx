"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { motionEase, useMotionReady } from "./motion-primitives";

type RouteSignalProps = {
  className?: string;
  vertical?: boolean;
};

export function RouteSignal({ className, vertical = false }: RouteSignalProps) {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;
  const path = vertical
    ? "M16 2 V70 Q16 82 28 82 H62 Q74 82 74 94 V150 Q74 162 86 162 H116 V238"
    : "M2 42 H118 Q132 42 132 28 V18 Q132 4 146 4 H248 Q262 4 262 18 V54 Q262 68 276 68 H398";

  return (
    <svg
      aria-hidden="true"
      viewBox={vertical ? "0 0 132 240" : "0 0 400 72"}
      preserveAspectRatio="none"
      className={cn("pointer-events-none overflow-visible", className)}
    >
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
        animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.35, ease: motionEase, delay: 0.28 }}
      />
      <motion.circle
        cx={vertical ? 16 : 2}
        cy={vertical ? 2 : 42}
        r="4"
        fill="currentColor"
        initial={shouldAnimate ? { scale: 0 } : false}
        animate={shouldAnimate ? { scale: 1 } : undefined}
        transition={{ duration: 0.4, ease: motionEase, delay: 0.18 }}
      />
      <motion.circle
        cx={vertical ? 116 : 398}
        cy={vertical ? 238 : 68}
        r="5"
        fill="currentColor"
        initial={shouldAnimate ? { scale: 0 } : false}
        animate={shouldAnimate ? { scale: 1 } : undefined}
        transition={{ duration: 0.45, ease: motionEase, delay: 1.35 }}
      />
    </svg>
  );
}

