"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight, X } from "lucide-react";
import { models } from "@/lib/data";
import { TeslaLogo } from "@/components/icons/TeslaLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/#models", label: "Models" },
  { href: "/cart", label: "Cart" },
  { href: "/about", label: "About" },
];

export function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal
            aria-label="Menu"
            className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-ink p-8 text-white"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <TeslaLogo className="size-8" />
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={onClose}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full border border-white/20"
              >
                <X className="size-5" />
              </motion.button>
            </div>

            <nav className="mt-16">
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.6, delay: 0.25 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center justify-between py-1 text-5xl font-light tracking-tight transition-colors hover:text-white/60"
                      >
                        {link.label}
                        <ArrowUpRight className="size-8 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">Lineup</p>
              <div className="grid grid-cols-4 gap-2">
                {models.map((m) => (
                  <Link
                    key={m.id}
                    href="/#models"
                    onClick={onClose}
                    className="group relative aspect-square overflow-hidden rounded-xl"
                  >
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="100px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-1.5 text-[10px] font-semibold">
                      {m.name}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
