import './globals.css';
import './_styles/effects/circuit-board.css';
import './_styles/components/bento-grid.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { Providers } from './providers';
import { dir } from 'i18next';
import { languages } from './_lib/i18n/settings';

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
  params: { lang: string };
}) {
  const lang = params.lang || 'pt-BR';

  return (
    <html
      lang={lang}
      dir={languages[lang as keyof typeof languages]?.dir || 'ltr'}
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
