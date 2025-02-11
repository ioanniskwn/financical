import { fetchCryptoData } from "@/api/fetchCryptoData";
import { useQuery } from "@tanstack/react-query";

export const useCryptoData = () => {
  const query = useQuery({
    queryKey: ["cryptoData"],
    queryFn: fetchCryptoData,
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });

  // console.log("QuerySource status:", query.status);
  // console.log("QuerySource data:", query.data);
  // console.log("QuerySource error:", query.error);

  return query;
};
