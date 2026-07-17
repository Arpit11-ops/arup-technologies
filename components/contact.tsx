"use client";

import { type FormEvent, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { CONTACT_EMAIL, WHATSAPP_HREF, cn } from "@/lib/utils";
import { motionEase, useMotionReady, useScrollReveal } from "./motion-primitives";
import { RouteSignal } from "./route-signal";

export function Contact({ standalone = false }: { standalone?: boolean }) {
  const [state, setState] = useState<{ ok: boolean; message: string } | null>(null);
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;
  const titleReveal = useScrollReveal({ distance: 32, blur: 8 });
  const detailsReveal = useScrollReveal({ delay: 0.08, distance: 26 });
  const formReveal = useScrollReveal({ delay: 0.1, distance: 36, blur: 8 });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const service = String(formData.get("service") ?? "Not specified").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setState({ ok: false, message: "Please fill your name, email, and message." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ ok: false, message: "That email address does not look right. Please check it." });
      return;
    }

    const subject = encodeURIComponent(`Project brief from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`);
    setState({ ok: true, message: "Your draft is ready. Send it from your email app to reach us." });
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-bone py-24 lg:py-32">
      <RouteSignal className="route-glow absolute -right-20 top-20 hidden h-28 w-[42vw] text-ember lg:block" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {standalone ? (
          <motion.h1 {...titleReveal} className="max-w-[13ch] text-balance text-[clamp(3.2rem,7.4vw,6rem)] font-black leading-[0.89] tracking-[-0.04em] text-onyx">
            Tell us what needs to move.
          </motion.h1>
        ) : (
          <motion.h2 {...titleReveal} className="max-w-[13ch] text-balance text-[clamp(3.2rem,7.4vw,6rem)] font-black leading-[0.89] tracking-[-0.04em] text-onyx">
            Tell us what needs to move.
          </motion.h2>
        )}

        <div className="mt-16 grid gap-14 border-t border-onyx/15 pt-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <motion.div {...detailsReveal} className="flex flex-col justify-between gap-12">
            <div>
              <p className="max-w-[43ch] text-[17px] leading-[1.62] text-onyx/66">
                Bring the messy version. A rough idea, an underperforming campaign, a spreadsheet that became a product, or a stack that stopped talking to itself.
              </p>
              <p className="mt-5 max-w-[43ch] text-[15px] font-bold leading-[1.55] text-onyx">
                The first conversation is free. No pitch deck and no account-manager handoff.
              </p>
            </div>

            <div className="border-y border-onyx/15">
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="group flex min-h-20 items-center justify-between border-b border-onyx/15 py-4 text-onyx transition-colors hover:text-ember">
                <span className="flex items-center gap-3 text-[15px] font-bold"><MessageCircle className="h-5 w-5" />WhatsApp</span>
                <span className="flex items-center gap-3 text-[13px] text-onyx/55 group-hover:text-ember">Usually under an hour <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="group flex min-h-20 items-center justify-between py-4 text-onyx transition-colors hover:text-ember">
                <span className="flex items-center gap-3 text-[15px] font-bold"><Mail className="h-5 w-5" />Email</span>
                <span className="flex items-center gap-3 text-[13px] text-onyx/55 group-hover:text-ember">{CONTACT_EMAIL} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </a>
            </div>
          </motion.div>

          <motion.form {...formReveal} onSubmit={handleSubmit} noValidate className="grid gap-x-7 gap-y-8 border-l-0 border-onyx/15 lg:border-l lg:pl-12">
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Your name" name="name" required autoComplete="name" />
              <Field label="Work email" name="email" type="email" required autoComplete="email" />
            </div>

            <label className="grid gap-2">
              <span className="text-[12px] font-bold text-onyx/60">What do you need?</span>
              <select name="service" defaultValue="" className="h-13 rounded-none border-0 border-b border-onyx/25 bg-transparent px-0 text-[16px] font-bold text-onyx outline-none transition-colors focus:border-ember focus:ring-0">
                <option value="" disabled>Choose a service</option>
                {SERVICES.map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}
                <option value="not-sure">Not sure yet</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-[12px] font-bold text-onyx/60">What is stuck?</span>
              <textarea name="message" required rows={5} placeholder="A few honest lines are enough." className="resize-y rounded-none border-0 border-b border-onyx/25 bg-transparent px-0 py-3 text-[16px] font-medium leading-[1.55] text-onyx outline-none transition-colors placeholder:text-onyx/45 focus:border-ember focus:ring-0" />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-[4px] bg-onyx px-7 text-[14px] font-bold text-bone transition-colors hover:bg-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-bone">
                Open email draft
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-[12px] text-onyx/50">We reply personally. No mailing list.</span>
            </div>

            {state && (
              <motion.p role="status" aria-live="polite" initial={shouldAnimate ? { opacity: 0, y: 8 } : false} animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.3, ease: motionEase }} className={cn("text-[14px] font-bold", state.ok ? "text-ember-deep" : "text-red-700")}>{state.message}</motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, autoComplete }: { label: string; name: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-[12px] font-bold text-onyx/60">{label}{required && <span className="text-ember"> *</span>}</span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} className="h-13 rounded-none border-0 border-b border-onyx/25 bg-transparent px-0 text-[16px] font-bold text-onyx outline-none transition-colors focus:border-ember focus:ring-0" />
    </label>
  );
}
