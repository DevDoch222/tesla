"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/data";
import { useCartLines, type PlacedOrder } from "./useCartLines";

const fields = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name", span: 2 },
  { name: "email", label: "Email", type: "email", autoComplete: "email", span: 1 },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", span: 1 },
  { name: "address", label: "Street address", type: "text", autoComplete: "street-address", span: 2 },
  { name: "city", label: "City", type: "text", autoComplete: "address-level2", span: 1 },
  { name: "zip", label: "ZIP / Postal code", type: "text", autoComplete: "postal-code", span: 1 },
] as const;

export function CheckoutForm({
  onBack,
  onPlaced,
}: {
  onBack: () => void;
  onPlaced: (order: PlacedOrder) => void;
}) {
  const { lines, total } = useCartLines();
  const clear = useCart((s) => s.clear);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    // Simulated processing delay for the demo
    await new Promise((r) => setTimeout(r, 1600));
    onPlaced({
      number: `TSL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      name: String(data.get("name")),
      email: String(data.get("email")),
      total,
    });
    clear();
  }

  return (
    <div>
      <button onClick={onBack} className="group flex items-center gap-2 text-sm font-medium text-smoke hover:text-ink">
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Back to cart
      </button>
      <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">Checkout</h1>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 md:p-10">
          <h2 className="text-lg font-semibold">Delivery details</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {fields.map((f, i) => (
              <motion.label
                key={f.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className={`group relative block ${f.span === 2 ? "sm:col-span-2" : ""}`}
              >
                <input
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  required
                  placeholder=" "
                  disabled={submitting}
                  className="peer w-full rounded-2xl border border-mist bg-cloud px-4 pt-6 pb-2 text-sm outline-none transition-colors focus:border-ink focus:bg-white disabled:opacity-60"
                />
                <span className="pointer-events-none absolute top-4 left-4 text-sm text-smoke transition-all peer-focus:top-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                  {f.label}
                </span>
              </motion.label>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-cloud p-4 text-xs text-smoke">
            <Lock className="mt-0.5 size-4 shrink-0" />
            This is a portfolio demo. No payment details are collected and nothing is sent
            anywhere.
          </div>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: submitting ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-semibold tracking-wide text-white disabled:opacity-80"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Processing…
              </>
            ) : (
              <>PLACE ORDER · {formatPrice(total)}</>
            )}
          </motion.button>
        </form>

        <aside className="h-fit rounded-3xl bg-white p-6 lg:sticky lg:top-28">
          <h2 className="text-lg font-semibold">In your order</h2>
          <ul className="mt-5 space-y-4">
            {lines.map(({ model, qty }) => (
              <li key={model.id} className="flex items-center gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                  <Image src={model.image} alt={model.name} fill sizes="64px" className="object-cover" />
                  <span className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-ink text-[10px] font-semibold text-white">
                    {qty}
                  </span>
                </div>
                <p className="flex-1 text-sm font-semibold">{model.name}</p>
                <p className="text-sm">{formatPrice(model.price * qty)}</p>
              </li>
            ))}
          </ul>
          <div className="my-5 h-px bg-mist" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
