import { NextSeo } from 'next-seo';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';

const TermsOfService = () => {
  return (
    <div>
      <NextSeo
        title="B3API - Termos de Uso | Políticas de Acesso e Uso da API B3"
        description="Consulte os Termos de Uso da B3API para orientações sobre o uso da API. Ao acessar nossos serviços, você aceita os termos e políticas aplicáveis."
        canonical="https://b3api.me/terms"
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://b3api.me/terms',
          site_name: 'B3API - Termos de Uso | Políticas de Acesso e Uso da API B3',
          title: 'B3API - Termos de Uso | Políticas de Acesso e Uso da API B3',
          description: 'Consulte os Termos de Uso da B3API para orientações sobre o uso da API. Ao acessar nossos serviços, você aceita os termos e políticas aplicáveis.',
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

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="bg-light text-dark p-4 rounded-4 shadow-sm">
              <Card.Body>
                <h1 className="display-6 mb-4 text-center fw-bold">Termos de Serviço</h1>

                <Alert variant="info" className="rounded-3">
                  A B3API é um projeto sem fins lucrativos e um hobby do desenvolvedor GeovaneDev. Nosso objetivo é disponibilizar dados gratuitamente sobre o mercado financeiro brasileiro. Não buscamos lucro com a API. Portanto, pode ocorrer a mudança de domínio a cada 1 ano para garantir a continuidade deste serviço de forma sustentável.
                </Alert>

                <section className="mt-4">
                  <h2 className="mb-3 fw-semibold">1. Aceitação dos Termos</h2>
                  <p className="text-muted">
                    Ao acessar e utilizar o B3API, você expressa seu consentimento e concordância com os presentes Termos de Serviço, assim como com todos os termos e políticas incorporados por referência. Se por acaso você não concordar com qualquer um destes termos, solicitamos que não utilize o serviço.
                  </p>
                </section>

                <section className="mt-4">
                  <h2 className="mb-3 fw-semibold">2. Uso Responsável</h2>
                  <p className="text-muted">
                    Ao utilizar o B3API, você compromete-se a fazê-lo de maneira responsável e ética. O abuso do serviço, incluindo práticas como sobrecarga excessiva de solicitações, não é permitido e pode resultar na suspensão do acesso.
                  </p>
                </section>

                <section className="mt-4">
                  <h2 className="mb-3 fw-semibold">3. Limitação de Responsabilidade</h2>
                  <p className="text-muted">
                    A B3API não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, especiais, consequentes ou punitivos, incluindo, mas não se limitando a, lucros cessantes, perda de dados, uso indevido, interrupção do negócio ou quaisquer outros danos similares, decorrentes ou relacionados ao uso ou incapacidade de usar nosso serviço.
                  </p>
                </section>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default TermsOfService;
