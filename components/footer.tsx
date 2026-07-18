"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { motionEase, useMotionReady, useScrollReveal } from "./motion-primitives";
import { motion, useReducedMotion } from "motion/react";
import { RouteSignal } from "./route-signal";

export function Footer() {
  const reveal = useScrollReveal({ distance: 24, blur: 4 });
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;

  return (
    <footer className="relative overflow-hidden bg-onyx pb-8 pt-20 text-bone lg:pt-28">
      <RouteSignal className="route-glow absolute right-[-3rem] top-10 h-28 w-[min(46vw,560px)] text-ember opacity-75" />
      <motion.div {...reveal} className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 border-b border-bone/15 pb-16 lg:grid-cols-[1.5fr_0.5fr_0.6fr] lg:gap-20">
          <div>
            <p className="max-w-[18ch] text-balance text-[clamp(2.4rem,5vw,5rem)] font-black leading-[0.95] tracking-[-0.04em]">
              One team. Full stack. Delivered.
            </p>
            <Link
              href="/contact"
              className="group mt-9 inline-flex h-12 items-center gap-3 rounded-[4px] bg-ember px-6 text-[14px] font-bold text-white transition-colors hover:bg-bone hover:text-onyx"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-bone/50">Navigate</span>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="w-fit text-[15px] font-bold text-bone/70 transition-colors hover:text-ember">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-[14px] text-bone/65">
            <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-bone/50">Working from</span>
            <span>Bengaluru</span>
            <span>Delhi NCR</span>
            <span>Across India</span>
          </div>
        </div>

        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" } : false}
          whileInView={shouldAnimate ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" } : undefined}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.78, ease: motionEase }}
          className="relative mt-10 overflow-hidden"
          aria-hidden="true"
        >
          <span className="block text-center text-[clamp(7rem,24vw,21rem)] font-black leading-[0.72] tracking-[-0.04em] text-bone/[0.07]">
            ARUP
          </span>
        </motion.div>

        <div className="mt-4 flex flex-col justify-between gap-3 border-t border-bone/15 pt-6 text-[12px] text-bone/55 sm:flex-row">
          <span>© {new Date().getFullYear()} Arup Technologies</span>
          <span>Built to move business forward.</span>
        </div>
      </motion.div>
    </footer>
  );
}
