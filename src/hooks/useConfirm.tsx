"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ConfirmProps {
  title: string;
  desc: string;
}

export const useConfirm = ({
  title,
  desc,
}: ConfirmProps): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (val: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const onClose = () => {
    setPromise(null);
  };

  const onConfirm = () => {
    promise?.resolve(true);
    onClose();
  };

  const onCancle = () => {
    promise?.resolve(false);
    onClose();
  };

  const ConfirmDailog = () => (
    <Dialog open={promise !== null} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={onCancle} variant={"outline"}>
            Cancle
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmDailog, confirm];
};
