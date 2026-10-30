"use client";

import { motion } from "motion/react";
import { Leaf, Lightbulb, PenTool, ShieldCheck } from "lucide-react";

const values = [
  { icon: Leaf, title: "Sustainability", body: "Zero tailpipe emissions, recycled battery materials and factories powered by renewables." },
  { icon: Lightbulb, title: "Innovation", body: "Software-defined vehicles that keep improving long after they leave the factory." },
  { icon: ShieldCheck, title: "Safety", body: "Engineered from the ground up to protect everyone inside — and around — the car." },
  { icon: PenTool, title: "Design", body: "Minimal, purposeful and aerodynamic. Every line has a reason to exist." },
];

export function Values() {
  return (
    <section className="bg-cloud px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-smoke uppercase">What drives us</p>
        <h2 className="mt-4 max-w-2xl text-5xl leading-[0.95] font-extralight tracking-tight md:text-7xl">
          Our <span className="font-bold">values.</span>
        </h2>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 80, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl bg-white p-8"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <div className="relative transition-colors duration-500 group-hover:text-white">
                <span className="grid size-14 place-items-center rounded-2xl bg-cloud text-ink transition-transform duration-500 group-hover:rotate-12">
                  <v.icon className="size-6" />
                </span>
                <h3 className="mt-16 text-2xl font-bold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke transition-colors duration-500 group-hover:text-white/70">
                  {v.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
