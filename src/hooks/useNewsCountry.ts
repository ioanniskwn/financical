import { useQuery } from "@tanstack/react-query";
import { fetchCountryNews } from "../api/fetchCountryNews";

export const useNewsCountry = () => {
  const query = useQuery({
    queryKey: ["countryNews"],
    queryFn: fetchCountryNews,
   /* staleTime: 1000 * 60 * 5, // ✅ Keeps cached data for 5 minutes */
   staleTime: 30000,
    refetchInterval: 30000, // ✅ Fetch new news every 30 seconds
    refetchOnWindowFocus: true, // ✅ Refetch when tab/window is focused
    gcTime: 1000 * 60 * 10, // ✅ Keeps cache in garbage collection for 10 minutes
  } as const); // ✅ Ensures TypeScript treats options correctly

  return query;
};
