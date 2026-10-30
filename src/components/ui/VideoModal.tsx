"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";

export const FILM_SRC = "/videos/tesla.mp4";

const noopSubscribe = () => () => {};

export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lenis = useLenis();
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-black/85 p-4 backdrop-blur-md md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal
          aria-label="Tesla film"
        >
          <motion.div
            className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-black shadow-2xl"
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={FILM_SRC}
              className="aspect-video w-full"
              autoPlay
              controls
              playsInline
            />
            <button
              onClick={onClose}
              aria-label="Close video"
              className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-ink transition-transform hover:scale-110 hover:rotate-90"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
