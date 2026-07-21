"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { SERVICES } from "@/lib/services";
import { WHATSAPP_HREF, assetPath, cn } from "@/lib/utils";
import { motionEase, useMotionReady } from "./motion-primitives";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const pageLinks = NAV_LINKS.filter((link) => link.href !== "/services");
  const servicesActive = pathname === "/services";

  return (
    <header className="sticky top-0 z-40 border-b border-onyx/10 bg-bone/96 backdrop-blur-xl">
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: -14 } : false}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.65, ease: motionEase }}
        className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Link
          href="/"
          aria-label="Arup Technologies home"
          className="flex h-12 w-[148px] items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-4 focus-visible:ring-offset-bone sm:w-[166px]"
        >
          <Image
            src={assetPath("/brand/logo-transparent.png")}
            alt=""
            width={166}
            height={55}
            priority
            sizes="(min-width: 640px) 166px, 148px"
            className="h-auto w-full object-contain"
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          <div className="group relative">
            <Link
              href="/services"
              aria-current={servicesActive ? "page" : undefined}
              className={cn(
                "flex h-11 items-center gap-1.5 text-[13px] font-bold text-onyx/62 transition-colors hover:text-onyx focus-visible:outline-none focus-visible:text-onyx",
                servicesActive && "text-onyx",
              )}
            >
              Services
              <ChevronDown
                className="h-3.5 w-3.5 text-onyx/42 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                strokeWidth={2.4}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-1 h-0.5 origin-left bg-ember transition-transform duration-300",
                  servicesActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100",
                )}
              />
            </Link>

            <div className="invisible absolute left-0 top-full w-[286px] translate-y-2 border border-onyx/10 bg-bone p-2 opacity-0 shadow-[0_18px_50px_rgba(10,10,10,.14)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="border-b border-onyx/10 px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                Full-stack services
              </div>
              <div className="py-1">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services#${service.slug}`}
                    className="group/item flex items-start justify-between gap-4 px-3 py-2.5 text-onyx transition-colors hover:bg-onyx hover:text-bone focus-visible:bg-onyx focus-visible:text-bone focus-visible:outline-none"
                  >
                    <span>
                      <span className="block text-[13px] font-bold leading-tight">{service.name}</span>
                      <span className="mt-1 block text-[11px] leading-snug text-ink-muted transition-colors group-hover/item:text-bone/62 group-focus-visible/item:text-bone/62">
                        {service.short}
                      </span>
                    </span>
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember transition-transform group-hover/item:translate-x-0.5 group-focus-visible/item:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {pageLinks.map((link) => {
            const active = link.href !== "/#process" && pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex h-11 items-center text-[13px] font-bold text-onyx/60 transition-colors hover:text-onyx focus-visible:outline-none focus-visible:text-onyx",
                  active && "text-onyx",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-1 h-0.5 origin-left bg-ember transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden h-11 items-center gap-3 rounded-full bg-ember py-1.5 pl-5 pr-1.5 text-[13px] font-bold text-white transition-colors hover:bg-ember-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-bone sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
            Talk on WhatsApp
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-onyx transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </span>
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center border border-onyx/15 text-onyx transition-colors hover:bg-onyx hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.5, ease: motionEase }}
            className="absolute inset-x-0 top-[76px] border-b border-bone/10 bg-onyx px-5 py-7 text-bone lg:hidden"
          >
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: motionEase }}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services"
                  onClick={() => setServicesOpen((value) => !value)}
                  className="flex min-h-14 w-full items-center justify-between border-b border-bone/15 text-left text-[clamp(1.55rem,7vw,2.25rem)] font-black tracking-[-0.03em] text-bone"
                >
                  Services
                  <ChevronDown className={cn("h-6 w-6 text-ember transition-transform duration-300", servicesOpen && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {servicesOpen && (
                    <motion.div
                      id="mobile-services"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: motionEase }}
                      className="overflow-hidden border-b border-bone/15"
                    >
                      <div className="py-3">
                        <Link
                          href="/services"
                          className="flex min-h-11 items-center justify-between text-[14px] font-bold text-bone"
                        >
                          View all services
                          <ArrowRight className="h-4 w-4 text-ember" />
                        </Link>
                        {SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services#${service.slug}`}
                            className="flex min-h-11 items-center justify-between gap-4 py-1.5 text-[13px] font-bold text-bone/72"
                          >
                            {service.name}
                            <span className="h-px w-4 bg-ember" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {pageLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: motionEase, delay: (index + 1) * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="flex min-h-14 items-center justify-between border-b border-bone/15 text-[clamp(1.55rem,7vw,2.25rem)] font-black tracking-[-0.03em]"
                  >
                    {link.label}
                    <span className="text-ember">+</span>
                  </Link>
                </motion.div>
              ))}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ember px-5 text-[14px] font-bold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Talk on WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
