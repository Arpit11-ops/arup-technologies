"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, MessageCircle, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { WHATSAPP_HREF, assetPath, cn } from "@/lib/utils";
import { motionEase, useMotionReady } from "./motion-primitives";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-onyx/10 bg-bone/95 backdrop-blur-xl">
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: -14 } : false}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.65, ease: motionEase }}
        className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Link
          href="/"
          aria-label="Arup Technologies home"
          className="relative h-10 w-[132px] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-4 focus-visible:ring-offset-bone"
        >
          <Image
            src={assetPath("/brand/logo.png")}
            alt=""
            fill
            priority
            sizes="132px"
            className="object-cover object-center"
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
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
            className="group hidden h-11 items-center gap-2 rounded-[4px] bg-onyx px-5 text-[13px] font-bold text-bone transition-colors hover:bg-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-bone sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
            Talk on WhatsApp
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
            className="absolute inset-x-0 top-[72px] border-b border-bone/10 bg-onyx px-5 py-7 text-bone lg:hidden"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: motionEase, delay: index * 0.05 }}
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
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-ember px-5 text-[14px] font-bold text-white"
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
