"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SERVICES, type Service } from "@/lib/services";
import { assetPath, whatsappHrefFor } from "@/lib/utils";
import { motionEase } from "./motion-primitives";

const VIDEO_PATHS: Record<string, string> = {
  websites: "/videos/services/websites.mp4",
  "digital-marketing": "/videos/services/digital-marketing.mp4",
  seo: "/videos/services/seo.mp4",
  software: "/videos/services/software-development.mp4",
  apps: "/videos/services/app-development.mp4",
  ai: "/videos/services/ai-automation.mp4",
};

const POSTER_PATHS: Record<string, string> = {
  websites: "/images/services/websites.webp",
  "digital-marketing": "/images/services/digital-marketing.webp",
  seo: "/images/services/seo.webp",
  software: "/images/services/software-development.webp",
  apps: "/images/services/app-development.webp",
  ai: "/images/services/ai-automation.webp",
};

function serviceNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

const totalServices = String(SERVICES.length).padStart(2, "0");

function useDesktopViewport() {
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

function ServiceVideo({ service, active, priority = false }: { service: Service; active: boolean; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active && !reduced) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active, reduced]);

  return (
    <>
      <img
        src={assetPath(POSTER_PATHS[service.slug])}
        alt=""
        loading={priority ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        autoPlay={active && !reduced}
        loop
        muted
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-label={`${service.name} capability film`}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={assetPath(VIDEO_PATHS[service.slug])} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.12),transparent_48%,rgba(10,10,10,.78))]" />
      <div className="absolute inset-0 ring-1 ring-inset ring-bone/16" />
    </>
  );
}

