import { fetchCategoryNews } from "@/api/fetchCategoryNews";
import { useQuery } from "@tanstack/react-query";
import { NewsArticle } from "../news-article";

const MarketPage = () => {
  const { data } = useQuery({
    queryKey: ["marketPageData"], // Corrected: Wrapped inside an object
    queryFn: () => fetchCategoryNews("market"), // Corrected: queryFn explicitly defined
  });

  return <NewsArticle articles={data?.articles || []} />;
};

export default MarketPage;
