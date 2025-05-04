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

async function selic(request, response) {
  try {
    const maxAttempts = 3;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const apiKey = apiKeys[currentApiKeyIndex];
      currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;

      const axiosResponse = await axios.get(`https://api.hgbrasil.com/finance/taxes`, {
        params: {
          key: apiKey,
        }
      });

      const { results } = axiosResponse.data;

      if (axiosResponse.status === 200) {
        const simplifiedData = {
          date: results[0].date,
          cdi: results[0].cdi,
          selic: results[0].selic,
          dailyFactor: results[0].daily_factor,
          selicDaily: results[0].selic_daily,
          cdiDaily: results[0].cdi_daily,
        };

        response.setHeader('Vercel-CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('Cache-Control', `max-age=${cacheAge}`);

        return response.status(200).json(simplifiedData);
      } else if (axiosResponse.status === 403) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return response.status(403).json({ error: "Maximum number of attempts reached" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}

export default selic;
