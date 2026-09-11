"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------
   WordReveal — splits a heading into words that rise in one by one.
   Words stay in normal flow so wrapping and text-balance still work.
------------------------------------------------------------------- */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.055,
  highlight,
  highlightClassName = "",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Words matching this string get the highlight class (e.g. a gradient). */
  highlight?: string;
  highlightClassName?: string;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  // The element tree is identical whether or not motion is reduced — only the
  // variant values change. Returning a different tree here would not match the
  // server render (useReducedMotion is false on the server but reads the media
  // query synchronously on the client) and would blow up hydration.
  const variants = reduced
    ? { hidden: { y: "0%", opacity: 1 }, visible: { y: "0%", opacity: 1 } }
    : { hidden: { y: "100%", opacity: 0 }, visible: { y: "0%", opacity: 1 } };

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: reduced ? 0 : stagger, delayChildren: reduced ? 0 : delay }}
      aria-label={text}
    >
      {words.map((word, index) => {
        const isHighlight = highlight ? highlight.split(" ").includes(word.replace(/[.,]/g, "")) : false;
        return (
          <span
            key={`${word}-${index}`}
            /* padding/negative-margin pair keeps descenders (J, y, p) from
               being clipped by the reveal mask without shifting layout */
            className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
            aria-hidden="true"
          >
            <motion.span
              className={`inline-block ${isHighlight ? highlightClassName : ""}`}
              variants={variants}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </motion.span>
  );
}

/* ------------------------------------------------------------------
   CountUp — rolls a number from 0 to its target when scrolled into view.
------------------------------------------------------------------- */
export function CountUp({
  to,
  suffix = "",
  duration = 1.6,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  // Seeded with the final value so server-rendered HTML (and anyone without
  // JS) shows the real number rather than a meaningless "0+". The reset to 0
  // happens in a mount effect, which only ever runs on the client.
  const [display, setDisplay] = useState(to);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduced) return;
    setDisplay(0);
    setArmed(true);
  }, [reduced]);

  useEffect(() => {
    if (!armed || !inView || reduced) return;

    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (value) => setDisplay(Math.round(value)),
    });

    return () => controls.stop();
  }, [armed, inView, reduced, to, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------
   Typewriter — types a string out character by character, once visible.
------------------------------------------------------------------- */
export function Typewriter({
  text,
  speed = 45,
  startDelay = 400,
  className = "",
  onDone,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  onDone?: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();

  // Seeded full so the server HTML carries the real text; the mount effect
  // (client only) clears it just before typing begins.
  const [count, setCount] = useState(text.length);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduced) {
      onDone?.();
      return;
    }
    setCount(0);
    setArmed(true);
    // onDone is deliberately not a dependency; see the typing effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (!armed || !inView || reduced) return;

    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setCount(index);
        if (index >= text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
    // onDone is intentionally excluded: it is a fresh closure each render
    // and would restart the typing loop on every parent update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, inView, reduced, text, speed, startDelay]);

  return (
    <span ref={ref} className={className}>
      {text.slice(0, count)}
    </span>
  );
}

/* ------------------------------------------------------------------
   Magnetic — the element drifts toward the cursor while hovered.
   Pointer-type guard keeps it off touch devices.
------------------------------------------------------------------- */
export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  // Same element either way (see WordReveal) — reduced motion just leaves the
  // offsets pinned at 0 by never feeding the pointer position in.
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Tilt — subtle 3D rotation following the cursor across a card.
------------------------------------------------------------------- */
export function Tilt({
  children,
  max = 5,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 180, damping: 20 });
  const springY = useSpring(py, { stiffness: 180, damping: 20 });
  const rotateY = useTransform(springX, [0, 1], [-max, max]);
  const rotateX = useTransform(springY, [0, 1], [max, -max]);

  // Same element either way (see WordReveal) — reduced motion leaves the
  // pointer values at their 0.5 centre, which maps to 0deg on both axes.
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        px.set((event.clientX - rect.left) / rect.width);
        py.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Marquee — seamless horizontal loop (two copies, shifted -50%).
------------------------------------------------------------------- */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center gap-6 whitespace-nowrap px-6">
                <span className="font-mono text-sm text-slate-400 transition-colors duration-300 hover:text-sky-300">
                  {item}
                </span>
                <span className="h-1 w-1 rounded-full bg-sky-400/40" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
