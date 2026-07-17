"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import type { Service } from "@/lib/services";
import { assetPath, cn, whatsappHrefFor } from "@/lib/utils";
import { motionEase, useMotionReady, useScrollReveal } from "./motion-primitives";

type Props = {
  service: Service;
  index: number;
  dark: boolean;
  reverse: boolean;
};

const VISUALS = [
  { src: assetPath("/generated/hero-systems.png"), position: "72% center" },
  { src: assetPath("/generated/capability-wall.png"), position: "center" },
  { src: assetPath("/generated/device-system.png"), position: "center" },
] as const;

export function ServiceDetail({ service, index, dark, reverse }: Props) {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;
  const contentReveal = useScrollReveal({ distance: 34, x: reverse ? 20 : -20, blur: 8 });
  const mediaReveal = useScrollReveal({ delay: 0.08, distance: 42, x: reverse ? -24 : 24, blur: 10 });
  const visual = VISUALS[index % VISUALS.length];

  return (
    <section
      id={service.slug}
      className={cn("relative overflow-hidden py-24 lg:min-h-[92vh] lg:py-32", dark ? "bg-onyx text-bone" : "bg-bone text-onyx")}
    >
      <div className={cn("absolute inset-y-0 hidden w-px lg:block", reverse ? "left-1/2" : "right-1/2", dark ? "bg-bone/12" : "bg-onyx/12")} />
      <div className={cn("mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12", reverse && "lg:[&>*:first-child]:order-2")}>
        <motion.div {...contentReveal} className="max-w-[610px]">
          <p className={cn("text-[13px] font-bold", dark ? "text-ember" : "text-ember-deep")}>{service.short}</p>
          <h2 className="mt-5 text-balance text-[clamp(3rem,6vw,5.7rem)] font-black leading-[0.9] tracking-[-0.04em]">{service.name}</h2>
          <p className={cn("mt-7 max-w-[55ch] text-[17px] leading-[1.62]", dark ? "text-bone/68" : "text-onyx/66")}>{service.long}</p>

          <ul className={cn("mt-9 grid gap-0 border-y", dark ? "border-bone/18" : "border-onyx/15")}>
            {service.included.map((item) => (
              <li key={item} className={cn("flex items-start gap-3 border-b py-3.5 text-[14px] leading-[1.5] last:border-b-0", dark ? "border-bone/12 text-bone/78" : "border-onyx/10 text-onyx/75")}>
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className={cn("mt-6 flex items-center justify-between gap-5 text-[13px]", dark ? "text-bone/55" : "text-onyx/55")}>
            <span>Typical timing</span>
            <span className={cn("text-right font-bold", dark ? "text-bone" : "text-onyx")}>{service.timing}</span>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappHrefFor(service.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-ember px-6 text-[14px] font-bold text-white transition-colors hover:bg-ember-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember">
              <MessageCircle className="h-4 w-4" />
              Discuss this service
            </a>
            <a href="/contact" className={cn("group inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border px-6 text-[14px] font-bold transition-colors", dark ? "border-bone/30 hover:bg-bone hover:text-onyx" : "border-onyx/25 hover:bg-onyx hover:text-bone")}>
              Send a brief
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          {...mediaReveal}
          whileInView={shouldAnimate ? { y: [18, -10, 0] } : undefined}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: motionEase }}
          className="relative min-h-[440px] overflow-hidden lg:min-h-[680px]"
        >
          <Image
            src={visual.src}
            alt={`Arup ${service.name} capability study`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            style={{ objectPosition: visual.position }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/65 via-transparent to-transparent" />
          <span className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-bone/75">
            <span className="h-1.5 w-1.5 bg-ember" />
            Arup capability study
          </span>
        </motion.div>
      </div>
    </section>
  );
}
