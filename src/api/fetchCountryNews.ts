// ✅ Define the correct TypeScript interface for NewsArticle
interface NewsArticle {
  source: { name: string }; // ✅ Added source name
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  author?: string;
  content?: string;
  publishedAt?: string;
}

// ✅ Ensure the API key is loaded correctly
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

if (!API_KEY) {
  console.error("❌ ERROR: Missing API Key. Check .env file or Vercel settings.");
}

export async function fetchCountryNews(): Promise<{ articles: NewsArticle[] }> {
  const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${API_KEY}`;

  try {
    const response = await fetch(NEWS_API_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0", // ✅ Prevents 426 errors
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: { articles: NewsArticle[]; status: string } = await response.json();

    if (data.status !== "ok") {
      throw new Error("News API responded with an error");
    }

    // ✅ Filter out invalid articles (without images)
    const validArticles = data.articles.filter(
      (article: NewsArticle) =>
        article.urlToImage &&
        !article.urlToImage.includes("default.jpg") &&
        !article.urlToImage.includes("no-image.png")
    );

    return { articles: validArticles };
  } catch (error) {
    console.error("❌ News Fetch Error:", error);
    return { articles: [] }; // ✅ Always return an array to prevent crashes
  }
}
