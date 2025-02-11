import { fetchCategoryNews } from "@/api/fetchCategoryNews";
import { useQuery } from "@tanstack/react-query";
import { NewsArticle } from "../news-article";

const USPage = () => {
  const { data } = useQuery({
    queryKey: ["usData"], // Corrected: Wrapped inside an object
    queryFn: () => fetchCategoryNews("US"), // Corrected: queryFn explicitly defined
  });

  return <NewsArticle articles={data?.articles || []} />;
};

export default USPage;
