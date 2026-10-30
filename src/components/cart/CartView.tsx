"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/data";
import { MaskLines } from "@/components/ui/Reveal";
import { CheckoutForm } from "./CheckoutForm";
import { OrderConfirmed } from "./OrderConfirmed";
import { useCartHydrated, useCartLines, type PlacedOrder } from "./useCartLines";

type Step = "cart" | "checkout" | "done";

const stepVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export function CartView() {
  const [step, setStep] = useState<Step>("cart");
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  return (
    <section className="min-h-screen bg-cloud px-4 pt-32 pb-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          {step === "cart" && (
            <motion.div key="cart" {...stepVariants}>
              <CartStep onCheckout={() => setStep("checkout")} />
            </motion.div>
          )}
          {step === "checkout" && (
            <motion.div key="checkout" {...stepVariants}>
              <CheckoutForm
                onBack={() => setStep("cart")}
                onPlaced={(o) => {
                  setOrder(o);
                  setStep("done");
                }}
              />
            </motion.div>
          )}
          {step === "done" && order && (
            <motion.div key="done" {...stepVariants}>
              <OrderConfirmed order={order} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function CartStep({ onCheckout }: { onCheckout: () => void }) {
  const { lines, subtotal, fees, tax, total } = useCartLines();
  const hydrated = useCartHydrated();
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  return (
    <>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h1 className="text-5xl leading-[0.95] tracking-tight md:text-7xl">
          <MaskLines
            animateOnMount
            delay={0.4}
            lines={[
              <span key="y" className="font-extralight">Your</span>,
              <span key="c" className="font-bold">Cart.</span>,
            ]}
          />
        </h1>
        <Link href="/#models" className="group flex items-center gap-2 text-sm font-medium text-smoke hover:text-ink">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Continue shopping
        </Link>
      </div>

      {!hydrated ? (
        <div className="mt-14 h-64 animate-pulse rounded-3xl bg-white/60" />
      ) : lines.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_380px]">
          <motion.ul layout className="space-y-4">
            <AnimatePresence initial={false}>
              {lines.map(({ model, qty }, i) => (
                <motion.li
                  key={model.id}
                  layout
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.5 + i * 0.08 } }}
                  exit={{ opacity: 0, x: 60, height: 0, marginTop: 0, transition: { duration: 0.35 } }}
                  className="overflow-hidden rounded-3xl bg-white"
                >
                  <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center">
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl sm:w-48">
                      <Image src={model.image} alt={model.name} fill sizes="200px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{model.name}</h2>
                      <p className="text-sm text-smoke">{model.tagline}</p>
                      <p className="mt-2 text-xs text-smoke">
                        {model.range} mi · {model.topSpeed} mph · {model.zeroToSixty}s 0-60
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                      <motion.p key={qty} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-lg font-semibold">
                        {formatPrice(model.price * qty)}
                      </motion.p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-full bg-cloud">
                          <button
                            onClick={() => setQty(model.id, qty - 1)}
                            aria-label={`Decrease ${model.name} quantity`}
                            className="grid size-9 place-items-center rounded-full transition-colors hover:bg-mist"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold tabular-nums">{qty}</span>
                          <button
                            onClick={() => setQty(model.id, qty + 1)}
                            aria-label={`Increase ${model.name} quantity`}
                            className="grid size-9 place-items-center rounded-full transition-colors hover:bg-mist"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => remove(model.id)}
                          aria-label={`Remove ${model.name}`}
                          className="grid size-9 place-items-center rounded-full text-smoke hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="size-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-fit rounded-3xl bg-ink p-7 text-white lg:sticky lg:top-28"
          >
            <h2 className="text-lg font-semibold">Order summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <SummaryRow label="Subtotal" value={subtotal} />
              <SummaryRow label="Destination & doc fees" value={fees} />
              <SummaryRow label="Estimated tax (7.5%)" value={tax} />
              <div className="flex justify-between text-white/60">
                <dt>Delivery</dt>
                <dd>Free</dd>
              </div>
            </dl>
            <div className="my-6 h-px bg-white/15" />
            <div className="flex items-end justify-between">
              <span className="text-sm text-white/60">Total</span>
              <motion.span key={total} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-3xl font-bold">
                {formatPrice(total)}
              </motion.span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onCheckout}
              className="mt-8 w-full rounded-full bg-white py-4 text-sm font-semibold tracking-wide text-ink"
            >
              CHECKOUT
            </motion.button>
            <p className="mt-4 text-center text-xs text-white/40">Demo checkout — no payment is taken.</p>
          </motion.aside>
        </div>
      )}
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <dt className="text-white/60">{label}</dt>
      <dd className="font-medium">{formatPrice(value)}</dd>
    </div>
  );
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="mt-14 flex flex-col items-center rounded-[2rem] bg-white px-6 py-24 text-center"
    >
      <motion.span
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="grid size-20 place-items-center rounded-full bg-cloud"
      >
        <ShoppingBag className="size-8" />
      </motion.span>
      <h2 className="mt-8 text-2xl font-bold">Your cart is empty</h2>
      <p className="mt-2 max-w-sm text-smoke">
        Explore the lineup and add a vehicle — your future self will thank you.
      </p>
      <Link
        href="/#models"
        className="mt-8 rounded-full bg-ink px-10 py-4 text-sm font-medium tracking-wide text-white transition-transform hover:scale-105"
      >
        BROWSE MODELS
      </Link>
    </motion.div>
  );
}
