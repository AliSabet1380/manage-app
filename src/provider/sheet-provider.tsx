"use client";

import { EditPaymentSheet } from "@/features/payments/components/edit-payment-sheet";
import { NewPaymentSheet } from "@/features/payments/components/new-payment-sheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <EditPaymentSheet />
      <NewPaymentSheet />
    </>
  );
};
