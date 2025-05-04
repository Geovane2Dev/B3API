import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DocsMenu from '../components/DocsMenu';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Docs = () => {
  return (
    <div>
      <NextSeo
        title="B3API - Documentação da API | Dados Financeiros Brasileiros em Tempo Real"
        description="Explore a B3API, sua fonte confiável para dados em tempo real do mercado de ações brasileiro. Inicie sua jornada com nossa documentação completa e comece a utilizar a API hoje mesmo para obter informações precisas e atualizadas."
        canonical="https://b3api.g2dev.me/docs"
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://b3api.g2dev.me/docs',
          site_name: 'B3API - Documentação da API',
          title: 'B3API - Documentação da API | Dados em Tempo Real do Mercado de Ações Brasileiro',
          description: 'Explore a B3API, sua fonte confiável para dados em tempo real do mercado de ações brasileiro. Inicie sua jornada com nossa documentação completa e comece a utilizar a API hoje mesmo para obter informações precisas e atualizadas.',
          images: [
            {
              url: 'https://b3api.g2dev.me/B3API.png',
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
        <Row>
          <Col md={3}>
            <DocsMenu />
          </Col>
          <Col md={9}>
            <div className="bg-light p-5 rounded shadow-sm">
              <h1 className="display-4 text-center mb-4">Documentação da API</h1>

              <Alert variant="warning" className="text-center">
                A B3API está em constante desenvolvimento. Caso encontre bugs ou tenha sugestões, por favor, relate-os em nossos{' '}
                <a href="https://github.com/GeovaneDev/B3API/issues" className="fw-bold text-decoration-none" target="_blank" rel="noopener noreferrer">Issues no GitHub</a>.
              </Alert>

              <p className="lead text-center">
                Bem-vindo à documentação oficial da B3API. Antes de começar, certifique-se de ler nossos{' '}
                <Link href="/terms" passHref className="fw-bold text-decoration-none">Termos de Uso</Link>. A B3API fornece dados do mercado de ações brasileiro e não exige autenticação para acesso.
              </p>

              <hr className="my-5" />

              <div className="mb-4">
                <h2>
                  <Link href="/docs/introduction" passHref className="text-decoration-none text-dark">Introdução</Link>
                </h2>
                <p className="text-muted">Uma visão geral da API e suas principais funcionalidades.</p>
              </div>

              <div className="mb-4">
                <h2>
                  <Link href="/docs/endpoints" passHref className="text-decoration-none text-dark">Endpoints</Link>
                </h2>
                <p className="text-muted">Lista e descrição dos endpoints disponíveis.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Docs;
