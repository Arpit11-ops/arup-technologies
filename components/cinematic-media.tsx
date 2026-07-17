"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { motionEase, useMotionReady } from "./motion-primitives";
import type { ReactNode } from "react";

type CinematicMediaProps = {
  src: string;
  className?: string;
  label?: string;
  priority?: boolean;
  children?: ReactNode;
};

export function CinematicMedia({
  src,
  className,
  label = "Arup systems in motion",
  priority = false,
  children,
}: CinematicMediaProps) {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;

  return (
    <motion.div
      initial={shouldAnimate ? { clipPath: "inset(0 100% 0 0)" } : false}
      animate={shouldAnimate ? { clipPath: "inset(0 0% 0 0)" } : undefined}
      transition={{ duration: 1.15, ease: motionEase, delay: 0.08 }}
      className={cn("isolate overflow-hidden bg-graphite", className)}
    >
      <video
        autoPlay={!reduced}
        loop
        muted
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-label={label}
        className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 saturate-0 opacity-55 mix-blend-screen"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="system-grid absolute inset-0 opacity-35" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.2),rgba(10,10,10,0.82)_74%)]" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
