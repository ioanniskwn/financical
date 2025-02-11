export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatPercent = (num: number) => {
  const color = num >= 0 ? "text-green-500" : "text-red-500";
  return (
    <span className={color}>
      {num >= 0 ? "↑" : "↓"} {Math.abs(num).toFixed(2)}%
    </span>
  );
};

export const formatMarketCap = (num: number) => {
  if (num >= 1e12) {
    return `$${(num / 1e12).toFixed(2)}T`;
  }
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`;
  }
  return formatNumber(num);
};
