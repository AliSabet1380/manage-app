import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetPayment = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["payment", { id }],
    queryFn: async () => {
      const response = await client.api.payment[":id"].$get({ param: { id } });

      if (!response.ok) throw new Error("Fail to fetch payment");

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
