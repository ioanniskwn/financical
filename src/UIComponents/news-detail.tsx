"use client";

import { useParams } from "react-router-dom";
import { CalendarDays, ExternalLink, Share2, ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { News } from "@/types/news";

interface NewsDetailProps {
  articles: News[];
}

const NewsDetail: React.FC<NewsDetailProps> = ({ articles }) => {
  const { id } = useParams();
  const article = articles[Number.parseInt(id || "")];

  if (!article) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600">
          Article not found
        </h1>
      </div>
    );
  }

  const formattedDate = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : "Date unavailable";

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-tight mb-4">
          {article.title}
        </h1>
        <div className="flex items-center gap-6 text-gray-600 mb-6">
          {article.author && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                {article.author[0].toUpperCase()}
              </div>
              <span className="font-medium">{article.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          {/* {article.readTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
          )} */}
        </div>
      </header>

      {/* Featured Image */}
      {article.urlToImage && (
        <figure className="mb-8">
          <img
            src={article.urlToImage || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-[28rem] object-cover rounded-lg shadow-lg"
          />
          {/* {article.imageCaption && (
            <figcaption className="mt-2 text-sm text-gray-500 text-center">
              {article.imageCaption}
            </figcaption>
          )} */}
        </figure>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-8">
        {/* Description */}
        {article.description && (
          <p className="text-xl text-gray-600 mb-6 font-medium leading-relaxed">
            {article.description}
          </p>
        )}

        {/* Main Content */}
        <div className="text-lg leading-relaxed space-y-6">
          {article.content ? (
            <p>{article.content}</p>
          ) : (
            <p className="text-gray-500 italic">No content available.</p>
          )}
        </div>
      </div>

      {/* Article Footer */}
      <footer className="border-t border-gray-200 pt-6 mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ThumbsUp className="w-5 h-5" />
              <span>Like</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Read full article
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </article>
  );
};

export default NewsDetail;
