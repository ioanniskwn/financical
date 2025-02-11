import { Card } from "@/components/ui/card";
import { USD } from "@/types/currency";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface ExchangeRateProps {
  exchangeRate: USD;
}

export const ForexRates: React.FC<ExchangeRateProps> = ({ exchangeRate }) => {
  // Sample data with more details
  const forexRates = [
    { pair: "USD/GBP", value: exchangeRate.gbp, previousClose: 0.8032 },
    { pair: "USD/JPY", value: exchangeRate.jpy, previousClose: 155.1 },
    { pair: "USD/AUD", value: exchangeRate.aud, previousClose: 1.61 },
    { pair: "USD/EUR", value: exchangeRate.eur, previousClose: 0.9705 },
  ];

  return (
    <div className="top-8">
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold">Forex Rates</h2>
            <div className="flex items-center gap-2 text-sm text-destructive">
              <span className="h-2 w-2 rounded-full bg-destructive blink" />
              Live
            </div>
          </div>
          <div className="space-y-2">
            {forexRates.map((rate) => {
              const change =
                ((rate.value - rate.previousClose) / rate.previousClose) * 100;
              return (
                <div
                  key={rate.pair}
                  className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <div className="space-y-1">
                    <span className="font-medium">{rate.pair}</span>
                    <div className="text-sm text-muted-foreground">
                      Previous: {rate.previousClose.toFixed(4)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{rate.value.toFixed(4)}</div>
                    <div
                      className={`flex items-center justify-end gap-1 text-sm ${
                        change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {change >= 0 ? (
                        <ArrowUpIcon className="h-3 w-3" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3" />
                      )}
                      {Math.abs(change).toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};
