import axios from "axios";

const API_KEY = import.meta.env.VITE_COINBASE_API;
const BASE_URL = "/api/v1";

export const fetchCryptoData = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${API_KEY}`
  );
  return data;
};
