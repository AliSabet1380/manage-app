"use client";

import { useNewPayment } from "@/features/payments/hooks/useNewPayment";
import { useCreatePayment } from "@/features/payments/api/userCreatePayment";

import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent,
} from "@/components/ui/sheet";
import { FormValues, NewPaymentForm } from "./payment-form";

export const NewPaymentSheet = () => {
  const { onClose, isOpen } = useNewPayment();
  const createPaymentMutation = useCreatePayment();

  const onSubmit = (formValues: FormValues) => {
    createPaymentMutation.mutate(formValues);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new payment</SheetTitle>
          <SheetDescription>You can edit your payment later</SheetDescription>
        </SheetHeader>
        <div className="pt-8 px-3">
          <NewPaymentForm
            onSubmit={onSubmit}
            disabled={createPaymentMutation.isPending}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
