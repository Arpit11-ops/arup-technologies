"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import { PROCESS_STEPS } from "@/lib/content";
import { useMotionReady, useScrollReveal } from "./motion-primitives";

const ROUTE_PATH =
  "M0 22 H210 Q230 22 230 42 V82 Q230 102 250 102 H490 Q510 102 510 82 V52 Q510 32 530 32 H740 Q760 32 760 52 V88 Q760 108 780 108 H1000";

/** Scroll-progress point at which the route line reaches each step marker. */
const STEP_THRESHOLDS = [0.1, 0.3, 0.5, 0.7];

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return desktop;
}

export function Process() {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;
  const isDesktop = useIsDesktop();
  const scrub = shouldAnimate && isDesktop;

  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const routeProgress = useTransform(scrollYProgress, [0.06, 0.86], [0, 1]);

  const titleReveal = useScrollReveal({ distance: 30, blur: 8 });
  const copyReveal = useScrollReveal({ delay: 0.08, distance: 24 });

  return (
    <section id="process" className="relative bg-onyx text-bone">
      <div ref={trackRef} className="motion-safe:lg:h-[260vh]">
        <div className="relative overflow-hidden py-24 motion-safe:lg:sticky motion-safe:lg:top-[72px] motion-safe:lg:flex motion-safe:lg:h-[calc(100svh-72px)] motion-safe:lg:flex-col motion-safe:lg:justify-center motion-safe:lg:py-0">
          <div className="system-grid absolute inset-0 opacity-20" />
          <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <motion.h2 {...titleReveal} className="max-w-[11ch] text-balance text-[clamp(2.8rem,5.8vw,5.4rem)] font-black leading-[0.91] tracking-[-0.04em] motion-safe:lg:text-[min(clamp(2.8rem,5.8vw,5.4rem),10svh)]">
                One clear route from idea to scale.
              </motion.h2>
              <motion.p {...copyReveal} className="max-w-[48ch] text-[16px] leading-[1.6] text-bone/65 lg:justify-self-end">
                You see the work while it is happening. Decisions stay close to the people building, and every stage ends with something concrete.
              </motion.p>
            </div>

            <div className="relative mt-20 motion-safe:lg:mt-[clamp(2rem,8svh,5rem)]">
              <svg aria-hidden="true" viewBox="0 0 1000 130" preserveAspectRatio="none" className="absolute left-[5%] top-2 hidden h-28 w-[90%] lg:block">
                <path
                  d={ROUTE_PATH}
                  fill="none"
                  stroke="rgba(245,241,235,.16)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <motion.path
                  d={ROUTE_PATH}
                  fill="none"
                  stroke="#ea5b2e"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  className="route-glow"
                  style={scrub ? { pathLength: routeProgress } : undefined}
                />
              </svg>

              <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:pt-24 motion-safe:lg:pt-[clamp(4.5rem,12svh,6rem)]">
                {PROCESS_STEPS.map((step, index) => (
                  <ProcessStep
                    key={`${scrub ? "scrub" : "reveal"}-${step.label}`}
                    label={step.label}
                    body={step.body}
                    index={index}
                    scrub={scrub}
                    progress={scrollYProgress}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  label,
  body,
  index,
  scrub,
  progress,
}: {
  label: string;
  body: string;
  index: number;
  scrub: boolean;
  progress: MotionValue<number>;
}) {
  if (scrub) {
    return <ScrubProcessStep label={label} body={body} index={index} progress={progress} />;
  }

  return <RevealProcessStep label={label} body={body} index={index} />;
}

function ScrubProcessStep({
  label,
  body,
  index,
  progress,
}: {
  label: string;
  body: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = STEP_THRESHOLDS[index];
  const end = start + 0.08;
  const opacity = useTransform(progress, [start, end], [0.3, 1]);
  const markerColor = useTransform(progress, [start, end], ["rgba(245,241,235,0.3)", "#ea5b2e"]);
  const numberColor = useTransform(progress, [start, end], ["rgba(245,241,235,0.45)", "#ea5b2e"]);
  const scrubStyle = { "--step-opacity": opacity } as MotionStyle;

  return (
    <motion.li
      style={scrubStyle}
      className="relative border-t border-bone/18 pt-6 opacity-[var(--step-opacity)] lg:min-h-[230px] lg:border-l lg:border-t-0 lg:px-7 lg:first:border-l-0 lg:first:pl-0 motion-safe:lg:min-h-[clamp(11.25rem,28svh,14.375rem)]"
    >
      <ProcessStepContent
        label={label}
        body={body}
        index={index}
        markerColor={markerColor}
        numberColor={numberColor}
      />
    </motion.li>
  );
}

function RevealProcessStep({ label, body, index }: { label: string; body: string; index: number }) {
  const reveal = useScrollReveal({ delay: index * 0.08, distance: 30, blur: 6 });

  return (
    <motion.li
      {...reveal}
      className="relative border-t border-bone/18 pt-6 lg:min-h-[230px] lg:border-l lg:border-t-0 lg:px-7 lg:first:border-l-0 lg:first:pl-0"
    >
      <ProcessStepContent label={label} body={body} index={index} />
    </motion.li>
  );
}

function ProcessStepContent({
  label,
  body,
  index,
  markerColor,
  numberColor,
}: {
  label: string;
  body: string;
  index: number;
  markerColor?: MotionValue<string>;
  numberColor?: MotionValue<string>;
}) {
  return (
    <>
      <div className="mb-9 flex items-center gap-3 lg:absolute lg:-top-[3.55rem] lg:left-7 lg:mb-0 lg:first:left-0">
        <motion.span
          style={markerColor ? { borderColor: markerColor } : undefined}
          className="route-glow h-3 w-3 rounded-full border-2 border-ember bg-onyx"
        />
        <motion.span
          style={numberColor ? { color: numberColor } : undefined}
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-ember"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>
      <h3 className="text-[1.55rem] font-black tracking-[-0.03em]">{label}</h3>
      <p className="mt-4 max-w-[31ch] text-[14px] leading-[1.6] text-bone/62">{body}</p>
    </>
  );
}
