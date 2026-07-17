"use client";

import { motion, useReducedMotion } from "motion/react";
import { PROCESS_STEPS } from "@/lib/content";
import { motionEase, useMotionReady, useScrollReveal } from "./motion-primitives";

export function Process() {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;
  const titleReveal = useScrollReveal({ distance: 30, blur: 8 });
  const copyReveal = useScrollReveal({ delay: 0.08, distance: 24 });

  return (
    <section id="process" className="relative overflow-hidden bg-onyx py-24 text-bone lg:py-32">
      <div className="system-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <motion.h2 {...titleReveal} className="max-w-[11ch] text-balance text-[clamp(2.8rem,5.8vw,5.4rem)] font-black leading-[0.91] tracking-[-0.04em]">
            One clear route from idea to scale.
          </motion.h2>
          <motion.p {...copyReveal} className="max-w-[48ch] text-[16px] leading-[1.6] text-bone/65 lg:justify-self-end">
            You see the work while it is happening. Decisions stay close to the people building, and every stage ends with something concrete.
          </motion.p>
        </div>

        <div className="relative mt-20">
          <svg aria-hidden="true" viewBox="0 0 1000 130" preserveAspectRatio="none" className="absolute left-[5%] top-2 hidden h-28 w-[90%] lg:block">
            <path d="M0 22 H210 Q230 22 230 42 V82 Q230 102 250 102 H490 Q510 102 510 82 V52 Q510 32 530 32 H740 Q760 32 760 52 V88 Q760 108 780 108 H1000" fill="none" stroke="rgba(244,244,242,.16)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <motion.path
              d="M0 22 H210 Q230 22 230 42 V82 Q230 102 250 102 H490 Q510 102 510 82 V52 Q510 32 530 32 H740 Q760 32 760 52 V88 Q760 108 780 108 H1000"
              fill="none"
              stroke="#ea5b2e"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              initial={shouldAnimate ? { pathLength: 0 } : false}
              whileInView={shouldAnimate ? { pathLength: 1 } : undefined}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1.4, ease: motionEase }}
              className="route-glow"
            />
          </svg>

          <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:pt-24">
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep key={step.label} label={step.label} body={step.body} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ label, body, index }: { label: string; body: string; index: number }) {
  const reveal = useScrollReveal({ delay: index * 0.08, distance: 30, blur: 6 });
  return (
    <motion.li {...reveal} className="relative border-t border-bone/18 pt-6 lg:min-h-[230px] lg:border-l lg:border-t-0 lg:px-7 lg:first:border-l-0 lg:first:pl-0">
      <div className="mb-9 flex items-center gap-3 lg:absolute lg:-top-[3.55rem] lg:left-7 lg:mb-0 lg:first:left-0">
        <span className="route-glow h-3 w-3 rounded-full border-2 border-ember bg-onyx" />
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ember">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="text-[1.55rem] font-black tracking-[-0.03em]">{label}</h3>
      <p className="mt-4 max-w-[31ch] text-[14px] leading-[1.6] text-bone/62">{body}</p>
    </motion.li>
  );
}
