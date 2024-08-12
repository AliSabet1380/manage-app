"use client";

import { Loader2, Plus } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { column } from "./column";

import { useNewPayment } from "@/features/payments/hooks/useNewPayment";
import { useGetPayments } from "@/features/payments/api/useGetPayments";
import { useBulkDeletePayments } from "@/features/payments/api/useBulkDeletePayments";

import { useConfirm } from "@/hooks/useConfirm";

const DashboardPage = () => {
  const [DialogConfirm, confirm] = useConfirm({
    title: "Are you sure ?",
    desc: "Your going to delete payment(s).",
  });
  const getPaymentsQuery = useGetPayments();
  const deletePaymentsMutate = useBulkDeletePayments();
  const { onOpen } = useNewPayment();

  const tableData = getPaymentsQuery.data || [];

  const handleDelete = async (ids: string[]) => {
    const ok = await confirm();

    if (ok) deletePaymentsMutate.mutate({ ids });
  };

  return (
    <>
      <DialogConfirm />
      <div className="w-5/6 lg:w-2/3 mx-auto flex items-center justify-center -mt-4 bg-white shadow-md border border-slate-400 rounded-lg">
        <div className="w-full flex flex-col p-2.5">
          <div className="w-full flex items-center justify-between px-4 py-3">
            <h3 className="text-muted-foreground text-lg ">Payments Table</h3>
            <Button onClick={onOpen}>
              Create new
              <Plus className="text-white size-4 ml-2" />
            </Button>
          </div>

          {getPaymentsQuery.isLoading ? (
            <div className="w-full flex items-center justify-center pb-7">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <DataTable
              disabled={deletePaymentsMutate.isPending}
              onDelete={handleDelete}
              filterKey="name"
              columns={column}
              data={tableData}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
