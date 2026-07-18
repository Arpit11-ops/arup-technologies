"use client";

import {
  animate,
  motion,
  useAnimationControls,
  useInView,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "motion/react";
import type { ComponentProps, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
type InViewMargin = NonNullable<Parameters<typeof useInView>[1]>["margin"];

export const revealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease },
  },
};

export const sweepItem: Variants = {
  hidden: { opacity: 0, x: -28, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.78, ease },
  },
};

export function useMotionReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready;
}

export function useScrollReveal({
  delay = 0,
  distance = 32,
  x = 0,
  blur = 8,
  margin = "-10% 0px -10% 0px",
}: {
  delay?: number;
  distance?: number;
  x?: number;
  blur?: number;
  margin?: InViewMargin;
} = {}) {
  const ref = useRef(null);
  const controls = useAnimationControls();
  const reduced = useReducedMotion();
  const ready = useMotionReady();
  const inView = useInView(ref, { once: true, margin });
  const shouldAnimate = ready && !reduced;

  useEffect(() => {
    if (!shouldAnimate) return;

    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.68, ease, delay },
      });
      return;
    }

    controls.set({
      opacity: 0,
      x,
      y: distance,
      filter: `blur(${blur}px)`,
    });
  }, [blur, controls, delay, distance, inView, shouldAnimate, x]);

  return {
    ref,
    animate: shouldAnimate ? controls : undefined,
    initial: false as const,
  };
}

type RevealProps = ComponentProps<typeof motion.div> & {
  children: ReactNode;
  delay?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;

  if (!shouldAnimate) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      variants={{
        hidden: revealItem.hidden,
        visible: {
          ...revealItem.visible,
          transition: { duration: 0.72, ease, delay },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type MotionAnchorProps = ComponentProps<typeof motion.a>;

export function MotionAnchor({ className, ...props }: MotionAnchorProps) {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;

  return (
    <motion.a
      {...props}
      whileHover={shouldAnimate ? { y: -2, scale: 1.015 } : undefined}
      whileTap={shouldAnimate ? { scale: 0.975 } : undefined}
      transition={{ duration: 0.18, ease }}
      tabIndex={0}
      className={cn("will-change-transform", className)}
    />
  );
}

function useFinePointer() {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return finePointer;
}

export function MagneticAnchor(props: MotionAnchorProps) {
  const reduced = useReducedMotion();
  const ready = useMotionReady();
  const finePointer = useFinePointer();
  const shouldAnimate = ready && !reduced && finePointer;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handlePointerMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (!shouldAnimate) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pullX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const pullY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;

    x.stop();
    y.stop();
    x.set(Math.max(-4, Math.min(4, pullX)));
    y.set(Math.max(-4, Math.min(4, pullY)));
  };

  const handlePointerLeave = () => {
    if (!shouldAnimate) return;

    animate(x, 0, { duration: 0.22, ease });
    animate(y, 0, { duration: 0.22, ease });
  };

  return (
    <motion.span
      style={shouldAnimate ? { x, y } : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="inline-flex w-fit will-change-transform"
    >
      <MotionAnchor {...props} />
    </motion.span>
  );
}

export const motionEase = ease;
