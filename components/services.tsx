"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/services";
import { assetPath } from "@/lib/utils";
import { motionEase, useMotionReady, useScrollReveal } from "./motion-primitives";

const SERVICE_ART = [
  "/images/services/websites.webp",
  "/images/services/digital-marketing.webp",
  "/images/services/seo.webp",
  "/images/services/software-development.webp",
  "/images/services/app-development.webp",
  "/images/services/ai-automation.webp",
] as const;

function useDesktop() {
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

export function Services() {
  const trackRef = useRef<HTMLElement>(null);
  const previousProgress = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reduced = useReducedMotion();
  const ready = useMotionReady();
  const desktop = useDesktop();
  const scrub = ready && desktop && !reduced;
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-2.5%", "2.5%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!scrub) return;

    const nextDirection = latest >= previousProgress.current ? 1 : -1;
    const nextIndex = Math.min(
      SERVICES.length - 1,
      Math.max(0, Math.floor(latest * SERVICES.length)),
    );

    if (nextIndex !== activeIndex) {
      setDirection(nextDirection);
      setActiveIndex(nextIndex);
    }
    previousProgress.current = latest;
  });

  const jumpToService = (index: number) => {
    const track = trackRef.current;
    if (!track || !scrub) {
      setActiveIndex(index);
      return;
    }

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = track.offsetHeight - window.innerHeight;
    const progress = (index + 0.18) / SERVICES.length;
    window.scrollTo({ top: trackTop + scrollableDistance * progress, behavior: "smooth" });
  };

  return (
    <section
      id="services"
      ref={trackRef}
      className="relative bg-bone text-onyx motion-safe:lg:h-[560vh]"
    >
      <div className="system-grid-onyx pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:sticky lg:top-[72px] lg:flex lg:h-[calc(100svh-72px)] lg:min-h-[600px] lg:flex-col lg:overflow-hidden lg:px-12 lg:py-[clamp(1.5rem,4svh,3.5rem)]">
        <header className="grid shrink-0 gap-5 border-b border-onyx/15 pb-6 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-[clamp(1rem,2.6svh,2rem)]">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
              <span className="h-1.5 w-1.5 bg-ember" />
              Capabilities / 01—06
            </p>
            <h2 className="mt-4 max-w-[12ch] text-balance text-[clamp(2.8rem,5.7vw,5.8rem)] font-black leading-[0.84] tracking-[-0.055em] lg:mt-[clamp(.5rem,1.5svh,1.25rem)]">
              The full stack, in motion.
            </h2>
          </div>
          <div className="lg:max-w-[29rem] lg:pb-1">
            <p className="text-[15px] leading-[1.55] text-ink-muted">
              Six disciplines working as one system—from first impression to the infrastructure underneath it.
            </p>
            <Link
              href="/services"
              className="group mt-4 inline-flex min-h-11 items-center gap-2 text-[13px] font-bold text-onyx focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              Explore every capability
              <ArrowUpRight className="h-4 w-4 text-ember transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
            </Link>
          </div>
        </header>

        <DesktopLightbox
          activeIndex={activeIndex}
          direction={direction}
          imageY={imageY}
          progress={scrollYProgress}
          animate={scrub}
          onSelect={jumpToService}
        />
        <MobileLightbox />
      </div>
    </section>
  );
}

