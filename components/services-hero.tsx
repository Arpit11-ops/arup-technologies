"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { assetPath } from "@/lib/utils";
import { motionEase, useMotionReady } from "./motion-primitives";
import { RouteSignal } from "./route-signal";
import { WordReveal } from "./word-reveal";

export function ServicesHero() {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;

  const handleServiceJump = (event: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;

    const target = document.getElementById(`${slug}-mobile`);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${slug}`);
  };

  return (
    <section id="top" className="signal-grain relative min-h-[calc(100svh-72px)] overflow-hidden bg-onyx text-bone">
      <Image src={assetPath("/generated/capability-wall.png")} alt="Six connected Arup digital capabilities" fill priority sizes="100vw" className="object-cover object-center opacity-78" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0a_0%,rgba(10,10,10,.94)_50%,rgba(10,10,10,.24)_100%)]" />
      <RouteSignal className="route-glow absolute right-[-4%] top-[18%] hidden h-40 w-[48vw] text-ember lg:block" />

      <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-[1440px] flex-col justify-between px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pt-24">
        <div className="max-w-[900px]">
          <WordReveal
            lines={[
              [{ text: "Six capabilities." }],
              [{ text: "One connected" }],
              [{ text: "delivery team.", accent: true }],
            ]}
            startDelay={0}
            stagger={0.035}
            className="text-balance text-[clamp(3.4rem,8vw,6rem)] font-black leading-[0.89] tracking-[-0.04em] text-bone"
          />
          <motion.p
            initial={shouldAnimate ? { opacity: 0, y: 26, filter: "blur(8px)" } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{ duration: 0.75, ease: motionEase, delay: 0.12 }}
            className="mt-8 max-w-[52ch] text-[17px] leading-[1.6] text-bone/70"
          >
            Bring us one stuck problem or the whole stack. We shape the scope honestly, build with the same core team, and keep every handoff visible.
          </motion.p>
        </div>

        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: motionEase, delay: 0.22 }}
          className="mt-16 grid gap-px border border-bone/20 bg-bone/20 sm:grid-cols-2 lg:grid-cols-6"
        >
          {SERVICES.map((service) => (
            <Link key={service.slug} href={`#${service.slug}`} onClick={(event) => handleServiceJump(event, service.slug)} className="group flex min-h-20 items-center justify-between gap-3 bg-onyx/85 px-4 py-4 text-[13px] font-bold transition-colors hover:bg-ember">
              <span>{service.name}</span>
              <ArrowDown className="h-4 w-4 shrink-0 transition-transform group-hover:translate-y-1" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
