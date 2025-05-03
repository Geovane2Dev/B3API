import axios from 'axios';

export default async (request, response) => {
    try {
        const [availableStocksResponse, { query }] = await Promise.all([
            axios.get(`${process.env.URL}/api/fundamentus/available`),
            request.query
        ]);

        const stockList = availableStocksResponse.data.data;

        if (!query) {
            console.log('Query parameter "query" is required');
            return response.status(400).json({ error: 'Query parameter "query" is required' });
        }

        const queryUpperCase = query.toUpperCase();

        const stockIndex = {};
        for (const stock of stockList) {
            stockIndex[stock.ticker] = true;
        }

        const filteredStocks = stockList.filter(stock => 
            (stock.ticker.includes(queryUpperCase) || stock.name.toUpperCase().includes(queryUpperCase)) && stockIndex[stock.ticker]
        );

        response.setHeader('Vercel-CDN-Cache-Control', 'max-age=86400');
        response.setHeader('CDN-Cache-Control', 'max-age=86400');
        response.setHeader('Cache-Control', 'max-age=86400');

        console.log('Response status: 200');
        response.status(200).json({ data: filteredStocks });
    } catch (error) {
        console.error('Error in /api/fundamentus/search:', error);

        if (error.response) {
            console.log(`Response status: ${error.response.status}`);
            response.status(error.response.status).json({ error: "Internal server error" });
        } else if (error.request) {
            console.log('Response status: 500');
            response.status(500).json({ error: 'No response from the server. Please try again.' });
        } else {
            console.log('Response status: 500');
            response.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
        }
    }
};
