"use client";

import { create } from "zustand";

type Toast = { id: number; title: string; description?: string };

type ToastState = {
  toast: Toast | null;
  show: (title: string, description?: string) => void;
  dismiss: () => void;
};

export const useToast = create<ToastState>()((set) => ({
  toast: null,
  show: (title, description) =>
    set({ toast: { id: Date.now(), title, description } }),
  dismiss: () => set({ toast: null }),
}));
