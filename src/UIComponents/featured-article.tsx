import React from "react";
import { News } from "@/types/news";
import { Link } from "react-router-dom";

interface FeaturedArticleProps {
  articles: News[];
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ articles }) => {
  // ✅ Filter out articles without images before rendering
  const validArticles = articles.filter(article =>
    article.urlToImage &&
    !article.urlToImage.includes("default.jpg") &&
    !article.urlToImage.includes("no-image.png")
  );

  const mainArticle = validArticles.length > 0 ? [validArticles[0]] : [];
  const restArticles = validArticles.length > 1 ? validArticles.slice(1, 3) : [];

  return (
    <section className="space-y-8">
      {mainArticle.map((article, index) => (
        <Link to={`/news/${index}`} key={index}>
          <div className="space-y-4">
            <div className="space-y-4">
              <h1 className="font-serif text-3xl font-bold leading-tight md:text-4xl">
                {article.title}
              </h1>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={article.urlToImage || "/placeholder.svg"}
                alt={article.title}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-muted-foreground">{article.content}</p>
          </div>
        </Link>
      ))}
      <div className="grid gap-6 md:grid-cols-2">
        {restArticles.map((article, index) => (
          <Link to={`/news/${index + 1}`} key={index}>
            <div className="space-y-4 border-l-2 border-destructive pl-4">
              <h2 className="font-serif text-xl font-semibold">{article.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticle;
