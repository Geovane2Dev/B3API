import React from 'react';
import Link from 'next/link';

const BoostrapFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <p className="mb-2 footer-text">
          &copy; {currentYear}{' '}
          <Link
            href="https://github.com/Geovane2Dev"
            passHref
            className="text-white text-decoration-none"
            aria-label="GitHub Profile"
          >
            Geovane2Dev
          </Link>
          .{' '}
          <a
            href="https://github.com/Geovane2Dev/B3API/blob/main/LICENSE"
            className="text-white"
            aria-label="MIT License"
          >
            Licença MIT
          </a>
        </p>
        <p className="mb-0 footer-text">
          <Link href="/terms" passHref className="text-white text-decoration-none">Termos de Serviço</Link>
        </p>
      </div>
    </footer>
  );
};

export default BoostrapFooter;
