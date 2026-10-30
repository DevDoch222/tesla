"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ShoppingBag, User } from "lucide-react";
import { TeslaLogo, TeslaWordmark } from "@/components/icons/TeslaLogo";
import { MenuDrawer } from "./MenuDrawer";
import { useCartCount } from "@/store/cart";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cart", label: "Cart" },
  { href: "/about", label: "About" },
];

function GridIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="currentColor" aria-hidden>
      <rect x="1" y="1" width="8" height="8" rx="2.5" />
      <rect x="11" y="1" width="8" height="5" rx="2" />
      <rect x="1" y="11" width="8" height="8" rx="2.5" />
      <rect x="11" y="8" width="8" height="11" rx="2.5" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const count = useCartCount();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
    setScrolled(y > 30);
    if (y > prev) setProfileOpen(false);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
        animate={{ y: hidden && !menuOpen ? "-120%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`relative mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-4 transition-[background,box-shadow,border-color] duration-500 md:px-6 ${
            scrolled
              ? "glass shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)]"
              : "border border-transparent"
          }`}
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full"
          >
            <GridIcon />
          </motion.button>

          <Link
            href="/"
            className="group absolute left-1/2 flex -translate-x-1/2 flex-col items-center"
            aria-label="Tesla home"
          >
            <TeslaLogo className="size-8 transition-transform duration-500 group-hover:scale-110" />
            <TeslaWordmark className="mt-0.5 pl-[0.45em] text-[9px]" />
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <ul className="hidden items-center md:flex">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative block px-4 py-2 text-sm font-medium"
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-ink/[0.07]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">
                        {link.label}
                        {link.href === "/cart" && count > 0 && (
                          <motion.span
                            key={count}
                            initial={{ scale: 0.4 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            className="absolute -top-2.5 -right-4 grid size-4 place-items-center rounded-full bg-ink text-[10px] font-semibold text-white"
                          >
                            {count}
                          </motion.span>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative grid size-10 place-items-center md:hidden"
            >
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="absolute top-0.5 right-0.5 grid size-4 place-items-center rounded-full bg-ink text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </Link>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setProfileOpen((o) => !o)}
                aria-label="Account"
                aria-expanded={profileOpen}
                className="grid size-10 place-items-center rounded-full bg-white shadow-[0_6px_20px_-6px_rgba(0,0,0,0.35)]"
              >
                <User className="size-4" fill="currentColor" />
              </motion.button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl bg-white p-4 shadow-2xl"
                  >
                    <p className="text-xs text-smoke">Signed in as</p>
                    <p className="font-semibold">Guest Driver</p>
                    <div className="my-3 h-px bg-mist" />
                    <Link
                      href="/cart"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-cloud"
                    >
                      My cart <span className="text-smoke">{count}</span>
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-2 py-2 text-sm hover:bg-cloud"
                    >
                      About Tesla
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.nav>
      </motion.header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
