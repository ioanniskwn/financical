import { fetchCategoryNews } from "@/api/fetchCategoryNews";
import { useQuery } from "@tanstack/react-query";
import { NewsArticle } from "../news-article";

const WorldPage = () => {
  const { data } = useQuery({
    queryKey: ["worldData"], // Corrected: Wrapped inside an object
    queryFn: () => fetchCategoryNews("worlddata"), // Corrected: queryFn explicitly defined
  });

  return <NewsArticle articles={data?.articles || []} />;
};

export default WorldPage;
