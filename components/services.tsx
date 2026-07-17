"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, type Service } from "@/lib/services";
import { assetPath } from "@/lib/utils";
import { motionEase, useMotionReady, useScrollReveal } from "./motion-primitives";

export function Services() {
  const titleReveal = useScrollReveal({ distance: 30, blur: 8 });
  const copyReveal = useScrollReveal({ delay: 0.08, distance: 24 });

  return (
    <section id="services" className="relative overflow-hidden bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.55fr] lg:items-end">
          <motion.h2 {...titleReveal} className="max-w-[15ch] text-balance text-[clamp(2.8rem,6.4vw,6rem)] font-black leading-[0.9] tracking-[-0.04em] text-onyx">
            End-to-end solutions. Built to scale.
          </motion.h2>
          <motion.div {...copyReveal} className="lg:pb-2">
            <p className="max-w-[45ch] text-[16px] leading-[1.6] text-onyx/65">
              Six connected capabilities, one accountable team. Start with one service or combine the stack around the outcome you need.
            </p>
            <Link href="/services" className="group mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-onyx">
              View all services
              <ArrowUpRight className="h-4 w-4 text-ember transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          {...useScrollReveal({ delay: 0.08, distance: 36, blur: 9 })}
          className="relative mt-16 aspect-[16/10] overflow-hidden bg-white sm:aspect-[16/8.2]"
        >
          <Image
            src={assetPath("/generated/capability-wall.png")}
            alt="Arup capability study showing six connected digital disciplines"
            fill
            sizes="(min-width: 1440px) 1344px, 100vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.015]"
          />
          <div className="absolute left-4 top-4 flex items-center gap-2 bg-onyx px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-bone sm:left-6 sm:top-6">
            <span className="h-1.5 w-1.5 bg-ember" />
            One connected system
          </div>
        </motion.div>

        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory overflow-x-auto border-y border-onyx/15 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
          {SERVICES.map((service, index) => (
            <ServiceRailItem key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRailItem({ service, index }: { service: Service; index: number }) {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;
  const reveal = useScrollReveal({ delay: index * 0.055, distance: 34, blur: 6 });

  return (
    <motion.article {...reveal} className="group w-[78vw] shrink-0 snap-start border-r border-onyx/15 py-7 pr-5 first:border-l first:pl-5 sm:w-[46vw] lg:w-auto lg:px-4 lg:first:pl-4 lg:last:pr-4">
      <Link href={`/services#${service.slug}`} className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember">
        <div className="flex items-center justify-between text-[11px] font-bold text-onyx/50">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <ArrowUpRight className="h-4 w-4 text-ember opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <h3 className="mt-8 min-h-[3.8rem] text-balance text-[clamp(1.4rem,2.2vw,2rem)] font-black leading-[0.98] tracking-[-0.03em] text-onyx">
          {service.name}
        </h3>
        <motion.div
          whileHover={shouldAnimate ? { x: 4 } : undefined}
          transition={{ duration: 0.35, ease: motionEase }}
          className="mt-8 h-px w-full origin-left bg-onyx/18 transition-colors group-hover:bg-ember"
        />
        <p className="mt-6 text-[14px] leading-[1.5] text-onyx/62">{service.short}</p>
      </Link>
    </motion.article>
  );
}
