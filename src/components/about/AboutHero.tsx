"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { MaskLines } from "@/components/ui/Reveal";

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-white">
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        initial={{ clipPath: "inset(15% 15% 15% 15% round 2rem)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0rem)" }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/images/showroom.jpg"
          alt="Tesla showroom"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-24"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs font-semibold tracking-[0.3em] text-white/60 uppercase"
        >
          About us
        </motion.p>
        <h1 className="mt-6 max-w-5xl text-5xl leading-[0.95] tracking-tight md:text-8xl">
          <MaskLines
            animateOnMount
            delay={1.1}
            lines={[
              <span key="1" className="font-extralight">Accelerating the</span>,
              <span key="2" className="font-extralight">world&apos;s transition to</span>,
              <span key="3" className="font-bold">sustainable energy.</span>,
            ]}
          />
        </h1>
      </motion.div>
    </section>
  );
}
