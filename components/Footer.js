import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0">
          &copy; {currentYear} BrInvestAPI. Todos os direitos reservados.
        </p>
        <div className="mt-2">
          <Link href="/privacy" passHref className="text-white">Política de Privacidade</Link>
          <span className="mx-2">|</span>
          <Link href="/terms" passHref className="text-white">Termos de Serviço</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
