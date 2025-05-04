import axios from 'axios';

const cacheAge = process.env.CacheAge || '7200';

export default async function handler(request, response) {
    try {
        const apiKey = process.env.APIKEYCRYPTO;
        const coin = request.query.history;
        const days = request.query.days || '30';
        const interval = request.query.interval || 'daily';
        
        if (!coin) {
            return response.status(400).json({ error: "Missing 'history' parameter in query" });
        }

        const cryptoResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
            params: {
                vs_currency: 'usd',
                days: days,
                interval: interval,
            }
        });

        if (!cryptoResponse.data || !cryptoResponse.data.prices || cryptoResponse.data.prices.length === 0) {
            return response.status(404).json({ error: "No historical data found for this coin" });
        }

        const latestPrice = cryptoResponse.data.prices[cryptoResponse.data.prices.length - 1][1];
        const latestTimestamp = cryptoResponse.data.prices[cryptoResponse.data.prices.length - 1][0];

        const date = new Date(latestTimestamp);
        const formattedDate = date.toLocaleString();

        const processedData = {
            coin: coin,
            price: latestPrice,
            formattedDate: formattedDate,
            historicalData: cryptoResponse.data,
        };

        response.setHeader('Vercel-CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('Cache-Control', `max-age=${cacheAge}`);

        return response.status(200).json(processedData);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
