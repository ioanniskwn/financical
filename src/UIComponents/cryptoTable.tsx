import {
  formatMarketCap,
  formatNumber,
  formatPercent,
} from "@/helper/cryptoFunctions";
import { Coin } from "@/types/crypto";

interface CryptoTableProps {
  coin: Coin[];
}

export const CryptoTable: React.FC<CryptoTableProps> = ({ coin }) => {
  const topCoins = coin.slice(0, 4);
  return (
    <div className="w-full overflow-x-auto mt-10">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-4 px-4 text-left">#</th>
            <th className="py-4 px-4 text-left">Name</th>
            <th className="py-4 px-4 text-right">Price</th>
            <th className="py-4 px-4 text-right">1h %</th>
            <th className="py-4 px-4 text-right">24h %</th>
            <th className="py-4 px-4 text-right">7d %</th>
            <th className="py-4 px-4 text-right">Market Cap</th>
            <th className="py-4 px-4 text-right">Volume(24h)</th>
          </tr>
        </thead>
        <tbody>
          {topCoins.map((crypto, index) => (
            <tr
              key={crypto.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-4 px-4">{index + 1}</td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                    alt={crypto.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span>{crypto.name}</span>
                  <span className="text-gray-500">{crypto.symbol}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-right">
                {formatNumber(crypto.quote.USD.price)}
              </td>
              <td className="py-4 px-4 text-right">
                {formatPercent(crypto.quote.USD.percent_change_1h)}
              </td>
              <td className="py-4 px-4 text-right">
                {formatPercent(crypto.quote.USD.percent_change_24h)}
              </td>
              <td className="py-4 px-4 text-right">
                {formatPercent(crypto.quote.USD.percent_change_7d)}
              </td>
              <td className="py-4 px-4 text-right">
                {formatMarketCap(crypto.quote.USD.market_cap)}
              </td>
              <td className="py-4 px-4 text-right">
                {formatMarketCap(crypto.quote.USD.volume_24h)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
