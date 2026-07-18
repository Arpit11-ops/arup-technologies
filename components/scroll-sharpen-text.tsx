"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useMotionReady } from "./motion-primitives";

export function ScrollSharpenText({ text, className }: { text: string; className?: string }) {
  const targetRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;
  const words = text.trim().split(/\s+/);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.82", "start 0.28"],
  });

  return (
    <p ref={targetRef} className={className}>
      {words.map((word, index) => {
        const wordStart = words.length === 1 ? 0 : (index / (words.length - 1)) * 0.78;
        const wordEnd = Math.min(wordStart + 0.22, 1);

        return (
          <SharpenWord
            key={`${word}-${index}`}
            progress={scrollYProgress}
            start={wordStart}
            end={wordEnd}
            animate={shouldAnimate}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </SharpenWord>
        );
      })}
    </p>
  );
}

function SharpenWord({
  children,
  progress,
  start,
  end,
  animate,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  start: number;
  end: number;
  animate: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.58, 1]);

  return (
    <motion.span style={animate ? { opacity } : undefined}>
      {children}
    </motion.span>
  );
}
