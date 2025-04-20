import './globals.css';
import '../styles/circuit-board.css';
import '../styles/bento-grid.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Websites Suíços | Criação de Sites Profissionais',
  description: 'Criamos websites profissionais com hospedagem na Suíça. Oferecemos landing pages, e-commerce, lojas online e projetos personalizados.',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={manrope.className}
    >
      <body style={{ minHeight: '100dvh' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
