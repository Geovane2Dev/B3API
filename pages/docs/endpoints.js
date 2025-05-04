import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DocsMenu from '../../components/DocsMenu';
import { Container, Row, Col, Alert, Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Endpoints = () => {
  return (
    <div>
      <NextSeo
        title="B3API - Documentação dos Endpoints | Acesse Dados Financeiros Brasileiros em Tempo Real"
        description="Explore a documentação completa dos endpoints da B3API para acessar dados financeiros brasileiros em tempo real. Descubra como utilizar cada endpoint de forma eficiente e obtenha informações precisas para suas análises e aplicações."
        canonical="https://b3api.g2dev.me/docs/endpoints"
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://b3api.g2dev.me/docs/endpoints',
          site_name: 'B3API - Documentação dos Endpoints',
          title: 'B3API - Documentação dos Endpoints | Acesse Dados Financeiros Brasileiros em Tempo Real',
          description: 'Explore a documentação completa dos endpoints da B3API para acessar dados financeiros brasileiros em tempo real. Descubra como utilizar cada endpoint de forma eficiente e obtenha informações precisas para suas análises e aplicações.',
          images: [
            {
              url: 'https://b3api.me/B3API.png',
              width: 120,
              height: 120,
              alt: 'B3API Icon',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Navbar />

      <Container className="my-5">
        <Row>
          <Col md={3}>
            <DocsMenu />
          </Col>
          <Col md={9}>
            <Card className="bg-light rounded shadow-sm">
              <Card.Body>
                <h1 className="display-4 text-center mb-4">Endpoints da B3API</h1>

                <Alert variant="warning" className="text-center">
                  Devido ao alto volume de solicitações, implementamos um sistema de rate limit. Por favor, evite enviar solicitações em excesso.
                </Alert>

                <Card className="mt-4">
                  <Card.Body>
                    <h2 className="card-title text-center mb-4">Fundamentus</h2>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Buscar opções disponíveis:</strong> [GET/POST] <code>https://b3api.me/api/fundamentus/available</code>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Informações sobre os fundamentos da empresa:</strong> [GET/POST] <code>https://b3api.me/api/fundamentus/[TICKER]</code> (substitua [TICKER] por um item da API /api/fundamentus/available)
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Pesquisar por ticker:</strong> [GET/POST] <code>https://b3api.me/api/fundamentus/search?query=[QUERY]</code> (substitua [QUERY] por uma pesquisa, como PETR para resultados como PETR4 e PETR3)
                      </ListGroup.Item>
                    </ListGroup>
                    <div className="mt-3">
                      <strong>Exemplos:</strong>
                      <ListGroup>
                        <ListGroup.Item>
                          <Link href="https://b3api.me/api/fundamentus/PETR4" passHref target="_blank">https://b3api.me/api/fundamentus/PETR4</Link> - Retorna informações sobre os fundamentos da PETR4.
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Link href="https://b3api.me/api/fundamentus/search?query=PETR" passHref target="_blank">https://b3api.me/api/fundamentus/search?query=PETR</Link> - Pesquisa por "PETR" e retorna os resultados, o nome também pode ser usado para pesquisar.
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="mt-4">
                  <Card.Body>
                    <h2 className="card-title text-center mb-4">Quote</h2>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Buscar opções disponíveis:</strong> [GET/POST] <code>https://b3api.me/api/quote/available</code>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Retornar o CDI e SELIC:</strong> [GET/POST] <code>https://b3api.me/api/quote/taxes</code>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Pesquisar por ticker:</strong> [GET/POST] <code>https://b3api.me/api/quote/search?query=[QUERY]</code> (substitua [QUERY] por uma pesquisa, como ALP para resultados como ALPA4 e ALPK3)
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Retornar dados de uma ação específica:</strong> [GET/POST] <code>https://b3api.me/api/quote/[TICKER]</code>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Retornar todos os dados disponíveis de ações:</strong> [GET/POST] <code>https://b3api.me/api/quote/result</code>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Pesquisar por índice ou nome da empresa:</strong> [GET/POST] <code>https://b3api.me/api/quote/search?query=[QUERY]</code> (substitua [QUERY] pela pesquisa de índice ou nome)
                      </ListGroup.Item>
                    </ListGroup>
                    <div className="mt-3">
                      <strong>Exemplos:</strong>
                      <ListGroup>
                        <ListGroup.Item>
                          <Link href="https://b3api.me/api/quote/VALE3" passHref target="_blank">https://b3api.me/api/quote/VALE3</Link> - Retorna informações sobre a ação VALE3.
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Link href="https://b3api.me/api/quote/search?query=VALE" passHref target="_blank">https://b3api.me/api/quote/search?query=VALE</Link> - Pesquisa por "VALE" retornando resultados, incluindo dados sobre o setor, nome, etc.
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="mt-4">
                  <Card.Body>
                    <h2 className="card-title text-center mb-4">Dados de Fundamentus e Quote Juntos</h2>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Retorna dados de fundamentus e quote juntos de uma ação:</strong> [GET/POST] <code>https://b3api.me/api/all/[TICKER]</code>
                      </ListGroup.Item>
                    </ListGroup>
                    <div className="mt-3">
                      <strong>Exemplo:</strong>
                      <ListGroup>
                        <ListGroup.Item>
                          <Link href="https://b3api.me/api/all/VALE3" passHref target="_blank">https://b3api.me/api/all/VALE3</Link> - Retorna informações sobre a ação VALE3.
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="mt-4">
                  <Card.Body>
                    <h2 className="card-title text-center mb-4">Crypto</h2>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Retorna dados sobre uma criptomoeda específica:</strong> [GET/POST] <code>https://b3api.me/api/crypto/all/(COIN)</code> (substitua (COIN) pelo código da criptomoeda)
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Retorna todas as criptomoedas aceitas:</strong> [GET/POST] <code>https://b3api.me/api/crypto/all/coins</code>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Mostra informações sobre uma transação da blockchain pelo id:</strong> [GET/POST] <code>https://b3api.me/api/crypto/transaction/(TRANSACTION)</code> (substitua (TRANSACTION) pelo ID da transação)
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Retorna dados sobre uma carteira de criptomoedas:</strong> [GET/POST] <code>https://b3api.me/api/crypto/wallet/(WALLET)</code> (substitua (WALLET) pelo ID da carteira)
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Retorna o histórico de preço de uma criptomoeda:</strong> [GET/POST] <code>https://b3api.me/api/crypto/history/(COIN)</code> (substitua (COIN) pela criptomoeda)
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Retorna a maioria dos dados gerais sobre criptomoedas:</strong> [GET/POST] <code>https://b3api.me/api/crypto/all</code>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Retorna informações sobre o mercado global de criptomoedas:</strong> [GET/POST] <code>https://b3api.me/api/crypto/global</code>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Retorna dados dos últimos blocos minerados:</strong> [GET/POST] <code>https://b3api.me/api/crypto/latestblock</code>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Mostra as criptomoedas em alta no mercado:</strong> [GET/POST] <code>https://b3api.me/api/crypto/trending</code>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Mostra transações de criptomoedas não confirmadas/mineradas:</strong> [GET/POST] <code>https://b3api.me/api/crypto/unconfirmed-transactions</code>
                      </ListGroup.Item>
                    </ListGroup>
                    <div className="mt-3">
                      <strong>Exemplos:</strong>
                      <ListGroup>
                        <ListGroup.Item>
                          <Link href="https://b3api.me/api/crypto/all/bitcoin" passHref target="_blank">https://b3api.me/api/crypto/all/bitcoin</Link> - Retorna dados sobre a criptomoeda Bitcoin (BTC).
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Link href="https://b3api.me/api/crypto/wallet/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" passHref target="_blank">https://b3api.me/api/crypto/wallet/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</Link> - Retorna informações a carteira de criptomoedas.
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Link href="https://b3api.me/api/crypto/transaction/20e64580a0d8520dd676357421f6f39873e61c69c96a1f56f499a21b26592883" passHref target="_blank">https://b3api.me/api/crypto/transaction/20e64580a0d8520dd676357421f6f39873e61c69c96a1f56f499a21b26592883</Link> - Retorna informações sobre uma transação da blockchain.
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Endpoints;
