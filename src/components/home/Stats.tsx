"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const statement =
  "Every Tesla is engineered to be the safest, quickest and most efficient car on the road — and it only gets better over time with over-the-air updates.";

const stats = [
  { value: 412, suffix: " mi", label: "Max EPA range on a single charge" },
  { value: 200, suffix: " mph", label: "Top speed, electronically limited" },
  { value: 2.12, decimals: 2, suffix: "s", label: "Zero to sixty, launch mode" },
  { value: 70000, suffix: "+", label: "Superchargers across the globe" },
];

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export function Stats() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = statement.split(" ");

  return (
    <section className="bg-white px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-smoke uppercase">Performance</p>
        <p
          ref={textRef}
          className="mt-8 text-3xl leading-tight font-semibold tracking-tight md:text-5xl md:leading-[1.15]"
        >
          {words.map((w, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {w}
            </Word>
          ))}
        </p>

        <div className="mt-24 grid grid-cols-2 gap-x-6 gap-y-14 border-t border-mist pt-14 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <p className="text-4xl font-bold tracking-tight md:text-6xl">
                <Counter value={s.value} decimals={s.decimals} />
                <span className="text-2xl font-light text-smoke md:text-3xl">{s.suffix}</span>
              </p>
              <p className="mt-3 max-w-[14rem] text-sm text-smoke">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
