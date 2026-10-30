"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useToast } from "@/store/toast";

export function Toaster() {
  const { toast, dismiss } = useToast();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismiss, 3200);
    return () => clearTimeout(t);
  }, [toast, dismiss]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4">
      <AnimatePresence mode="popLayout">
        {toast && (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-auto flex items-center gap-4 rounded-full bg-ink py-2 pr-2 pl-3 text-white shadow-2xl"
            role="status"
          >
            <span className="grid size-8 place-items-center rounded-full bg-white text-ink">
              <Check className="size-4" />
            </span>
            <div className="text-sm">
              <p className="font-semibold">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-white/60">{toast.description}</p>
              )}
            </div>
            <Link
              href="/cart"
              onClick={dismiss}
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink transition-transform hover:scale-105"
            >
              View cart
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
