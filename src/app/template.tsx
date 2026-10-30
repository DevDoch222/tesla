"use client";

import { motion } from "motion/react";

// Remounts on every navigation: a black curtain wipes up and the page fades in.
// Only opacity is animated on the page wrapper so fixed/sticky children keep working.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
