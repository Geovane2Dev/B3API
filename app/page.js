"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HeroSection = () => {
  return (
    <section className="hero-section text-center my-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero-content">
              <Image src="/B3API.png" width={140} height={140} alt="B3API logo" priority={true} className="rounded-circle" />
              <h1 className="hero-title display-4 fw-bold">B3API</h1>
              <p className="lead text-muted fs-5 mb-4">Sua fonte confiável de dados em tempo real sobre ações, cotações e índices do mercado financeiro brasileiro.</p>
              <Link href="/docs" className="btn btn-primary btn-lg rounded-pill shadow-sm py-3 px-5">Comece Agora</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureSection = () => {
  return (
    <section className="feature-section text-center my-5">
      <div className="container">
        <h2 className="section-title display-4 fw-bold mb-5">Por que Escolher a B3API?</h2>
        <div className="row justify-content-center">
          <FeatureItem title="Dados Abrangentes" text="Acesse uma ampla gama de dados do mercado de ações, incluindo métricas e índices financeiros." color="info" icon="database" />
          <FeatureItem title="Atualizações em Tempo Real" text="Mantenha-se informado com dados atualizados do mercado de ações." color="success" icon="clock" />
          <FeatureItem title="Integração Fácil" text="Integração simples e fácil em suas aplicações com nossa API amigável para desenvolvedores." color="warning" icon="plug" />
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ title, text, color, icon }) => {
  return (
    <div className="col-lg-4 mb-4">
      <div className={`card text-dark bg-${color} bg-opacity-25 shadow-sm rounded-4 py-4`}>
        <div className="card-body">
          <i className={`fas fa-${icon} fa-3x mb-3`} />
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text text-muted">{text}</p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </>
  );
};

export default Home;