function DesktopLightbox({
  activeIndex,
  direction,
  imageY,
  progress,
  animate,
  onSelect,
}: {
  activeIndex: number;
  direction: 1 | -1;
  imageY: MotionValue<string>;
  progress: MotionValue<number>;
  animate: boolean;
  onSelect: (index: number) => void;
}) {
  const service = SERVICES[activeIndex];

  return (
    <div className="hidden min-h-0 flex-1 grid-cols-[minmax(0,0.93fr)_minmax(31rem,1.07fr)] gap-[clamp(2rem,5vw,6rem)] pt-[clamp(1rem,3svh,2.5rem)] lg:grid">
      <div className="relative min-h-0 pl-[clamp(1.2rem,2vw,2rem)] pb-[clamp(1rem,2.5svh,2rem)]">
        <div className="absolute inset-y-0 left-0 w-px bg-onyx/15">
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 origin-top bg-ember"
            style={{ height: "100%", scaleY: animate ? progress : 1 }}
          />
        </div>
        <div className="relative h-full min-h-[340px] overflow-hidden bg-slate">
          <motion.div
            key={service.slug}
            initial={animate ? {
              opacity: 0.55,
              clipPath: direction > 0 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
            } : false}
            animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 0.72, ease: motionEase }}
            className="absolute -inset-y-[3%] inset-x-0"
            style={animate ? { y: imageY } : undefined}
          >
            <Image
              src={assetPath(SERVICE_ART[activeIndex])}
              alt={`Arup ${service.name} capability study`}
              fill
              priority={activeIndex === 0}
              sizes="(min-width: 1440px) 700px, 45vw"
              className="object-cover"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(10,10,10,.78)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
            <motion.p
              key={`${service.slug}-caption`}
              initial={animate ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: motionEase }}
              className="max-w-[28ch] text-[12px] font-bold uppercase leading-[1.45] tracking-[0.12em] text-bone/78"
            >
              Arup capability study / {service.name}
            </motion.p>
            <span className="text-[11px] font-bold text-ember">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-col justify-center py-1">
        <div className="absolute inset-y-0 left-0 w-px bg-onyx/12" />
        <div className="flex min-h-0 flex-col justify-center">
          {SERVICES.map((item, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => onSelect(index)}
                aria-current={active ? "step" : undefined}
                className="group relative grid min-h-0 grid-cols-[2.75rem_1fr_auto] items-center gap-3 border-b border-onyx/12 py-[clamp(.42rem,1svh,.85rem)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember"
              >
                <motion.span
                  className="absolute inset-y-0 left-0 w-[3px] origin-center bg-ember"
                  animate={{ scaleY: active ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: motionEase }}
                />
                <span className={active ? "text-[11px] font-bold text-onyx" : "text-[11px] font-bold text-ink-muted"}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <motion.span
                  animate={{ x: active && animate ? 8 : 0 }}
                  transition={{ duration: 0.5, ease: motionEase }}
                  className={`text-balance text-[clamp(1.55rem,3.15vw,4.7rem)] font-black leading-[0.88] tracking-[-0.05em] transition-colors duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    active ? "text-ember" : "text-onyx/50 group-hover:text-onyx/75"
                  }`}
                >
                  {item.name}
                </motion.span>
                <ArrowUpRight className={`h-4 w-4 transition-opacity duration-300 ${active ? "text-ember-deep opacity-100" : "text-onyx opacity-0 group-hover:opacity-50"}`} />
              </button>
            );
          })}
        </div>

        <motion.div
          key={`${service.slug}-copy`}
          initial={animate ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.12, ease: motionEase }}
          className="grid grid-cols-[2.75rem_1fr] gap-3 pt-[clamp(.65rem,1.5svh,1.25rem)]"
        >
          <span />
          <div className="flex items-center justify-between gap-5">
            <p className="max-w-[40ch] text-[13px] leading-[1.5] text-ink-muted">{service.short}</p>
            <Link
              href={`/services#${service.slug}`}
              className="shrink-0 text-[12px] font-bold text-onyx underline decoration-ember decoration-1 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              View service
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MobileLightbox() {
  return (
    <div className="mt-14 space-y-16 lg:hidden">
      {SERVICES.map((service, index) => (
        <MobileServiceCard key={service.slug} index={index} />
      ))}
    </div>
  );
}

function MobileServiceCard({ index }: { index: number }) {
  const service = SERVICES[index];
  const reveal = useScrollReveal({ delay: 0.04, distance: 28, blur: 6 });

  return (
    <motion.article {...reveal} className="border-t border-onyx/15 pt-4">
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em]">
        <span className="text-ember">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-ink-muted">Arup capability study</span>
      </div>
      <div className="relative mt-4 aspect-[4/5] overflow-hidden bg-slate">
        <Image
          src={assetPath(SERVICE_ART[index])}
          alt={`Arup ${service.name} capability study`}
          fill
          sizes="(min-width: 640px) 560px, calc(100vw - 40px)"
          className="object-cover"
        />
      </div>
      <h3 className="mt-6 text-balance text-[clamp(2.7rem,13vw,5rem)] font-black leading-[0.86] tracking-[-0.05em]">
        {service.name}
      </h3>
      <div className="mt-5 flex items-end justify-between gap-6 border-t border-onyx/12 pt-4">
        <p className="max-w-[27ch] text-[14px] leading-[1.55] text-ink-muted">{service.short}</p>
        <Link
          href={`/services#${service.slug}`}
          aria-label={`View ${service.name}`}
          className="grid h-11 w-11 shrink-0 place-items-center bg-ember text-onyx focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-onyx"
        >
          <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </motion.article>
  );
}
