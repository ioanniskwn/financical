export async function fetchCountryNews() {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  if (!API_KEY) {
    console.error("❌ Missing API Key: Please check your .env file");
    return { articles: [] };
  }

  const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${API_KEY}`;

  try {
    const response = await fetch(NEWS_API_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0", // ✅ Required by some APIs to avoid 426 error
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== "ok") throw new Error("Failed to fetch news");

    return { articles: data.articles || [] };
  } catch (error) {
    console.error("❌ News Fetch Error:", error);
    return { articles: [] };
  }
}