"use client";

import { motion } from "motion/react";
import { WHATSAPP_HREF } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { MotionAnchor, useScrollReveal } from "./motion-primitives";

export function ServicesTransition() {
  const titleReveal = useScrollReveal({ distance: 28 });
  const copyReveal = useScrollReveal({ delay: 0.08, distance: 28 });
  const ctaReveal = useScrollReveal({ delay: 0.16, distance: 24 });

  return (
    <section className="relative bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-[1000px] px-6 text-center lg:px-10">
        <motion.h2
          {...titleReveal}
          className="text-balance font-black tracking-[-0.03em] text-onyx text-[clamp(1.75rem,3vw+0.75rem,2.75rem)] leading-[1.05]"
        >
          Not sure which one fits?
        </motion.h2>
        <motion.p
          {...copyReveal}
          className="mx-auto mt-6 max-w-[54ch] text-pretty text-[17px] leading-[1.55] text-onyx/70"
        >
          Message us with a sentence about what you&apos;re working on. We&apos;ll
          tell you honestly — even if the answer is &ldquo;you don&apos;t need us for
          that.&rdquo;
        </motion.p>

        <motion.div
          {...ctaReveal}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <MotionAnchor
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-ember px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-8px_rgba(234,91,46,0.55)] transition-all duration-200 hover:bg-ember-deep hover:shadow-[0_14px_36px_-8px_rgba(234,91,46,0.7)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
          >
            <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2.5} />
            Ask us anything on WhatsApp
          </MotionAnchor>
        </motion.div>
      </div>
    </section>
  );
}
