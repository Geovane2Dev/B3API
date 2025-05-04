import axios from 'axios';

const cacheAge = process.env.CacheAge || '7200';

async function quote(request, response) {
  try {
    const { id } = request.query;

    if (!id) {
      console.log("Response status: 400, ID is missing");
      return response.status(400).json({ error: 'ID is missing' });
    }

    const availableStocksUrl = `${process.env.URL}/api/quote/available`;
    const availableStocksResponse = await axios.get(availableStocksUrl);
    const availableStocks = availableStocksResponse.data.available;

    if (typeof id !== 'string' || !availableStocks.includes(id.toUpperCase())) {
      console.log("Response status: 400, Invalid input");
      return response.status(400).json({
        error: 'Invalid input. Stock ID must be a string and should be in the available stocks list.',
      });
    }

    const axiosResponse = await axios.get(`https://brapi.dev/api/quote/${id}`, {
      params: {
        token: process.env.TOKEN,
        range: "3mo",
        interval: "1d"
      },
    });

    const {
      currency,
      marketCap,
      shortName: name,
      longName,
      regularMarketPrice: price,
      regularMarketDayRange: dayRange,
      symbol,
      ...restData
    } = axiosResponse.data.results[0];

    const simplifiedData = {
      currency,
      marketCap,
      name,
      longName,
      price,
      dayRange,
      symbol,
      ...restData,
    };

    response.setHeader('Vercel-CDN-Cache-Control', `max-age=${cacheAge}`);
    response.setHeader('CDN-Cache-Control', `max-age=${cacheAge}`);
    response.setHeader('Cache-Control', `max-age=${cacheAge}`);

    console.log("Response status: 200, Data:", simplifiedData);
    return response.status(200).json(simplifiedData);
  } catch (error) {
    console.error("Error in /api/quote/[id]:", error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}

export default quote;
