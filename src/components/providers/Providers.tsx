"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { useCart } from "@/store/cart";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true, force: true });
    // Arriving via a link like /#models: glide to the section once the page has laid out
    const hash = window.location.hash;
    if (!hash) return;
    const t = setTimeout(() => lenis.scrollTo(hash, { duration: 1.4, force: true }), 500);
    return () => clearTimeout(t);
  }, [pathname, lenis]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useCart.persist?.rehydrate();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.09, anchors: true }}>
      <MotionConfig reducedMotion="user">
        <ScrollReset />
        {children}
      </MotionConfig>
    </ReactLenis>
  );
}
