const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export async function fetchCountryNews() {
  const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${API_KEY}`;

  try {
    const response = await fetch(NEWS_API_URL);
    const data = await response.json();

    if (data.status !== "ok") throw new Error("Failed to fetch news");

    // ✅ Filter out articles that have no image or invalid placeholders
    const validArticles = data.articles.filter(article =>
      article.urlToImage &&
      !article.urlToImage.includes("default.jpg") &&
      !article.urlToImage.includes("no-image.png")
    );

    return { articles: validArticles };
  } catch (error) {
    console.error("❌ News Fetch Error:", error);
    throw error;
  }
}
