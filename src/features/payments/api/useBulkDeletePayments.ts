import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type Response = InferResponseType<
  (typeof client.api.payment)["bulk-delete"]["$post"],
  200
>;
type Request = InferRequestType<
  (typeof client.api.payment)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeletePayments = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation<Response, Error, Request>({
    mutationFn: async (json) => {
      const response = await client.api.payment["bulk-delete"].$post({ json });

      if (!response.ok) throw new Error("Fail to delete payments");

      return await response.json();
    },
    onSuccess: () => {
      toast("payments deleted");
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: () => {
      toast("Fail to delete payments");
    },
  });

  return mutate;
};
