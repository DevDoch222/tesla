"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

export function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(scrollYProgress, [0, 0.4], ["inset(30% 20% 30% 20% round 2rem)", "inset(0% 0% 0% 0% round 2rem)"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <section className="bg-cloud px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.3em] text-smoke uppercase">Our mission</p>
            <h2 className="mt-6 text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
              We build cars that people love — and that leave the planet better than we found it.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-lg leading-relaxed text-smoke">
              From the first Roadster to the vehicles on the road today, every product exists
              to prove that electric can be faster, safer and more fun than anything that
              burns fuel. Our cars, batteries and solar products work together as one
              sustainable energy ecosystem.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-mist pt-10">
            <Reveal delay={0.2}>
              <p className="text-4xl font-bold md:text-5xl">
                <Counter value={20} />+
              </p>
              <p className="mt-2 text-sm text-smoke">Years of electric innovation</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-4xl font-bold md:text-5xl">
                <Counter value={7} />M+
              </p>
              <p className="mt-2 text-sm text-smoke">Vehicles delivered worldwide</p>
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="relative aspect-[4/5] w-full">
          <motion.div style={{ clipPath: clip }} className="absolute inset-0 overflow-hidden">
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              <Image src="/images/interior.jpg" alt="Minimal Tesla interior" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
