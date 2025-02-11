import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // ✅ Use environment variable
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=${API_KEY}`;

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
}

const NewsList: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ✅ Function to Fetch News
  const fetchLatestNews = async () => {
    try {
      const response = await fetch(NEWS_API_URL);
      const data = await response.json();

      if (data.status !== "ok") throw new Error("Failed to fetch news");

      // ✅ Filter out articles without images
      const validArticles = data.articles.filter(
        (article: NewsArticle) => article.urlToImage && article.title
      );

      setArticles(validArticles.slice(0, 10)); // Show latest 10 news items
      setError(null); // Reset errors if successful
    } catch (err) {
      console.error("News Fetch Error:", err);
      setError("Failed to load news. Please try again later.");
    }
  };

  // ✅ Fetch news every 30 seconds
  useEffect(() => {
    fetchLatestNews();
    const interval = setInterval(fetchLatestNews, 30000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Live News Updates</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-md">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 object-cover rounded-md"
                onError={(e) => e.currentTarget.parentElement?.remove()} // ✅ Remove if image fails to load
              />
            )}
            <h3 className="text-lg font-bold mt-2">{article.title}</h3>
            <p className="text-gray-700 text-sm">
              {article.description || "No description available."}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline block mt-2"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
