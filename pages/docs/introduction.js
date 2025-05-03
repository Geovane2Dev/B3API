import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DocsMenu from '../../components/DocsMenu';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Introduction = () => {
  return (
    <div>
      <NextSeo
        title="B3API - Documentação e Introdução | Dados Financeiros Brasileiros em Tempo Real"
        description="Explore a B3API, sua fonte confiável para dados em tempo real do mercado de ações brasileiro. Inicie sua jornada com nossa introdução e comece a utilizar a API hoje mesmo para obter informações precisas e atualizadas."
        canonical="https://b3api.me/docs/introduction"
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://b3api.me/docs/introduction',
          site_name: 'B3API - Introdução da Documentação',
          title: 'B3API - Introdução | Dados em Tempo Real do Mercado de Ações Brasileiro',
          description: 'Descubra a B3API, sua fonte confiável para dados em tempo real do mercado de ações brasileiro. Explore nossa introdução e comece a utilizar a API hoje mesmo para obter informações precisas e atualizadas.',
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
            <Card className="bg-light rounded-4 shadow-sm">
              <Card.Body>
                <h1 className="display-5 text-center mb-4 fw-bold">Introdução da API</h1>
                <p className="text-muted text-center">
                  A B3API é sua fonte confiável para dados em tempo real do mercado de ações brasileiro. Seja você um investidor, desenvolvedor ou entusiasta do mercado financeiro, nossa API oferece acesso fácil e rápido a uma ampla gama de informações financeiras atualizadas.
                </p>

                <Card className="mt-5 rounded-3">
                  <Card.Body>
                    <h2 className="card-title fw-semibold">Dados Disponíveis na API</h2>
                    <Card.Text>
                      A B3API oferece uma variedade de dados para atender às necessidades dos usuários, incluindo:
                    </Card.Text>
                    <ListGroup variant="flush" className="rounded-3">
                      <ListGroup.Item>Informações fundamentais das empresas listadas na bolsa de valores brasileira.</ListGroup.Item>
                      <ListGroup.Item>Cotações de ações em tempo real, incluindo preços de mercado, volumes de negociação e variações de preço.</ListGroup.Item>
                      <ListGroup.Item>Dados de dividendos, incluindo porcentagens e valores distribuídos nos últimos 12 meses.</ListGroup.Item>
                      <ListGroup.Item>Informações sobre índices financeiros, como CDI e SELIC.</ListGroup.Item>
                    </ListGroup>
                    <Card.Text className="mt-3 text-muted">
                      Esses são apenas alguns exemplos dos dados disponíveis na B3API. Explore nossa documentação completa para descobrir todos os dados e recursos que nossa API tem a oferecer.
                    </Card.Text>
                  </Card.Body>
                </Card>

                <div className="text-center mt-5">
                  <Link href="/docs/endpoints" passHref>
                    <Button variant="primary" size="lg" className="rounded-pill shadow-sm">Explorar Endpoints</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Introduction;
