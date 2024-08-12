import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetPayments = () => {
  const query = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const responser = await client.api.payment.$get();

      if (!responser.ok) throw new Error("Fail to fetch payments");

      const { data } = await responser.json();
      return data;
    },
  });

  return query;
};
