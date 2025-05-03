import axios from 'axios';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';

export default async function handler(request, response) {
    let { ticket } = request.query;

    try {
        const { data: { data: stockList } } = await axios.get(`${process.env.URL}/api/fundamentus/available`);

        if (typeof ticket !== 'string') {
            return response.status(400).json({ error: 'Invalid input. Ticket must be a string.' });
        }

        ticket = ticket.toUpperCase();

        const isTicketAvailable = stockList.some(stock => stock.ticker === ticket);

        if (!isTicketAvailable) {
            return response.status(400).json({ error: `Ticket not found in the available list. Go to ${process.env.URL}/api/fundamentus/available` });
        }

        const responseAxios = await axios.post(
            `https://www.fundamentus.com.br/detalhes.php?papel=${ticket}`,
            {},
            {
                responseType: 'arraybuffer',
                headers: {
                    'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:2.2) Gecko/20110201',
                    'Accept': 'text/html, text/plain, text/css, text/sgml, */*;q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
            }
        );

        const decodedResponse = iconv.decode(Buffer.from(responseAxios.data), 'latin1');

        const $ = cheerio.load(decodedResponse, { decodeEntities: false });

        const removeNewLines = (str) => str.replace(/\s+/g, ' ').trim();

        const data = {
            papel: removeNewLines($('table:nth-child(2) tr:nth-child(1) td:nth-child(2)').text()),
            tipo: removeNewLines($('table:nth-child(2) tr:nth-child(2) td:nth-child(2)').text()),
            empresa: removeNewLines($('table:nth-child(2) tr:nth-child(3) td:nth-child(2)').text()),
            setor: removeNewLines($('table:nth-child(2) tr:nth-child(4) td:nth-child(2)').text()),
            subsetor: removeNewLines($('table:nth-child(2) tr:nth-child(5) td:nth-child(2)').text()),
            cotacao: removeNewLines($('table:nth-child(2) tr:nth-child(1) td:nth-child(4)').text()),
            data_ult_cot: removeNewLines($('table:nth-child(2) tr:nth-child(2) td:nth-child(4)').text()),
            min_52_sem: removeNewLines($('table:nth-child(2) tr:nth-child(3) td:nth-child(4)').text()),
            max_52_sem: removeNewLines($('table:nth-child(2) tr:nth-child(4) td:nth-child(4)').text()),
            vol_med_2m: removeNewLines($('table:nth-child(2) tr:nth-child(5) td:nth-child(4)').text()),
            valor_mercado: removeNewLines($('table:nth-child(3) tr:nth-child(1) td:nth-child(2)').text()),
            valor_firma: removeNewLines($('table:nth-child(3) tr:nth-child(2) td:nth-child(2)').text()),
            ult_balanco_processado: removeNewLines($('table:nth-child(3) tr:nth-child(1) td:nth-child(4)').text()),
            nro_acoes: removeNewLines($('table:nth-child(3) tr:nth-child(2) td:nth-child(4)').text()),
            pl: removeNewLines($('table:nth-child(4) tr:nth-child(2) td:nth-child(4)').text()),
            p_vp: removeNewLines($('table:nth-child(4) tr:nth-child(3) td:nth-child(4)').text()),
            p_ebit: removeNewLines($('table:nth-child(4) tr:nth-child(4) td:nth-child(4)').text()),
            psr: removeNewLines($('table:nth-child(4) tr:nth-child(5) td:nth-child(4)').text()),
            p_ativos: removeNewLines($('table:nth-child(4) tr:nth-child(6) td:nth-child(4)').text()),
            p_cap_giro: removeNewLines($('table:nth-child(4) tr:nth-child(7) td:nth-child(4)').text()),
            p_ativ_circ_liq: removeNewLines($('table:nth-child(4) tr:nth-child(8) td:nth-child(4)').text()),
            evebitda: removeNewLines($('table:nth-child(4) tr:nth-child(10) td:nth-child(4)').text()),
            evebit: removeNewLines($('table:nth-child(4) tr:nth-child(11) td:nth-child(4)').text()),
            cres_rec_5a: removeNewLines($('table:nth-child(4) tr:nth-child(12) td:nth-child(4)').text()),
            lpa: removeNewLines($('table:nth-child(4) tr:nth-child(2) td:nth-child(6)').text()),
            vpa: removeNewLines($('table:nth-child(4) tr:nth-child(3) td:nth-child(6)').text()),
            marg_bruta: removeNewLines($('table:nth-child(4) tr:nth-child(4) td:nth-child(6)').text()),
            marg_ebit: removeNewLines($('table:nth-child(4) tr:nth-child(5) td:nth-child(6)').text()),
            marg_liquida: removeNewLines($('table:nth-child(4) tr:nth-child(6) td:nth-child(6)').text()),
            ebit_ativo: removeNewLines($('table:nth-child(4) tr:nth-child(7) td:nth-child(6)').text()),
            roic: removeNewLines($('table:nth-child(4) tr:nth-child(8) td:nth-child(6)').text()),
            roe: removeNewLines($('table:nth-child(4) tr:nth-child(9) td:nth-child(6)').text()),
            liquidez_corr: removeNewLines($('table:nth-child(4) tr:nth-child(10) td:nth-child(6)').text()),
            div_br_patrim: removeNewLines($('table:nth-child(4) tr:nth-child(11) td:nth-child(6)').text()),
            giro_ativos: removeNewLines($('table:nth-child(4) tr:nth-child(12) td:nth-child(6)').text()),
            ativo: removeNewLines($('table:nth-child(5) tr:nth-child(2) td:nth-child(2)').text()),
            disponibilidades: removeNewLines($('table:nth-child(5) tr:nth-child(3) td:nth-child(2)').text()),
            ativo_circulante: removeNewLines($('table:nth-child(5) tr:nth-child(4) td:nth-child(2)')?.text()),
            div_bruta: removeNewLines($('table:nth-child(5) tr:nth-child(2) td:nth-child(4)').text()),
            div_liquida: removeNewLines($('table:nth-child(5) tr:nth-child(3) td:nth-child(4)').text()),
            patrim_liq: removeNewLines($('table:nth-child(5) tr:nth-child(4) td:nth-child(4)')?.text()),
            receita_liquida_12_meses: removeNewLines($('table:nth-child(6) tr:nth-child(3) td:nth-child(2)').text()),
            ebit_12_meses: removeNewLines($('table:nth-child(6) tr:nth-child(4) td:nth-child(2)').text()),
            lucro_liquido_12_meses: removeNewLines($('table:nth-child(6) tr:nth-child(5) td:nth-child(2)').text()),
            receita_liquida_3_meses: removeNewLines($('table:nth-child(6) tr:nth-child(3) td:nth-child(4)').text()),
            ebit_3_meses: removeNewLines($('table:nth-child(6) tr:nth-child(4) td:nth-child(4)').text()),
            lucro_liquido_3_meses: removeNewLines($('table:nth-child(6) tr:nth-child(5) td:nth-child(4)').text()),
        };

        // Cache da Vercel
        response.setHeader('Vercel-CDN-Cache-Control', 'max-age=86400');
        response.setHeader('CDN-Cache-Control', 'max-age=86400');
        response.setHeader('Cache-Control', 'max-age=86400');

        response.status(200).json(data);
    } catch (error) {
        console.error("Error in /api/fundamentus/[ticket]:", error);
        response.status(500).json({ error: 'Internal server error' });
    }
}
