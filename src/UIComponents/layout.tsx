import { Outlet, useLocation } from "react-router-dom";
import { SiteHeader } from "./site-header";
import { MainNav } from "./main-nav";
import { Footer } from "./footer";
import { User } from "@supabase/supabase-js";
import { ForexRates } from "./forex-rates";
import { CryptoTable } from "./cryptoTable";
import ScrollToTop from "@/helper/scroll-to-top";
import { useCryptoData } from "@/hooks/useCryptoData";
import { useCurrencyRate } from "@/hooks/useCurrencyRate";

const Layout = ({ user }: { user: User | null }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { data: cryptoData } = useCryptoData();
  const { data: exchangeRates } = useCurrencyRate();

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <SiteHeader user={user} />
      <MainNav />

      <main className="min-h-screen bg-background py-8">
        <div
          className={`container mx-auto px-4  ${
            isHomePage
              ? "grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-20 px-4"
              : ""
          }`}
        >
          <div className="space-y-8">
            <Outlet />{" "}
            {/* This will render the page content based on the route */}
          </div>
          <div className="space-y-6 ">
            {location.pathname === "/" && (
              <ForexRates
                exchangeRate={
                  exchangeRates?.usd || { gbp: 0, jpy: 0, aud: 0, eur: 0 }
                }
              />
            )}
            {/* Additional right column components can go here */}
          </div>
        </div>
        {location.pathname === "/" && (
          <CryptoTable coin={cryptoData?.data || []} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
