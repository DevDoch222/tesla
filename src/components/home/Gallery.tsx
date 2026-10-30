"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { MaskLines } from "@/components/ui/Reveal";

const columns = [
  ["/images/parking-top.jpg", "/images/model-3.jpg", "/images/interior-2.jpg"],
  ["/images/showroom.jpg", "/images/top-stripes.jpg", "/images/model-s.jpg"],
  ["/images/model-y.jpg", "/images/night-top.jpg", "/images/model-x.jpg"],
];

function Column({
  images,
  y,
  className,
}: {
  images: string[];
  y: MotionValue<string>;
  className?: string;
}) {
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-4 md:gap-6 ${className ?? ""}`}>
      {images.map((src) => (
        <div key={src} className="group relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl">
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            className="object-cover grayscale-[60%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
        </div>
      ))}
    </motion.div>
  );
}

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Each column travels at its own speed
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-12%", "10%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["4%", "-26%"]);

  return (
    <section className="overflow-hidden bg-cloud px-4 py-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col justify-between gap-6 px-2 md:flex-row md:items-end">
          <h2 className="text-5xl leading-[0.95] tracking-tight md:text-7xl">
            <MaskLines
              lines={[
                <span key="a" className="font-extralight">Designed to be</span>,
                <span key="b" className="font-bold">noticed.</span>,
              ]}
            />
          </h2>
          <p className="max-w-xs text-sm text-smoke">
            Clean lines, flush surfaces and a silhouette shaped by the wind. Hover to bring
            each shot to life.
          </p>
        </div>

        <div ref={ref} className="grid h-[110vh] grid-cols-2 gap-4 overflow-hidden md:h-[140vh] md:grid-cols-3 md:gap-6">
          <Column images={columns[0]} y={y1} />
          <Column images={columns[1]} y={y2} />
          <Column images={columns[2]} y={y3} className="hidden md:flex" />
        </div>
      </div>
    </section>
  );
}
