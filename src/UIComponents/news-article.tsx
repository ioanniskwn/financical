import { Badge } from "@/components/ui/badge";
import { calculateTimeFromNow } from "@/helper/dateCalculator";
import { News } from "@/types/news";
import React from "react";
import { Link } from "react-router-dom";

interface NewsArticleProps {
  articles: News[];
}

export const NewsArticle: React.FC<NewsArticleProps> = ({ articles }) => {
  const mainArticle = articles.slice(0, 1); // First article or empty if none
  const restArticles = articles.slice(1, 3); // Up to two more articles
  const limitedArticles = articles.slice(4, 8); // Up to two more from index 4

  // console.log(articles);
  // console.log("rest", restArticles);
  // console.log("limited", limitedArticles);
  return (
    <>
      <section className="space-y-8">
        {mainArticle.map((article, index) => (
          <Link to={`/news/${index}`} key={index}>
            <div key={index} className="space-y-4">
              <div className="space-y-4">
                <Badge
                  variant="destructive"
                  className="rounded-none text-white"
                ></Badge>
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
              <div
                key={index}
                className="space-y-4 border-l-2 border-destructive pl-4"
              >
                <h2 className="font-serif text-xl font-semibold">
                  {article.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <span className="h-2 w-2 rounded-full bg-destructive blink" />
                  {calculateTimeFromNow(article.publishedAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
    </>
  );
};
