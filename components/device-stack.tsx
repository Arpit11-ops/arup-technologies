"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { DeviceFrame } from "./device-frame";
import { useMotionReady } from "./motion-primitives";

/**
 * Three real device mockups layered as a kinetic stack:
 *   1. Laptop — NoMoreChemFear website (Arup built it)
 *   2. Phone  — BAKKIT / Instagram creative (Arup produced it)
 *   3. Tablet — Content Studio, the AI marketing OS Arup builds
 *
 * SSR contract:
 *   - Every child renders in its final visible position on the server.
 *   - Motion only drives the outer group's cursor-tilt and a very slow drift.
 *   - Entrance animation is CSS keyframes, gated by the global
 *     `prefers-reduced-motion: reduce` block in globals.css.
 */
export function DeviceStack() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });
  const rotY = useTransform(springX, [-1, 1], [-5, 5]);
  const rotX = useTransform(springY, [-1, 1], [3, -3]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const el = wrap.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      rawX.set(Math.max(-1, Math.min(1, nx)));
      rawY.set(Math.max(-1, Math.min(1, ny)));
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [rawX, rawY]);

  return (
    <div
      ref={wrap}
      className="relative isolate mx-auto aspect-[5/4] w-full max-w-[640px] [perspective:1400px]"
      aria-label="A kinetic stack of three device screens showing real work by Arup Technologies"
    >
      {/* Ambient warm glow behind the stack */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] bottom-[8%] top-[26%] rounded-full bg-ember/25 blur-3xl"
      />

      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 animate-stack-drift motion-reduce:animate-none"
      >
        {/* Tablet — Content Studio — back left */}
        <div className="stack-item stack-item--tablet absolute left-[2%] top-[8%] w-[54%] origin-bottom-right -rotate-[6deg]">
          <DeviceFrame
            variant="tablet"
            src="/mockups/content-studio.webp"
            priority
            alt="Content Studio — Arup's AI marketing OS with human-review guardrails"
            bare
            className="shadow-[0_30px_80px_-25px_rgba(10,10,10,0.4)]"
          />
        </div>

        {/* Laptop — NoMoreChemFear — center-back, dominant */}
        <div className="stack-item stack-item--laptop absolute right-[4%] top-[18%] w-[62%]">
          <DeviceFrame
            variant="laptop"
            src="/mockups/nomorechemfear.webp"
            alt="NoMoreChemFear — chemistry tutoring site Arup built"
            priority
            className="shadow-[0_40px_100px_-30px_rgba(10,10,10,0.5)]"
          />
          <div
            aria-hidden
            className="mx-auto mt-[3%] h-1 w-[110%] -translate-x-[5%] rounded-b-md bg-onyx/70"
          />
        </div>

        {/* Phone — BAKKIT — foreground right */}
        <div className="stack-item stack-item--phone absolute bottom-[2%] right-[18%] w-[24%] origin-bottom-left rotate-[8deg]">
          <DeviceFrame
            variant="phone"
            src="/mockups/bakkit-poster.webp"
            alt="BAKKIT — social creative Arup produced for Cave Man foods"
            bare
            className="shadow-[0_25px_60px_-15px_rgba(10,10,10,0.45)]"
          />
        </div>

        {/* Live-work pill */}
        <div className="stack-item stack-item--pill absolute right-[6%] top-[6%] flex items-center gap-2 rounded-full bg-onyx px-3 py-1.5 shadow-lg">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-bone">
            Live work
          </span>
        </div>

        <motion.div
          aria-hidden
          initial={shouldAnimate ? { opacity: 0, y: 18, rotate: -4 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0, rotate: -2 } : undefined}
          transition={{ duration: 0.68, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[7%] bottom-[15%] w-[34%] rounded-2xl border border-bone/12 bg-onyx/92 p-3 text-bone shadow-[0_22px_50px_-20px_rgba(10,10,10,0.75)]"
        >
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-bone/55">
            <span>Lead flow</span>
            <span className="text-ember">+18%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bone/10">
            <motion.div
              className="h-full rounded-full bg-ember"
              initial={shouldAnimate ? { scaleX: 0 } : false}
              animate={shouldAnimate ? { scaleX: 0.78 } : undefined}
              transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          initial={shouldAnimate ? { opacity: 0, y: -14, rotate: 4 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0, rotate: 3 } : undefined}
          transition={{ duration: 0.68, delay: 0.94, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-[1%] bottom-[25%] w-[30%] rounded-2xl border border-onyx/10 bg-bone/95 p-3 text-onyx shadow-[0_22px_55px_-22px_rgba(10,10,10,0.45)]"
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-onyx/50">
            Automation
          </div>
          <div className="mt-2 flex items-center gap-2 text-[12px] font-black">
            <span className="h-2 w-2 rounded-full bg-ember" />
            Review queue live
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
