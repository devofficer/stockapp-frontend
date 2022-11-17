import axios from 'axios';
/**
 * Fetching Exchange information from coingecko public api /exchanges
 *
 * @returns first ten of exchange list
 */
const fetchStockInfo = async (ticker: string) => {
  /* eslint-disable-next-line camelcase */
  return await axios.get(`/stock/${ticker}`);
}

export { fetchStockInfo }
