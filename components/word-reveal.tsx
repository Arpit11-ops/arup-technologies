"use client";

import { useEffect } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import { motionEase, useMotionReady } from "./motion-primitives";

type Segment = {
  text: string;
  accent?: boolean;
};

type Line = Segment[];

export function WordReveal({
  lines,
  className,
  accentClassName = "",
  underlineAccent,
  startDelay = 0,
  stagger = 0.055,
}: {
  lines: Line[];
  className?: string;
  accentClassName?: string;
  underlineAccent?: string;
  startDelay?: number;
  stagger?: number;
}) {
  let wordIndex = 0;

  return (
    <h1 className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.map((segment, segmentIndex) =>
            segment.text.split(" ").map((word, index, words) => {
              const currentIndex = wordIndex;
              const key = `${lineIndex}-${segmentIndex}-${index}-${word}`;
              const isUnderlined = underlineAccent === word;
              wordIndex += 1;

              return (
                <span key={key} className="inline-block overflow-visible">
                  <AnimatedWord
                    word={word}
                    index={currentIndex}
                    accent={segment.accent}
                    accentClassName={accentClassName}
                    underlined={isUnderlined}
                    startDelay={startDelay}
                    stagger={stagger}
                  />
                  {index === words.length - 1 ? null : " "}
                </span>
              );
            }),
          )}
        </span>
      ))}
    </h1>
  );
}

function AnimatedWord({
  word,
  index,
  accent,
  accentClassName,
  underlined,
  startDelay,
  stagger,
}: {
  word: string;
  index: number;
  accent?: boolean;
  accentClassName: string;
  underlined: boolean;
  startDelay: number;
  stagger: number;
}) {
  const controls = useAnimationControls();
  const lineControls = useAnimationControls();
  const reduced = useReducedMotion();
  const ready = useMotionReady();
  const shouldAnimate = ready && !reduced;
  const delay = startDelay + index * stagger;

  useEffect(() => {
    if (!shouldAnimate) return;

    controls.set({ opacity: 0, y: 48, filter: "blur(10px)" });
    controls.start({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.72, ease: motionEase, delay },
    });

    if (underlined) {
      lineControls.set({ pathLength: 0, opacity: 0 });
      lineControls.start({
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.8, ease: motionEase, delay: delay + 0.34 },
      });
    }
  }, [controls, delay, lineControls, shouldAnimate, underlined]);

  return (
    <motion.span
      animate={controls}
      className={[
        "relative mr-[0.22em] inline-block",
        accent ? accentClassName : "",
      ].join(" ")}
    >
      {word}
      {underlined && (
        <svg
          aria-hidden
          viewBox="0 0 400 20"
          className="absolute -bottom-1 left-0 h-[0.35em] w-full text-ember"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M4 12 Q 120 2, 240 10 T 396 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            animate={lineControls}
          />
        </svg>
      )}
    </motion.span>
  );
}