function CylinderCard({
  service,
  index,
  progress,
  active,
}: {
  service: Service;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const offset = (value: number) => index - value * (SERVICES.length - 1);
  const y = useTransform(progress, (value) => `${Math.sin((offset(value) * Math.PI) / 3.5) * 66}svh`);
  const z = useTransform(progress, (value) => (Math.cos((offset(value) * Math.PI) / 3.5) - 1) * 240);
  const rotateX = useTransform(progress, (value) => offset(value) * -48);
  const scale = useTransform(progress, (value) => 1 - Math.min(Math.abs(offset(value)), 2.2) * 0.115);
  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(offset(value));
    if (distance <= 0.62) return 1;
    if (distance <= 1.2) return 0.56;
    if (distance <= 1.85) return 0.16;
    return 0;
  });
  const zIndex = useTransform(progress, (value) => 30 - Math.round(Math.abs(offset(value)) * 6));

  return (
    <motion.article
      aria-hidden={!active}
      style={{ y, z, rotateX, scale, opacity, zIndex, transformStyle: "preserve-3d" }}
      className="absolute left-1/2 top-1/2 aspect-[3/4] h-[min(54svh,560px)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <div className="absolute inset-x-3 -bottom-3 top-3 rounded-[16px] border border-bone/10 bg-[#17171a] shadow-[0_24px_70px_rgba(0,0,0,.55)]" />
      <div className="absolute inset-x-1.5 -bottom-1.5 top-1.5 rounded-[16px] border border-bone/10 bg-[#222226]" />
      <div className="absolute inset-0 isolate overflow-hidden rounded-[16px] bg-graphite">
        <ServiceVideo service={service} active={active} priority={index === 0} />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-onyx/88 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 text-bone">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em]">{service.name}</span>
          <span className="text-[13px] font-black text-ember">{serviceNumber(index)}</span>
        </div>
        <div className="absolute bottom-0 left-0 p-6">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-bone/72">
            <span className="h-1.5 w-1.5 bg-ember" />
            Arup capability film
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function DesktopServiceContent({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      key={service.slug}
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
      transition={{ duration: 0.42, ease: motionEase }}
      className="flex h-full flex-col justify-center"
    >
      <p className="text-[clamp(1.5rem,2.2vw,2.25rem)] font-medium leading-[1.08] tracking-[-0.035em] text-bone">
        {service.short}
      </p>
      <div className="mt-7 h-px bg-bone/18" />
      <p className="mt-6 max-w-[48ch] text-[14px] leading-[1.65] text-bone/62">{service.long}</p>

      <div className="mt-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-bone/45">What&apos;s included</p>
        <ul className="mt-3 border-y border-bone/14">
          {service.included.map((item) => (
            <li key={item} className="flex gap-3 border-b border-bone/10 py-2.5 text-[12px] leading-[1.45] text-bone/72 last:border-b-0">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember" strokeWidth={2.4} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-start justify-between gap-5 text-[11px] text-bone/45">
        <span>Typical timing</span>
        <span className="max-w-[260px] text-right font-bold text-bone/82">{service.timing}</span>
      </div>

      <a
        href={whatsappHrefFor(service.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex min-h-12 w-full items-center justify-between rounded-[4px] bg-ember px-5 text-[13px] font-bold text-white transition-colors hover:bg-ember-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone"
      >
        <span>Start a {service.name.toLowerCase()} project</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.div>
  );
}

function MobileService({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-24% 0px -24% 0px", amount: 0.3 });

  return (
    <article id={`${service.slug}-mobile`} ref={ref} className="scroll-mt-20 border-t border-bone/14 py-14 first:border-t-0">
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em]">
        <span className="text-ember">{serviceNumber(index)} / {totalServices}</span>
        <span className="text-bone/42">{service.name}</span>
      </div>
      <h2 className="mt-5 max-w-[12ch] text-[clamp(2.8rem,13vw,4.6rem)] font-black leading-[0.9] tracking-[-0.045em] text-bone">
        {service.name}<span className="text-ember">.</span>
      </h2>

      <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-[16px] bg-graphite shadow-[0_24px_70px_rgba(0,0,0,.42)]">
        <ServiceVideo service={service} active={inView} priority={index === 0} />
        <span className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-bone/72">
          <span className="h-1.5 w-1.5 bg-ember" />
          Arup capability film
        </span>
      </div>

      <p className="mt-8 text-[1.35rem] font-medium leading-[1.12] tracking-[-0.025em] text-bone">{service.short}</p>
      <p className="mt-4 text-[15px] leading-[1.65] text-bone/62">{service.long}</p>
      <ul className="mt-7 border-y border-bone/14">
        {service.included.map((item) => (
          <li key={item} className="flex gap-3 border-b border-bone/10 py-3 text-[13px] leading-[1.5] text-bone/72 last:border-b-0">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[12px] font-bold text-bone/76">{service.timing}</p>
      <a
        href={whatsappHrefFor(service.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[4px] bg-ember px-5 text-[13px] font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone"
      >
        <MessageCircle className="h-4 w-4" />
        Discuss this service
      </a>
    </article>
  );
}

export function ServicesCylinder() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const desktop = useDesktopViewport();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 105, damping: 28, mass: 0.32 });
  const activeService = SERVICES[activeIndex];
  const progressScale = useTransform(progress, [0, 1], [0, 1]);

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.max(0, Math.min(SERVICES.length - 1, Math.round(value * (SERVICES.length - 1))));
    setActiveIndex((current) => (current === next ? current : next));
  });

  return (
    <>
      <section ref={sectionRef} className="relative hidden h-[600svh] bg-onyx text-bone lg:block">
        {SERVICES.map((service, index) => (
          <span key={service.slug} id={service.slug} className="absolute left-0 h-px w-px scroll-mt-0" style={{ top: `${index * 100}svh` }} />
        ))}

        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="absolute inset-0 system-grid opacity-[0.08]" />
          <div className="absolute inset-x-0 top-0 h-px bg-bone/12">
            <motion.div style={{ scaleX: progressScale, transformOrigin: "left" }} className="h-px bg-ember" />
          </div>

          <div className="relative mx-auto flex h-full max-w-[1440px] flex-col px-8 py-7 lg:px-10 xl:px-12">
            <div className="flex items-center justify-between border-b border-bone/12 pb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-bone/44">
              <span>Our services / Scroll to rotate</span>
              <span><b className="text-ember">{serviceNumber(activeIndex)}</b> / {totalServices}</span>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,.8fr)_minmax(330px,1.05fr)_minmax(0,.95fr)] gap-7 xl:gap-12">
              <div className="flex min-w-0 flex-col justify-center py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.slug}
                    initial={{ opacity: 0, x: -22, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: 16, filter: "blur(8px)" }}
                    transition={{ duration: 0.42, ease: motionEase }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-bone/52">
                      <span className="text-ember">{serviceNumber(activeIndex)}</span> / {activeService.name}
                    </p>
                    <h2 className="mt-7 text-[clamp(3.25rem,5.2vw,5.8rem)] font-black leading-[0.86] tracking-[-0.05em] text-bone">
                      {activeService.name}<span className="text-ember">.</span>
                    </h2>
                  </motion.div>
                </AnimatePresence>

                <nav aria-label="Service progress" className="mt-10 flex items-center gap-2">
                  {SERVICES.map((service, index) => (
                    <Link
                      key={service.slug}
                      href={`#${service.slug}`}
                      aria-label={`View ${service.name}`}
                      aria-current={index === activeIndex ? "step" : undefined}
                      className="group flex h-8 items-center"
                    >
                      <span className={`block h-px transition-[width,background-color] duration-300 ${index === activeIndex ? "w-8 bg-ember" : "w-3 bg-bone/28 group-hover:bg-bone/60"}`} />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="relative min-w-0 [perspective:1100px]">
                <div className="absolute inset-0 [transform-style:preserve-3d]">
                  {SERVICES.map((service, index) => (
                    <CylinderCard key={service.slug} service={service} index={index} progress={progress} active={desktop && index === activeIndex} />
                  ))}
                </div>
              </div>

              <div className="min-w-0 py-8" aria-live="polite">
                <AnimatePresence mode="wait">
                  <DesktopServiceContent service={activeService} index={activeIndex} />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-onyx px-5 text-bone sm:px-8 lg:hidden">
        <div className="mx-auto max-w-[560px]">
          {SERVICES.map((service, index) => <MobileService key={service.slug} service={service} index={index} />)}
        </div>
      </section>
    </>
  );
}
