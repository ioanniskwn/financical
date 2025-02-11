import { useNewsCountry } from "./hooks/useNewsCountry";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import {
  NewsDetail,
  Layout,
  TopStories,
  ProtectedRoute,
  WorldPage,
  USPage,
  FeaturedArticle,
  MarketPage,
  ClimatePage,
} from "./UIComponents";
import MarketInfoBar from "@/components/MarketInfoBar";

function App() {
  const { data: topHeadlineNews, error, isLoading } = useNewsCountry();
  const { user } = useAuth();

  return (
    <>
      <MarketInfoBar />

      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route
            index
            element={
              <>
                {isLoading && <p className="text-gray-500">Loading latest news...</p>}
                {error && <p className="text-red-500">{error.message}</p>}
                <FeaturedArticle articles={topHeadlineNews?.articles || []} />
                <TopStories articles={topHeadlineNews?.articles || []} />
              </>
            }
          />
          <Route
            path="news/:id"
            element={<NewsDetail articles={topHeadlineNews?.articles || []} />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" />
          </Route>
          <Route path="/world" element={<WorldPage />} />
          <Route path="/us" element={<USPage />} />
          <Route path="/markets" element={<MarketPage />} />
          <Route path="/climate" element={<ClimatePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
