import { fetchExchangeRates } from "@/api/fetchCurrencyRate";
import { useQuery } from "@tanstack/react-query";

export const useCurrencyRate = () => {
  const query = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });

  // console.log("useCurrencyRate status:", query.status);
  // console.log("useCurrencyRate data:", query.data);
  // console.log("useCurrencyRate error:", query.error);

  return query;
};
