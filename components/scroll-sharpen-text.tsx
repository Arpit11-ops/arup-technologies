"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionEase, useMotionReady } from "./motion-primitives";

export function ScrollSharpenText({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;

  return (
    <motion.p
      initial={shouldAnimate ? { opacity: 0.32, y: 24, filter: "blur(6px)" } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.85, ease: motionEase }}
      className={className}
    >
      {text}
    </motion.p>
  );
}
