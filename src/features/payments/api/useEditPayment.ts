import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type Response = InferResponseType<
  (typeof client.api.payment)[":id"]["$patch"],
  200
>;

type Request = InferRequestType<
  (typeof client.api.payment)[":id"]["$patch"]
>["json"];

export const useEditPayment = (id?: string) => {
  const queryClient = useQueryClient();
  const mutate = useMutation<Response, Error, Request>({
    mutationFn: async (json) => {
      const response = await client.api.payment[":id"]["$patch"]({
        param: { id },
        json,
      });

      if (!response.ok) throw new Error("Fail to update payment");

      return await response.json();
    },
    onError: () => {
      toast("Fail to update payment");
    },
    onSuccess: () => {
      toast("payment updated");

      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["payment", { id }] });
    },
  });

  return mutate;
};
