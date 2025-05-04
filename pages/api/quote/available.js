import axios from 'axios';

const cacheAge = process.env.CacheAge || '7200';

async function apiAvailable(request, response) {
    try {
        // Usa o get para puxar dados da API
        const axiosResponse = await axios.get(`https://brapi.dev/api/available`, {});

        // Salva os dados da resposta da API
        const data = axiosResponse.data;

        // Trata os dados conforme necessário
        const processedData = {
            available: [...data.indexes, ...data.stocks],
        };

        // Cache da Vercel
        response.setHeader('Vercel-CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('Cache-Control', `max-age=${cacheAge}`);

        // Responde com a resposta em JSON
        return response.json(processedData);
    } catch (error) {
        // Responde com o erro
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}

export default apiAvailable;
