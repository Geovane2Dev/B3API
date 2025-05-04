import axios from 'axios';

const apiKeys = [
  process.env.APIKEYHG1,
  process.env.APIKEYHG2,
  process.env.APIKEYHG3,
  process.env.APIKEYHG4,
  process.env.APIKEYHG5,
  process.env.APIKEYHG6,
  process.env.APIKEYHG7,
];
let currentApiKeyIndex = 0;

const cacheAge = process.env.CacheAge || '7200';

async function quotations(request, response) {
  try {
    const maxAttempts = 3;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const apiKey = apiKeys[currentApiKeyIndex];
      currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;

      const axiosResponse = await axios.get("https://api.hgbrasil.com/finance/quotations", {
        params: {
          key: apiKey,
        }
      });

      const {
        results: {
          currencies,
          stocks,
          bitcoin,
        },
        execution_time,
        from_cache,
      } = axiosResponse.data;

      if (axiosResponse.status === 200) {
        // Inclua o Euro na seção de moedas
        const simplifiedCurrencies = {
          ...currencies.USD,
          EUR: currencies.EUR,
        };

        // Simplifique os nomes dos campos
        const simplifiedData = {
          currencies: simplifiedCurrencies,
          stocks: {
            bovespa: stocks.IBOVESPA,
            ifix: stocks.IFIX,
            nasdaq: stocks.NASDAQ,
            dowJones: stocks.DOWJONES,
            cac: stocks.CAC,
            nikkei: stocks.NIKKEI,
          },
          bitcoin: {
            blockchainInfo: bitcoin.blockchain_info.last,
            coinbase: bitcoin.coinbase.last,
            bitstamp: bitcoin.bitstamp.last,
            foxbit: bitcoin.foxbit.last,
            mercadoBitcoin: bitcoin.mercadobitcoin.last,
          },
        };

        // Cache da Vercel
        response.setHeader('Vercel-CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('Cache-Control', `max-age=${cacheAge}`);

        // Retorna em JSON
        return response.json(simplifiedData);
      } else if (axiosResponse.status === 403) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return response.status(403).json({ error: "Maximum number of attempts reached" });
  } catch (error) {
    // Responda em caso de erro
    console.error(error);
    return response.status(500).json({ error: "Internal server error" });
  }
}

export default quotations;
