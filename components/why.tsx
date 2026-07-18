"use client";

import { motion } from "motion/react";
import { BELIEFS } from "@/lib/content";
import { motionEase, useScrollReveal } from "./motion-primitives";
import { ScrollSharpenText } from "./scroll-sharpen-text";

export function Why() {
  const labelReveal = useScrollReveal({ distance: 20 });
  const lineReveal = useScrollReveal({ delay: 0.08, distance: 0, x: -28, blur: 0 });

  return (
    <section id="why" className="relative bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="mb-16 flex items-baseline gap-4 lg:mb-24">
          <motion.span
            {...labelReveal}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-ember"
          >
            Why Arup
          </motion.span>
          <motion.span
            {...lineReveal}
            transition={{ duration: 0.7, ease: motionEase }}
            className="h-px flex-1 bg-onyx/12"
          />
        </div>

        <div className="flex flex-col gap-14 lg:gap-24">
          {BELIEFS.map((b, i) => (
            <BeliefRow
              key={b.lead}
              lead={b.lead}
              body={b.body}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BeliefRow({
  lead,
  body,
  index,
}: {
  lead: string;
  body: string;
  index: number;
}) {
  const numberReveal = useScrollReveal({ delay: 0.02, distance: 22 });
  const leadReveal = useScrollReveal({ delay: 0.08, distance: 28 });
  const bodyReveal = useScrollReveal({ delay: 0.16, distance: 28 });

  return (
    <article className="grid items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
      <div className="flex items-start gap-6 lg:gap-10">
        <motion.span
          {...numberReveal}
          className="pt-3 font-mono text-[13px] font-bold tabular-nums text-onyx/60"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
        <motion.h3
          {...leadReveal}
          className="text-balance font-black tracking-[-0.03em] text-onyx text-[clamp(1.75rem,3.5vw+0.5rem,3rem)] leading-[1.02]"
        >
          {lead}
        </motion.h3>
      </div>
      <motion.div {...bodyReveal} className="lg:pt-4">
        <ScrollSharpenText
          text={body}
          className="text-pretty text-[17px] leading-[1.6] text-onyx"
        />
      </motion.div>
    </article>
  );
}
