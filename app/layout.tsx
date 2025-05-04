import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'B3API - Dados Financeiros Brasileiros em Tempo Real | API B3 Líder no Mercado',
  description: 'A B3API oferece dados financeiros brasileiros confiáveis e em tempo real. Experimente nossa API B3 líder no mercado agora!',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://b3api.g2dev.me/',
    title: 'B3API - Dados Financeiros Brasileiros em Tempo Real | API B3 Líder no Mercado',
    description: 'A B3API oferece dados financeiros brasileiros confiáveis e em tempo real. Experimente nossa API B3 líder no mercado agora!',
    images: [
      {
        url: 'http://b3api.g2dev.me/B3API.png',
        width: 120,
        height: 120,
        alt: 'B3API Icon',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="pt-br">
        <body className={inter.className}>{children}</body>
      </html>
    </>
  )
}
