import { News } from "@/types/news";
import { Link } from "react-router-dom";

interface TopStoriesProps {
  articles: News[];
}

const TopStories: React.FC<TopStoriesProps> = ({ articles }) => {
  const limitedArticles = articles.slice(10, 14);
  return (
    <section className="space-y-6">
      <h2 className="font-serif text-2xl font-bold border-b pb-2">
        TOP STORIES
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {limitedArticles.map((article, index) => (
          <Link to={`/news/${index + 10}`} key={index}>
            <div className="group cursor-pointer space-y-3">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={article.urlToImage || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-destructive"></span>
                <h3 className="font-serif font-semibold group-hover:text-destructive">
                  {article.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopStories;
