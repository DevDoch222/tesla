"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Plus } from "lucide-react";
import { models, formatPrice, type CarModel } from "@/lib/data";
import { useCart } from "@/store/cart";
import { useToast } from "@/store/toast";

function ModelCard({
  model,
  index,
  progress,
}: {
  model: CarModel;
  index: number;
  progress: MotionValue<number>;
}) {
  const add = useCart((s) => s.add);
  const show = useToast((s) => s.show);

  // 3D tilt that follows the cursor
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.25), transparent 50%)`,
  );

  // Image drifts against the track for a parallax window effect
  const imageX = useTransform(progress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.article
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className="group relative h-[68vh] max-h-[640px] min-h-[440px] w-[82vw] shrink-0 overflow-hidden rounded-[2rem] bg-ink text-white shadow-2xl sm:w-[60vw] lg:w-[38vw]"
    >
      <motion.div style={{ x: imageX }} className="absolute -inset-x-[10%] inset-y-0">
        <Image
          src={model.image}
          alt={model.name}
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
      <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0" />

      <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
        <div className="flex items-start justify-between">
          <span className="text-sm font-medium text-white/60">0{index + 1}</span>
          <span className="rounded-full border border-white/30 px-3 py-1 text-xs backdrop-blur-sm">
            From {formatPrice(model.price)}
          </span>
        </div>

        <div>
          <h3 className="text-4xl font-bold tracking-tight md:text-5xl">{model.name}</h3>
          <p className="mt-2 text-sm text-white/70">{model.tagline}</p>

          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/15 pt-5">
            {[
              [`${model.range} mi`, "Range"],
              [`${model.topSpeed} mph`, "Top Speed"],
              [`${model.zeroToSixty}s`, "0-60 mph"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-[10px] uppercase tracking-widest text-white/50">{l}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              add(model.id);
              show(`${model.name} added`, formatPrice(model.price));
            }}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-semibold text-ink"
          >
            <Plus className="size-4" /> Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export function Models() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current!);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const headingX = useTransform(smooth, [0, 1], ["0%", "-30%"]);

  return (
    <section
      id="models"
      ref={sectionRef}
      className="relative bg-cloud"
      // Vertical scroll room equals the horizontal distance the track travels
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.p
          style={{ x: headingX }}
          aria-hidden
          className="pointer-events-none absolute top-[8%] left-0 text-[18vw] leading-none font-black whitespace-nowrap text-ink/[0.04] select-none"
        >
          CHOOSE YOUR DRIVE · CHOOSE YOUR DRIVE
        </motion.p>

        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-6 px-6 md:gap-8 md:px-12">
          <div className="w-[82vw] shrink-0 sm:w-[50vw] lg:w-[30vw]">
            <p className="text-xs font-semibold tracking-[0.3em] text-smoke uppercase">The lineup</p>
            <h2 className="mt-4 text-5xl leading-[0.95] font-extralight tracking-tight md:text-7xl">
              Choose your <span className="font-bold">drive.</span>
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-smoke">
              Four vehicles, one obsession. Keep scrolling to explore the lineup and add
              your favourite to the cart.
            </p>
            <div className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-mist">
              <motion.div style={{ scaleX: smooth }} className="h-full origin-left bg-ink" />
            </div>
          </div>

          {models.map((m, i) => (
            <ModelCard key={m.id} model={m} index={i} progress={smooth} />
          ))}
          <div className="w-[6vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
