"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BELIEFS } from "@/lib/content";
import { assetPath } from "@/lib/utils";
import { useScrollReveal } from "./motion-primitives";
import { RouteSignal } from "./route-signal";

export function AboutContent() {
  const heroCopy = useScrollReveal({ delay: 0.08, distance: 28, blur: 6 });
  const mediaReveal = useScrollReveal({ delay: 0.12, distance: 38, blur: 10 });

  return (
    <>
      <section id="top" className="relative overflow-hidden bg-bone py-20 lg:py-28">
        <RouteSignal className="route-glow absolute right-[-5rem] top-20 hidden h-28 w-[45vw] text-ember lg:block" />
        <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:px-12">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 36, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="max-w-[12ch] text-balance text-[clamp(3.5rem,7.6vw,6rem)] font-black leading-[0.89] tracking-[-0.04em] text-onyx">
              Small enough to stay close. Built wide enough to ship.
            </motion.h1>
            <motion.p {...heroCopy} className="mt-8 max-w-[52ch] text-[17px] leading-[1.62] text-onyx/66">
              Arup Technologies is a hands-on digital partner for founders and growing teams. Strategy, design, engineering, growth, and automation sit close enough to solve the same problem together.
            </motion.p>
          </div>
          <motion.div {...mediaReveal} className="relative min-h-[560px] overflow-hidden bg-onyx lg:min-h-[760px]">
            <Image src={assetPath("/generated/device-system.png")} alt="Arup capability study across laptop, tablet, and mobile interfaces" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
            <div className="absolute bottom-0 left-0 max-w-[330px] bg-ember p-6 text-white">
              <p className="text-[13px] font-bold uppercase tracking-[0.13em]">The operating idea</p>
              <p className="mt-3 text-[22px] font-black leading-[1.05]">Fewer handoffs. Better decisions. Work that reaches the market.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-onyx py-24 text-bone lg:py-32">
        <div className="system-grid absolute inset-0 opacity-15" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <p className="max-w-[17ch] text-balance text-[clamp(2.8rem,6vw,5.6rem)] font-black leading-[0.91] tracking-[-0.04em]">What stays true when the brief changes.</p>
          <div className="mt-16 border-t border-bone/18">
            {BELIEFS.map((belief, index) => <Belief key={belief.lead} index={index} lead={belief.lead} body={belief.body} />)}
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-12">
          <div>
            <h2 className="text-[clamp(2.6rem,5vw,4.8rem)] font-black leading-[0.92] tracking-[-0.04em] text-onyx">Based here. Working everywhere.</h2>
          </div>
          <div className="grid gap-px bg-onyx/15 sm:grid-cols-2">
            <Location city="Bengaluru" note="Technology, product, and delivery" />
            <Location city="Delhi NCR" note="Strategy, growth, and partnerships" />
          </div>
          <div className="lg:col-start-2">
            <p className="max-w-[58ch] text-[17px] leading-[1.65] text-onyx/65">We work across India with a remote-first delivery rhythm: direct access to the people doing the work, weekly progress you can see, and decisions documented without turning the project into paperwork.</p>
            <Link href="/contact" className="group mt-8 inline-flex h-13 items-center gap-3 rounded-[4px] bg-onyx px-7 text-[14px] font-bold text-bone transition-colors hover:bg-ember">Meet the team through the work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Belief({ index, lead, body }: { index: number; lead: string; body: string }) {
  const reveal = useScrollReveal({ delay: index * 0.07, distance: 28, blur: 5 });
  return (
    <motion.article {...reveal} className="grid gap-5 border-b border-bone/18 py-8 lg:grid-cols-[0.08fr_0.62fr_0.3fr] lg:items-start lg:gap-10">
      <span className="text-[12px] font-bold text-ember">0{index + 1}</span>
      <h3 className="text-[clamp(1.9rem,3vw,3.2rem)] font-black leading-[0.98] tracking-[-0.035em]">{lead}</h3>
      <p className="text-[15px] leading-[1.65] text-bone/62">{body}</p>
    </motion.article>
  );
}

function Location({ city, note }: { city: string; note: string }) {
  return <div className="min-h-52 bg-bone p-7"><p className="text-[clamp(2.1rem,4vw,3.6rem)] font-black tracking-[-0.04em] text-onyx">{city}</p><p className="mt-12 text-[14px] font-medium text-onyx/55">{note}</p></div>;
}
