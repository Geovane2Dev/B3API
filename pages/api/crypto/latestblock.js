import axios from 'axios';

const cacheAge = process.env.CacheAge || '7200';

export default async function handler(request, response) {
    try {
        const cryptoResponse = await axios.get(`https://blockchain.info/latestblock`);

        response.setHeader('Vercel-CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('Cache-Control', `max-age=${cacheAge}`);

        const data = cryptoResponse.data;
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal server error" });
    }
}
