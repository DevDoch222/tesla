"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

const milestones = [
  { year: "2003", title: "The beginning", body: "A small team sets out to prove electric cars can be better than gasoline cars." },
  { year: "2008", title: "Roadster", body: "The first highway-legal serial production EV using lithium-ion cells, with 200+ miles of range." },
  { year: "2012", title: "Model S", body: "A premium sedan that redefines what a car can be, with over-the-air updates from day one." },
  { year: "2015", title: "Model X", body: "Falcon-wing doors, seating for seven and the safety of a low centre of gravity." },
  { year: "2017", title: "Model 3", body: "Electric goes mainstream: a more affordable sedan built for millions of drivers." },
  { year: "2020", title: "Model Y", body: "A versatile compact SUV that goes on to become one of the best-selling cars in the world." },
  { year: "2023", title: "Cybertruck", body: "A stainless-steel exoskeleton pickup that looks like nothing else on the road." },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="bg-ink px-6 py-32 text-white md:px-12 md:py-44">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase">Milestones</p>
        <h2 className="mt-4 text-5xl leading-[0.95] font-extralight tracking-tight md:text-7xl">
          Two decades of <span className="font-bold">firsts.</span>
        </h2>

        <div ref={ref} className="relative mt-24">
          {/* Track + the line that draws itself as you scroll */}
          <div className="absolute top-0 bottom-0 left-[7px] w-px bg-white/15 md:left-1/2" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-white md:left-1/2"
          />

          <ul className="space-y-20 md:space-y-28">
            {milestones.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <li key={m.year} className="relative grid md:grid-cols-2 md:gap-16">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="absolute top-3 left-0 size-[15px] rounded-full border-4 border-ink bg-white md:left-1/2 md:-translate-x-1/2"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: right ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-25%" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className={`pl-10 md:pl-0 ${right ? "md:col-start-2" : "md:text-right"}`}
                  >
                    <p className="text-6xl font-black tracking-tighter text-white/15 md:text-8xl">{m.year}</p>
                    <h3 className="-mt-4 text-2xl font-bold md:-mt-6 md:text-3xl">{m.title}</h3>
                    <p className={`mt-3 max-w-sm text-white/60 ${right ? "" : "md:ml-auto"}`}>{m.body}</p>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
