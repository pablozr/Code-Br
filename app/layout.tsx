import './globals.css';
import '../styles/circuit-board.css';
import '../styles/bento-grid.css';
import '../styles/clerk-custom.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
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
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#9969E5',
              colorBackground: '#0A0A0A',
              colorText: '#FFFFFF',
              colorTextSecondary: '#A9A9A9',
              colorDanger: '#FF5555',
            },
            elements: {
              userButtonPopoverCard: {
                backgroundColor: '#0A0A0A',
                borderColor: 'rgba(118, 65, 192, 0.3)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
              },
              userButtonPopoverActionButton: {
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(118, 65, 192, 0.1)',
                },
              },
              userButtonPopoverActionButtonText: {
                color: 'white',
                fontWeight: 500,
              },
              userButtonPopoverActionButtonIcon: {
                color: '#9969E5',
              },
              userButtonPopoverFooter: {
                borderTopColor: 'rgba(118, 65, 192, 0.2)',
              },
              userButtonPopoverActionButtonSignOut: {
                color: '#FF5555',
                '&:hover': {
                  backgroundColor: 'rgba(255, 85, 85, 0.1)',
                },
              },
            },
          }}
          afterSignOutUrl="/"
        >
          <Providers>
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
