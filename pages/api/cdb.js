import axios from 'axios';

const cacheAge = process.env.CacheAge || '7200';

export default async (req, res) => {
  try {
    // URL do env
    const URL = process.env.URL;

    // Obter dados da API do CDI
    const cdiResponse = await axios.get(`${URL}/api/quote/taxes`);
    const cdiData = cdiResponse.data;
    const cdiRateAnnual = cdiData.cdi;

    // Obter parâmetros da requisição
    const { principal, period, cdiPercentage } = req.query;

    // Validar parâmetros
    if (!principal || !period || !cdiPercentage) {
      return res.status(400).json({ error: 'Invalid parameters. Make sure to provide principal, period, and cdiPercentage.' });
    }

    // Calcular o valor do CDB conforme a fórmula correta
    const initialPrincipal = parseFloat(principal);
    const periodMonths = parseInt(period);
    const cdiPercentageDecimal = parseFloat(cdiPercentage) / 100; // Convert percentage to decimal

    // Ajustar a taxa CDI anual para um formato mensal
    const cdiRateMonthly = Math.pow(1 + cdiRateAnnual / 100, 1 / 12) - 1;

    // Calcular apenas o rendimento, sem incluir o capital
    const interest = initialPrincipal * (Math.pow(1 + cdiRateMonthly * cdiPercentageDecimal, periodMonths) - 1);

    // Calcular o imposto de renda sobre os rendimentos
    let incomeTaxRate;
    if (periodMonths <= 180) {
      incomeTaxRate = 0.225;
    } else if (periodMonths <= 360) {
      incomeTaxRate = 0.2;
    } else if (periodMonths <= 720) {
      incomeTaxRate = 0.175;
    } else {
      incomeTaxRate = 0.15;
    }

    // Calcular o valor total (capital + juro com desconto de imposto de renda)
    const totalValue = initialPrincipal + interest * (1 - incomeTaxRate);

    // Set cache headers
    res.setHeader('Vercel-CDN-Cache-Control', `max-age=${cacheAge}`);
    res.setHeader('CDN-Cache-Control', `max-age=${cacheAge}`);
    res.setHeader('Cache-Control', `max-age=${cacheAge}`);

    // Responder com os dados do CDB calculados
    res.status(200).json({
      principal: initialPrincipal.toFixed(2),
      period: periodMonths,
      cdiPercentage: cdiPercentageDecimal,
      interest: interest.toFixed(2),
      incomeTaxRate: incomeTaxRate,
      totalValue: totalValue.toFixed(2),
    });
  } catch (error) {
    console.error('Error calculating total CDB value:', error);

    // Verificar o tipo de erro e responder adequadamente
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      res.status(500).json({ error: 'No response from the server. Please try again.' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
    }
  }
};
