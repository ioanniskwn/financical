interface News {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  author: string;
  content: string;
  publishedAt: string;
}

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export async function fetchCountryNews() {
  const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${API_KEY}`;

  try {
    const response = await fetch(NEWS_API_URL);
    const data: { articles: Partial<News>[]; status: string } = await response.json();

    if (data.status !== "ok") throw new Error("Failed to fetch news");

    // ✅ Ensure all required fields exist, providing fallback values
    const validArticles: News[] = data.articles
      .filter((article) => article.urlToImage && !article.urlToImage.includes("default.jpg") && !article.urlToImage.includes("no-image.png"))
      .map((article) => ({
        title: article.title || "No Title",
        description: article.description || "No description available",
        url: article.url || "#",
        urlToImage: article.urlToImage || "",
        author: article.author || "Unknown",
        content: article.content || "Content not available",
        publishedAt: article.publishedAt || "Unknown date",
      }));

    return { articles: validArticles };
  } catch (error) {
    console.error("❌ News Fetch Error:", error);
    throw error;
  }
}

