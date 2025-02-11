import axios from "axios";

export const fetchExchangeRates = async () => {
  try {
    const { data } = await axios.get(
      "https://latest.currency-api.pages.dev/v1/currencies/usd.json"
    );
    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
};
