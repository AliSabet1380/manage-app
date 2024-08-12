import { create } from "zustand";

interface NewPaymentProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewPayment = create<NewPaymentProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
