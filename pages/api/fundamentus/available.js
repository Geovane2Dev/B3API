import axios from 'axios';
import iconv from 'iconv-lite';

export default async function handler(req, res) {
  try {
    //Envia o request
    const response = await axios.post(
      `https://www.fundamentus.com.br/script/cmplte.php`,
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

  //Trata os dados em utf-8
    const html = iconv.decode(response.data, 'iso-8859-1');
    const match = html.match(/var tokens = (\[.*?\]);/s);

    //Corrige e organiza os dados
    if (match && match[1]) {
      const rawData = match[1].trim();

      const cleanedData = rawData.replace(/\[|\]/g, '').replace(/'/g, '"');

      const dataArray = cleanedData.split(',"').reduce((acc, entry, index, array) => {
        if (index % 1 === 0) {
          let [ticker, name] = entry.trim().split('", "').map(item => item.replace(/"/g, '').replace(/^ - /, ''));
      
          if (index === 0) {
            ticker = ticker.replace(/\s/g, '');
          }
      
          acc.push({ ticker, name });
        }
        return acc;
      }, []);

      // Cache da Vercel
      res.setHeader('Vercel-CDN-Cache-Control', 'max-age=86400');
      res.setHeader('CDN-Cache-Control', 'max-age=86400');
      res.setHeader('Cache-Control', 'max-age=86400');

      //Responde com os dados
      res.status(200).json({ data: dataArray });
    } else {
      //Trata erros
      res.status(500).json({ error: 'Internal server error 1000' });
    }
  } catch (error) {
    //Trata erros
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
