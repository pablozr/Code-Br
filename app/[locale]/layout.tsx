import '../globals.css';
import '../_styles/effects/circuit-board.css';
import '../_styles/components/bento-grid.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { Providers } from '../providers';
import { Header } from '../_components/layout/Header';
import { Footer } from '../_components/layout/Footer';

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
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Usar o locale dos parâmetros
  const locale = params.locale;
  return (
    <html
      lang={locale}
      dir="ltr"
      className={manrope.className}
    >
      <body style={{ minHeight: '100dvh' }}>
        <Providers locale={locale}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
