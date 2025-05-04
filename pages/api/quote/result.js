import axios from 'axios';

const cacheAge = process.env.CacheAge || '7200';

export default async (request, response) => {
  try {
    // Faz uma solicitação para obter os dados de ações
    const { data } = await axios.post('https://brapi.dev/api/quote/list');

    //Cache da Vercel
    response.setHeader('Vercel-CDN-Cache-Control', `max-age=${cacheAge}`);
    response.setHeader('CDN-Cache-Control', `max-age=${cacheAge}`);
    response.setHeader('Cache-Control', `max-age=${cacheAge}`);

    // Envie os dados extraídos como resposta
    response.status(200).json({ data });
  } catch (error) {
    // Trata possíveis erros
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
