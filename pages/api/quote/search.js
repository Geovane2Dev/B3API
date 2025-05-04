import axios from 'axios';

const cacheAge = process.env.CacheAge || '7200';

export default async (request, response) => {
    try {
        const apiUrl = `${process.env.URL}/api/quote/result`;

        const [allDataResponse, { query }] = await Promise.all([
            axios.get(apiUrl),
            request.query
        ]);

        const allData = allDataResponse.data.data;

        if (!query) {
            console.error('Query parameter "query" is required');
            return response.status(400).json({ error: 'Query parameter "query" is required' });
        }

        const queryUpperCase = query.toUpperCase();

        const filteredData = {
            stocks: allData.stocks.filter(stock => stock.stock.toUpperCase().includes(queryUpperCase) || stock.name.toUpperCase().includes(queryUpperCase)),
            indexes: allData.indexes.filter(index => index.stock.toUpperCase().includes(queryUpperCase) || index.name.toUpperCase().includes(queryUpperCase)),
        };

        response.setHeader('Vercel-CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('CDN-Cache-Control', `max-age=${cacheAge}`);
        response.setHeader('Cache-Control', `max-age=${cacheAge}`);

        console.log('Response status: 200');
        response.status(200).json({ data: filteredData });
    } catch (error) {
        console.error('Error in /api/quote/search:', error);

        if (error.response) {
            console.error('Error response status:', error.response.status);
            response.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            console.error('No response from the server');
            response.status(500).json({ error: 'No response from the server. Please try again.' });
        } else {
            console.error('Unexpected error occurred');
            response.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
        }
    }
};
