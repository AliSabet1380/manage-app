"use client";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDeletePayment } from "@/features/payments/api/useDeletePayment";
import { useOpenPayment } from "@/features/payments/hooks/use-open-payment";
import { useConfirm } from "@/hooks/useConfirm";

interface ActionsProps {
  id: string;
}

export const Actions = ({ id }: ActionsProps) => {
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure ?",
    desc: "Your going to delete payment.",
  });

  const deleteMutateQuery = useDeletePayment(id);
  const { onOpen } = useOpenPayment();

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) deleteMutateQuery.mutate();
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onOpen(id)}>
            <Edit className="size-4 mr-2" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="size-4 mr-2" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
