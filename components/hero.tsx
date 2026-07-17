"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { WHATSAPP_HREF, assetPath } from "@/lib/utils";
import { MotionAnchor, motionEase, useMotionReady } from "./motion-primitives";
import { RouteSignal } from "./route-signal";
import { WordReveal } from "./word-reveal";

export function Hero() {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;
  const reveal = (delay: number, distance = 24) => ({
    initial: shouldAnimate ? { opacity: 0, y: distance, filter: "blur(8px)" } : false,
    animate: shouldAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 0.75, ease: motionEase, delay },
  });

  return (
    <section id="top" className="signal-grain relative min-h-[calc(100svh-72px)] overflow-hidden bg-onyx text-bone">
      <Image
        src={assetPath("/generated/hero-systems.png")}
        alt="Arup capability study showing a connected digital product system"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center] opacity-88"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0a_0%,rgba(10,10,10,0.97)_42%,rgba(10,10,10,0.16)_100%)]" />
      <RouteSignal className="route-glow absolute right-[6%] top-[17%] hidden h-36 w-[42vw] text-ember lg:block" />

      <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-[1440px] items-end gap-10 px-5 pb-10 pt-16 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,1.1fr)] lg:px-12 lg:pb-12 lg:pt-20">
        <div className="relative z-20 max-w-[760px]">
          <motion.div {...reveal(0)}>
            <WordReveal
              lines={[
                [{ text: "One team for" }],
                [{ text: "the entire" }],
                [{ text: "digital stack.", accent: true }],
              ]}
              underlineAccent="stack."
              startDelay={0}
              stagger={0.032}
              className="text-balance text-[clamp(3.5rem,8.1vw,6rem)] font-black leading-[0.88] tracking-[-0.04em] text-bone"
            />
          </motion.div>

          <motion.div {...reveal(0.1)} className="mt-8 grid gap-6 border-t border-bone/20 pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <p className="max-w-[48ch] text-pretty text-[16px] leading-[1.55] text-bone/72 sm:text-[18px]">
              Websites, campaigns, SEO, software, apps, and AI automation.
              Built together so founders can move faster without managing five vendors.
            </p>
            <ArrowDownRight className="hidden h-8 w-8 text-ember sm:block" strokeWidth={1.5} />
          </motion.div>

          <motion.div {...reveal(0.16)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MotionAnchor
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-[4px] bg-ember px-7 text-[14px] font-bold text-white transition-colors hover:bg-bone hover:text-onyx focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone"
            >
              <MessageCircle className="h-4 w-4" />
              Talk on WhatsApp
            </MotionAnchor>
            <MotionAnchor
              href="#services"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-[4px] border border-bone/35 px-7 text-[14px] font-bold text-bone transition-colors hover:border-bone hover:bg-bone hover:text-onyx focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone"
            >
              Explore our work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MotionAnchor>
          </motion.div>
        </div>

        <motion.div
          initial={shouldAnimate ? { opacity: 0, x: 50, scale: 0.94, filter: "blur(12px)" } : false}
          animate={shouldAnimate ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" } : undefined}
          transition={{ duration: 1, ease: motionEase, delay: 0.08 }}
          className="relative z-10 hidden min-h-[620px] items-end justify-end lg:flex"
        >
          <div className="mb-5 flex items-center gap-3 border border-bone/20 bg-onyx/72 px-4 py-3 backdrop-blur-md">
            <span className="h-2 w-2 bg-ember" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-bone/70">Arup capability system</span>
          </div>
        </motion.div>

        <motion.div {...reveal(0.24, 14)} className="col-span-full mt-10 grid gap-4 border-t border-bone/20 pt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-bone/55 sm:grid-cols-3 lg:grid-cols-6">
          {['Websites','Marketing','SEO','Software','Apps','AI + automation'].map((label) => (
            <span key={label} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-ember" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
