import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

export const useDeletePayment = (id?: string) => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async () => {
      const response = await client.api.payment[":id"].$delete({
        param: { id },
      });

      if (!response.ok) throw new Error("Fail to delete payment");

      return await response.json();
    },
    onSuccess: () => {
      toast("payment deleted");

      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["payment", { id }] });
    },
    onError: () => {
      toast("Fail to delete payment");
    },
  });

  return mutate;
};
