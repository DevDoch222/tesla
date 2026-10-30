"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Play } from "lucide-react";
import { FILM_SRC, VideoModal } from "@/components/ui/VideoModal";

export function VideoShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Video window grows from a rounded card to full bleed as you scroll through
  const width = useTransform(scrollYProgress, [0, 0.6], ["60%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.6], ["55%", "100%"]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [40, 0]);
  const titleY = useTransform(scrollYProgress, [0.3, 0.75], [80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section ref={ref} className="relative h-[250vh] bg-cloud">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.p
          style={{ opacity: introOpacity }}
          className="absolute top-[12%] text-xs font-semibold tracking-[0.3em] text-smoke uppercase"
        >
          The film
        </motion.p>

        <motion.div
          style={{ width, height, borderRadius: radius }}
          className="relative min-w-[86%] overflow-hidden bg-ink md:min-w-0"
        >
          <video
            src={FILM_SRC}
            className="absolute inset-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/35" />

          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
          >
            <h2 className="text-5xl leading-[0.95] font-extralight tracking-tight md:text-8xl">
              Feel the <span className="font-bold">silence.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm text-white/70 md:text-base">
              Instant torque. Zero emissions. A drive so quiet you&apos;ll hear the road.
            </p>
          </motion.div>

          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-6 bottom-6 flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 text-sm font-semibold text-ink md:right-10 md:bottom-10"
          >
            <span className="grid size-9 place-items-center rounded-full bg-ink">
              <Play className="size-3.5 translate-x-px fill-white text-white" />
            </span>
            Watch with sound
          </motion.button>
        </motion.div>
      </div>
      <VideoModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
