import axios from 'axios';

const cacheAge = process.env.CacheAge || '7200';

export default async function handler(request, response) {
  try {
    let { coin } = request.query;
    const apiKey = process.env.APIKEYCRYPTO;

    if (typeof coin !== 'string') {
      throw new Error('Coin parameter must be a string');
    }

    coin = coin.toLowerCase();

    const cryptoResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`, {
      params: {
        x_cg_demo_api_key: apiKey
      },
    });

    response.setHeader('Vercel-CDN-Cache-Control', `max-age=${cacheAge}`);
    response.setHeader('CDN-Cache-Control', `max-age=${cacheAge}`);
    response.setHeader('Cache-Control', `max-age=${cacheAge}`);

    const data = cryptoResponse.data;
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
}