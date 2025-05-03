import axios from 'axios';

export default function handler(req, res) {
    let { ticket } = req.query;

    if (typeof ticket !== 'string') {
        return res.status(400).json({ error: 'Invalid input. Ticket must be a string.' });
    }

    ticket = ticket.toUpperCase();

    axios.get(`${process.env.URL}/api/fundamentus/available`)
        .then(({ data: { data: stockList } }) => {
            const stockData = stockList.find(stock => stock.ticker === ticket);

            if (!stockData) {
                return res.status(400).json({ error: `Ticket not found in the available list. Go to ${process.env.URL}/api/fundamentus/available` });
            }

            const validatedTicket = stockData.ticker; // Use the validated ticker from stockList

            return Promise.all([
                axios.get(`${process.env.URL}/api/fundamentus/${validatedTicket}`),
                axios.get(`${process.env.URL}/api/quote/${validatedTicket}`)
            ]).then(([fundamentusData, quoteData]) => {
                const combinedData = {
                    ticket: ticket,
                    fundamentus: fundamentusData.data,
                    quote: quoteData.data,
                    stockData: stockData,
                };

                const cacheControlHeader = 'max-age=86400';
                res.setHeader('Vercel-CDN-Cache-Control', cacheControlHeader);
                res.setHeader('CDN-Cache-Control', cacheControlHeader);
                res.setHeader('Cache-Control', cacheControlHeader);

                return res.status(200).json(combinedData);
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        });
}
