"use client";

import { useSyncExternalStore } from "react";
import { useCart } from "@/store/cart";
import { getModel } from "@/lib/data";

const TAX_RATE = 0.075;
const DOC_FEE = 250;

export type PlacedOrder = { number: string; name: string; email: string; total: number };

export function useCartLines() {
  const items = useCart((s) => s.items);
  const lines = items.flatMap((item) => {
    const model = getModel(item.id);
    return model ? [{ ...item, model }] : [];
  });
  const subtotal = lines.reduce((sum, l) => sum + l.model.price * l.qty, 0);
  const units = lines.reduce((sum, l) => sum + l.qty, 0);
  const fees = units * DOC_FEE;
  const tax = Math.round(subtotal * TAX_RATE);
  return { lines, subtotal, fees, tax, total: subtotal + fees + tax };
}

/** True once the persisted cart has been restored from localStorage. */
export function useCartHydrated() {
  return useSyncExternalStore(subscribeHydration, getHydrated, () => false);
}

// `persist` is only attached in the browser (it needs localStorage)
const subscribeHydration = (cb: () => void) =>
  useCart.persist?.onFinishHydration(cb) ?? (() => {});
const getHydrated = () => useCart.persist?.hasHydrated() ?? false;
