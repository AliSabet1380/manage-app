"use client";

import { useOpenPayment } from "@/features/payments/hooks/use-open-payment";
import { useEditPayment } from "@/features/payments/api/useEditPayment";

import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent,
} from "@/components/ui/sheet";
import { FormValues, NewPaymentForm } from "./payment-form";
import { useGetPayment } from "../api/useGetPayment";
import { Loader2 } from "lucide-react";
import { useDeletePayment } from "../api/useDeletePayment";
import { useConfirm } from "@/hooks/useConfirm";

export const EditPaymentSheet = () => {
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure ?",
    desc: "Your going to delete payment.",
  });
  const { onClose, isOpen, id } = useOpenPayment();
  const updatePaymentMutation = useEditPayment(id);
  const getPaymentQuery = useGetPayment(id);
  const deletePaymentMutation = useDeletePayment(id);

  const defaultValues = getPaymentQuery.data
    ? getPaymentQuery.data
    : { name: "", description: "", price: "" };

  const onSubmit = (formValues: FormValues) => {
    updatePaymentMutation.mutate(formValues);
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok)
      deletePaymentMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
  };

  const isPending =
    deletePaymentMutation.isPending || updatePaymentMutation.isPending;

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit existing payment</SheetTitle>
            <SheetDescription>
              your pervious values are default
            </SheetDescription>
          </SheetHeader>
          <div className="pt-8 px-3">
            {getPaymentQuery.isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <NewPaymentForm
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                disabled={isPending}
                onDelete={onDelete}
                id={id}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
