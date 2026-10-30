"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { formatPrice } from "@/lib/data";
import type { PlacedOrder } from "./useCartLines";

export function OrderConfirmed({ order }: { order: PlacedOrder }) {
  return (
    <div className="flex flex-col items-center rounded-[2rem] bg-white px-6 py-20 text-center md:py-28">
      <motion.svg
        viewBox="0 0 100 100"
        className="size-28"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      >
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M30 52 L44 66 L71 37"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
        />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mt-10 text-xs font-semibold tracking-[0.3em] text-smoke uppercase">
          Order confirmed
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Thank you, {order.name.split(" ")[0]}!
        </h1>
        <p className="mx-auto mt-4 max-w-md text-smoke">
          Your order <span className="font-semibold text-ink">{order.number}</span> for{" "}
          <span className="font-semibold text-ink">{formatPrice(order.total)}</span> is reserved. In a
          real store, a confirmation would be heading to {order.email}.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-ink px-10 py-4 text-sm font-medium tracking-wide text-white transition-transform hover:scale-105"
          >
            BACK HOME
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-mist px-10 py-4 text-sm font-medium tracking-wide transition-colors hover:bg-cloud"
          >
            ABOUT TESLA
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
