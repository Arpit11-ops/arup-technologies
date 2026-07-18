"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { motionEase, useMotionReady } from "./motion-primitives";

const MAIN_PATH =
  "M8 300 H210 Q234 300 234 276 V156 Q234 132 258 132 H470 Q494 132 494 156 V236 Q494 260 518 260 H792";
const UPPER_PATH =
  "M240 8 V60 Q240 84 264 84 H560 Q584 84 584 108 V176";
const LOWER_PATH =
  "M120 470 H380 Q404 470 404 446 V380 Q404 356 428 356 H700 Q724 356 724 380 V456 Q724 480 748 480 H792";

type NetworkPath = {
  d: string;
  className: string;
  delay: number;
  pulse?: { duration: number; start: number; r: number; className: string };
};

const PATHS: NetworkPath[] = [
  {
    d: MAIN_PATH,
    className: "route-glow text-ember",
    delay: 0.28,
    pulse: { duration: 7, start: 1.7, r: 4, className: "route-glow fill-ember" },
  },
  {
    d: UPPER_PATH,
    className: "text-bone/25",
    delay: 0.55,
    pulse: { duration: 10, start: 3.2, r: 3, className: "fill-bone/50" },
  },
  {
    d: LOWER_PATH,
    className: "text-bone/25",
    delay: 0.8,
    pulse: { duration: 12, start: 5, r: 3, className: "fill-bone/50" },
  },
];

const NODES: { cx: number; cy: number; r: number; accent?: boolean; delay: number }[] = [
  { cx: 8, cy: 300, r: 4, accent: true, delay: 0.2 },
  { cx: 792, cy: 260, r: 5, accent: true, delay: 1.5 },
  { cx: 584, cy: 176, r: 4, delay: 1.2 },
  { cx: 120, cy: 470, r: 3.5, delay: 1.0 },
];

/**
 * The hero's living route network: the site-wide route-line motif expanded
 * into a small system of paths with signal pulses traveling along them.
 * Static (fully drawn, no pulses) under reduced motion and before hydration.
 */
export function RouteNetwork({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const shouldAnimate = useMotionReady() && !reduced;
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (!shouldAnimate) return;

    const tracks = PATHS.map((path, index) => {
      const el = pathRefs.current[index];
      const dot = pulseRefs.current[index];
      if (!path.pulse || !el || !dot) return null;
      return { ...path.pulse, el, dot, length: el.getTotalLength() };
    }).filter((track) => track !== null);

    let frame = 0;
    const origin = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - origin) / 1000;
      for (const track of tracks) {
        if (elapsed < track.start) {
          track.dot.setAttribute("opacity", "0");
          continue;
        }
        const progress = ((elapsed - track.start) % track.duration) / track.duration;
        const point = track.el.getPointAtLength(progress * track.length);
        track.dot.setAttribute("cx", String(point.x));
        track.dot.setAttribute("cy", String(point.y));
        track.dot.setAttribute("opacity", "1");
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldAnimate]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 hidden overflow-hidden lg:block", className)}
    >
      <motion.div
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={shouldAnimate ? { opacity: 1 } : undefined}
        transition={{ duration: 1.4, ease: motionEase, delay: 0.2 }}
        className="system-grid absolute inset-y-0 right-0 w-[58%] [mask-image:linear-gradient(to_left,rgba(0,0,0,0.85),transparent_78%)]"
      />

      <svg
        viewBox="0 0 800 560"
        preserveAspectRatio="none"
        className="absolute right-0 top-[9%] h-[68%] w-[56%] overflow-visible"
      >
        {PATHS.map((path, index) => (
          <g key={path.d} className={path.className}>
            <motion.path
              ref={(el) => {
                pathRefs.current[index] = el;
              }}
              d={path.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
              animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: 1.35, ease: motionEase, delay: path.delay }}
            />
            {shouldAnimate && path.pulse && (
              <circle
                ref={(el) => {
                  pulseRefs.current[index] = el;
                }}
                r={path.pulse.r}
                opacity="0"
                className={path.pulse.className}
              />
            )}
          </g>
        ))}

        {NODES.map((node) => (
          <motion.circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            className={node.accent ? "route-glow fill-ember" : "fill-bone/40"}
            initial={shouldAnimate ? { scale: 0 } : false}
            animate={shouldAnimate ? { scale: 1 } : undefined}
            transition={{ duration: 0.45, ease: motionEase, delay: node.delay }}
          />
        ))}
      </svg>
    </div>
  );
}
