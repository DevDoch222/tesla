"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

type CounterProps = {
  value: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

/** Counts from 0 to `value` once it enters the viewport. */
export function Counter({ value, decimals = 0, duration = 2, delay = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {(0).toFixed(decimals)}
    </span>
  );
}
