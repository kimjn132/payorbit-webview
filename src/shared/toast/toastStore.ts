import { create } from 'zustand';

export type ToastVariant = 'success' | 'error';

export type Toast = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastState = {
  toasts: Toast[];
  show: (message: string, variant: ToastVariant) => void;
  dismiss: (id: string) => void;
};

const DEFAULT_DURATION_MS = 3000;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  show: (message, variant) => {
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    set((state) => ({ toasts: [...state.toasts, { id, message, variant }] }));

    setTimeout(() => {
      get().dismiss(id);
    }, DEFAULT_DURATION_MS);
  },
  dismiss: (id) => {
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
  },
}));

export function useToast() {
  const show = useToastStore((state) => state.show);
  return {
    success: (message: string) => show(message, 'success'),
    error: (message: string) => show(message, 'error'),
  };
}
