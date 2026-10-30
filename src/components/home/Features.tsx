"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import { BatteryCharging, Cpu, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Autopilot",
    body: "Advanced driver assistance that steers, accelerates and brakes within its lane — watching the road in every direction, day and night.",
    image: "/images/night-top.jpg",
  },
  {
    icon: Sparkles,
    title: "Minimalist Interior",
    body: "A single 15-inch touchscreen, premium materials and a glass roof that floods the cabin with light. Nothing you don't need.",
    image: "/images/interior.jpg",
  },
  {
    icon: BatteryCharging,
    title: "Supercharging",
    body: "Add up to 200 miles in 15 minutes at tens of thousands of Superchargers, or charge overnight at home and wake up full.",
    image: "/images/front-dark.jpg",
  },
  {
    icon: ShieldCheck,
    title: "Built for Safety",
    body: "A rigid structure, low centre of gravity and active safety features designed to help avoid collisions before they happen.",
    image: "/images/badge-dark.jpg",
  },
];

function FeatureItem({
  feature,
  index,
  onActive,
}: {
  feature: (typeof features)[number];
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[70vh] items-center lg:min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-30%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md"
      >
        {/* Inline image for small screens where the sticky panel is hidden */}
        <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-3xl lg:hidden">
          <Image src={feature.image} alt="" fill sizes="90vw" className="object-cover" />
        </div>
        <span className="grid size-12 place-items-center rounded-full border border-white/20">
          <feature.icon className="size-5" />
        </span>
        <p className="mt-8 text-sm text-white/40">0{index + 1} / 0{features.length}</p>
        <h3 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{feature.title}</h3>
        <p className="mt-5 leading-relaxed text-white/60">{feature.body}</p>
      </motion.div>
    </div>
  );
}

export function Features() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1, 1.15]);

  return (
    <section ref={sectionRef} className="relative bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 pt-32 md:px-12">
        <p className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase">Inside &amp; out</p>
        <h2 className="mt-4 max-w-3xl text-5xl leading-[0.95] font-extralight tracking-tight md:text-7xl">
          Engineered for the <span className="font-bold">future.</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-12 lg:grid-cols-2">
        <div className="sticky top-0 hidden h-screen items-center lg:flex">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              >
                <motion.div style={{ scale: imageScale }} className="absolute inset-0">
                  <Image
                    src={features[active].image}
                    alt={features[active].title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 flex gap-2">
              {features.map((f, i) => (
                <motion.span
                  key={f.title}
                  animate={{ width: i === active ? 32 : 8, opacity: i === active ? 1 : 0.4 }}
                  className="h-2 rounded-full bg-white"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pb-24">
          {features.map((f, i) => (
            <FeatureItem key={f.title} feature={f} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
