import { fetchCategoryNews } from "@/api/fetchCategoryNews";
import { useQuery } from "@tanstack/react-query";
import { NewsArticle } from "../news-article";

const ClimatePage = () => {
  const { data } = useQuery({
    queryKey: ["climateData"], // Corrected: Wrapped inside an object
    queryFn: () => fetchCategoryNews("climate"), // Corrected: queryFn explicitly defined
  });

  return <NewsArticle articles={data?.articles || []} />;
};

export default ClimatePage;
