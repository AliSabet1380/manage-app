import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type Request = InferRequestType<typeof client.api.payment.$post>["json"];

type Response = InferResponseType<typeof client.api.payment.$post, 201>;

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation<Response, Error, Request>({
    mutationFn: async (json) => {
      const response = await client.api.payment.$post({ json });

      if (!response.ok) throw new Error("Fail to create payment");

      return await response.json();
    },
    onSuccess: () => {
      toast("payment created");

      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: () => {
      toast("Fail to create payment");
    },
  });

  return mutate;
};
