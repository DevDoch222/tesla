"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { TeslaLogo } from "@/components/icons/TeslaLogo";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";

const phrase = "MAX ELECTRICITY — ZERO EMISSIONS — ";

export function CallToAction() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rowA = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const rowB = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-90, 90]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-32 md:py-44">
      <div className="space-y-2 text-[15vw] leading-[0.9] font-black tracking-tighter whitespace-nowrap select-none md:text-[11vw]">
        <motion.p style={{ x: rowA }}>{phrase.repeat(3)}</motion.p>
        <motion.p
          style={{ x: rowB }}
          className="text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]"
        >
          {phrase.repeat(3)}
        </motion.p>
      </div>

      <div className="mx-auto mt-20 flex max-w-xl flex-col items-center px-6 text-center">
        <motion.div style={{ rotate: logoRotate }}>
          <TeslaLogo className="size-14" />
        </motion.div>
        <Reveal>
          <h2 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
            Your next car is electric.
          </h2>
          <p className="mt-4 text-smoke">
            Pick a model, add it to your cart and check out in under a minute.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <Magnetic>
            <Link
              href="/#models"
              className="group flex items-center gap-3 rounded-full bg-ink py-4 pr-4 pl-10 text-sm font-medium tracking-wide text-white"
            >
              ORDER NOW
              <span className="grid size-9 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:-rotate-45">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
