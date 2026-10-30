"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { CarFront, Compass, Gauge, Play, RotateCw } from "lucide-react";
import { TeslaLogo } from "@/components/icons/TeslaLogo";
import { MaskLines } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Counter } from "@/components/ui/Counter";
import { VideoModal } from "@/components/ui/VideoModal";

const EASE = [0.16, 1, 0.3, 1] as const;
// Everything waits for the page-transition curtain to lift
const INTRO = 0.55;

const specs = [
  { icon: CarFront, value: 4000, unit: " lbs", label: "Weight" },
  { icon: Gauge, value: 200, unit: " mph", label: "Top Speed" },
  { icon: Compass, value: 412, unit: " mi", label: "Range" },
  { icon: RotateCw, value: 2.12, unit: "s", decimals: 2, label: "0 - 60 mph" },
];

function SpecPanel({ onPlay, className }: { onPlay: () => void; className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className ?? ""}`}>
      {specs.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: INTRO + 1 + i * 0.1, ease: EASE }}
          whileHover={{ y: -6 }}
          className="glass flex flex-col items-center rounded-xl px-2 py-4 text-center shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]"
        >
          <span className="grid size-9 place-items-center rounded-full bg-white shadow-md">
            <s.icon className="size-4" strokeWidth={2.2} />
          </span>
          <p className="mt-3 text-[15px] font-bold whitespace-nowrap">
            <Counter value={s.value} decimals={s.decimals} delay={INTRO + 1.1 + i * 0.1} />
            {s.unit}
          </p>
          <p className="mt-0.5 text-[10px] text-ink/50">{s.label}</p>
        </motion.div>
      ))}

      <motion.button
        onClick={onPlay}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: INTRO + 1.45, ease: EASE }}
        whileHover="hover"
        aria-label="Play the film"
        className="group relative col-span-2 aspect-[16/10] overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)]"
      >
        <motion.div
          className="absolute inset-0"
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Image
            src="/images/showroom.jpg"
            alt="Tesla Roadster in a showroom"
            fill
            sizes="300px"
            className="object-cover grayscale"
          />
        </motion.div>
        <span className="absolute inset-0 grid place-items-center">
          <span className="relative grid size-11 place-items-center rounded-full bg-white/50 backdrop-blur-md">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
            <Play className="relative size-4 translate-x-px fill-white text-white" />
          </span>
        </span>
      </motion.button>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [videoOpen, setVideoOpen] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // The car "drives" up out of frame, grows slightly and its shadow stretches
  const carY = useTransform(progress, [0, 1], ["0%", "-45%"]);
  const carScale = useTransform(progress, [0, 1], [1, 1.18]);
  const carRotate = useTransform(progress, [0, 1], [0, -6]);
  const shadowScale = useTransform(progress, [0, 1], [1, 1.5]);
  const shadowOpacity = useTransform(progress, [0, 0.8], [1, 0]);
  const textY = useTransform(progress, [0, 1], [0, -160]);
  const fade = useTransform(progress, [0, 0.55], [1, 0]);
  const panelY = useTransform(progress, [0, 1], [0, -260]);
  const bgY = useTransform(progress, [0, 1], ["0%", "20%"]);

  return (
    <>
      <section
        ref={ref}
        className="relative h-[100svh] min-h-[680px] overflow-hidden"
        aria-label="Max Electricity"
      >
        {/* Studio backdrop: light on the left falling to grey on the right */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 -top-[10%] bg-[linear-gradient(120deg,#f4f4f5_0%,#e2e2e4_38%,#c4c4c7_70%,#a9a9ad_100%)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_30%,rgba(255,255,255,0.8),transparent)]" />

        {/* Car + its long diagonal shadow */}
        <motion.div
          style={{ y: carY, scale: carScale, rotate: carRotate }}
          className="absolute top-[24%] left-1/2 h-[96%] -translate-x-1/2 md:top-[23%] lg:left-[50%]"
        >
          <motion.div
            initial={{ y: "70%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.8, delay: INTRO, ease: EASE }}
            className="relative h-full"
            style={{ aspectRatio: "829 / 1715" }}
          >
            <motion.div
              aria-hidden
              style={{ scaleX: shadowScale, opacity: shadowOpacity }}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.4, delay: INTRO + 1.2, ease: EASE }}
              className="absolute top-[6%] left-[60%] h-[110%] w-[230%] origin-left"
            >
              <div className="size-full bg-[linear-gradient(100deg,rgba(40,40,44,0.55),rgba(60,60,64,0.18)_70%,transparent)] blur-[2px] [clip-path:polygon(0_0,100%_38%,100%_100%,0_100%)]" />
            </motion.div>
            <Image
              src="/images/hero-car.png"
              alt="White Tesla seen from above"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 70vw"
              className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
            />
          </motion.div>
        </motion.div>

        {/* Mobile legibility wash behind the copy */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#e9e9eb] via-[#e9e9eb]/85 to-transparent lg:hidden" />

        {/* Copy */}
        <motion.div
          style={{ y: textY, opacity: fade }}
          className="absolute inset-x-0 bottom-[8%] z-10 px-6 md:px-12 lg:right-auto lg:bottom-[13%] lg:left-[6%] lg:max-w-md lg:px-0"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: INTRO + 0.5, ease: EASE }}
            className="inline-block rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-white"
          >
            Electric Vehicle
          </motion.span>

          <h1 className="mt-5 leading-[0.95]">
            <MaskLines
              animateOnMount
              delay={INTRO + 0.6}
              lines={[
                <span key="max" className="text-5xl font-extralight tracking-tight md:text-6xl">
                  MAX
                </span>,
                <span key="el" className="text-5xl font-bold tracking-tight md:text-6xl">
                  ELECTRICITY
                </span>,
              ]}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: INTRO + 0.95, ease: EASE }}
            className="mt-5 max-w-sm text-sm leading-snug text-ink/80"
          >
            Iconic styling, modern personality, futuristic work of engines and
            personalized customization
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: INTRO + 1.1, ease: EASE }}
            className="mt-8 flex items-center gap-4"
          >
            <Magnetic>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => lenis?.scrollTo("#models", { offset: 0, duration: 1.6 })}
                className="group relative overflow-hidden rounded-full bg-ink px-11 py-4 text-sm font-medium tracking-wide text-white"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-graphite transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative">ORDER NOW</span>
              </motion.button>
            </Magnetic>
            <Magnetic strength={0.5}>
              <Link
                href="/about"
                aria-label="About Tesla"
                className="grid size-12 place-items-center rounded-full bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-transform duration-700 hover:rotate-[360deg]"
              >
                <TeslaLogo className="size-5" />
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Spec cards + film thumbnail (desktop) */}
        <motion.div
          style={{ y: panelY, opacity: fade }}
          className="absolute top-[40%] right-[5%] z-10 hidden w-[250px] lg:block xl:right-[6%]"
        >
          <SpecPanel onPlay={() => setVideoOpen(true)} />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: fade }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: INTRO + 2 }}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-white/90 lg:flex"
        >
          SCROLL
          <span className="relative h-10 w-px overflow-hidden bg-white/30">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-white"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </section>

      {/* Spec cards (mobile / tablet) */}
      <div className="bg-[#e9e9eb] px-6 pt-2 pb-12 md:px-12 lg:hidden">
        <SpecPanel
          onPlay={() => setVideoOpen(true)}
          className="mx-auto max-w-md sm:max-w-xl sm:grid-cols-4 sm:[&>button]:col-span-4"
        />
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
