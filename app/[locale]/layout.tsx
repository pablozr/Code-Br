import '../globals.css';
import '../_styles/effects/circuit-board.css';
import '../_styles/components/bento-grid.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { Providers } from '../providers';
import { Header } from '../_components/layout/Header';
import { Footer } from '../_components/layout/Footer';
import { JsonLd } from '../_components/seo/JsonLd';
import { OptimizedFonts } from '../_components/ui/OptimizedFonts';
import { OptimizedScripts } from '../_components/OptimizedScripts';
import { ResourcePreloader } from '../_components/ui/ResourcePreloader';
import { ServiceWorkerRegistration } from '../_components/ui/ServiceWorkerRegistration';
import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Viewport é independente dos metadados dinâmicos
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0A0A',
};

const manrope = Manrope({ subsets: ['latin'] });

// Lista de locales suportados
const supportedLocales = ['pt-BR', 'en', 'fr'];

// Função para obter metadados com base no locale
function getMetadataForLocale(locale: string): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codebr.com';

  // Metadados específicos para cada idioma
  if (locale === 'en') {
    return {
      title: 'Swiss Websites | Professional Website Creation',
      description: 'We create professional websites with hosting in Switzerland. We offer landing pages, e-commerce, online stores and custom projects.',
      keywords: 'website creation, professional websites, landing pages, e-commerce, Switzerland, web development',
      authors: [{ name: 'CodeBR', url: baseUrl }],
      creator: 'CodeBR',
      publisher: 'CodeBR',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: '/',
        languages: {
          'en': '/en',
          'fr': '/fr',
          'pt-BR': '/pt-BR',
        },
      },
      openGraph: {
        title: 'Swiss Websites | Professional Website Creation',
        description: 'We create professional websites with hosting in Switzerland. We offer landing pages, e-commerce, online stores and custom projects.',
        url: baseUrl,
        siteName: 'CodeBR',
        images: [
          {
            url: `${baseUrl}/images/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'CodeBR - Professional Website Creation',
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Swiss Websites | Professional Website Creation',
        description: 'We create professional websites with hosting in Switzerland. We offer landing pages, e-commerce, online stores and custom projects.',
        images: [`${baseUrl}/images/og-image.jpg`],
      },
    };
  } else if (locale === 'fr') {
    return {
      title: 'Sites Web Suisses | Création de Sites Web Professionnels',
      description: 'Nous créons des sites web professionnels avec hébergement en Suisse. Nous proposons des landing pages, e-commerce, boutiques en ligne et projets personnalisés.',
      keywords: 'création de sites web, sites web professionnels, landing pages, e-commerce, Suisse, développement web',
      authors: [{ name: 'CodeBR', url: baseUrl }],
      creator: 'CodeBR',
      publisher: 'CodeBR',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: '/',
        languages: {
          'en': '/en',
          'fr': '/fr',
          'pt-BR': '/pt-BR',
        },
      },
      openGraph: {
        title: 'Sites Web Suisses | Création de Sites Web Professionnels',
        description: 'Nous créons des sites web professionnels avec hébergement en Suisse. Nous proposons des landing pages, e-commerce, boutiques en ligne et projets personnalisés.',
        url: baseUrl,
        siteName: 'CodeBR',
        images: [
          {
            url: `${baseUrl}/images/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'CodeBR - Création de Sites Web Professionnels',
          },
        ],
        locale: 'fr_FR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Sites Web Suisses | Création de Sites Web Professionnels',
        description: 'Nous créons des sites web professionnels avec hébergement en Suisse. Nous proposons des landing pages, e-commerce, boutiques en ligne et projets personnalisés.',
        images: [`${baseUrl}/images/og-image.jpg`],
      },
    };
  } else {
    // Português (padrão)
    return {
      title: 'Websites Suíços | Criação de Sites Profissionais',
      description: 'Criamos websites profissionais com hospedagem na Suíça. Oferecemos landing pages, e-commerce, lojas online e projetos personalizados.',
      keywords: 'criação de sites, websites profissionais, landing pages, e-commerce, Suíça, desenvolvimento web',
      authors: [{ name: 'CodeBR', url: baseUrl }],
      creator: 'CodeBR',
      publisher: 'CodeBR',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: '/',
        languages: {
          'en': '/en',
          'fr': '/fr',
          'pt-BR': '/pt-BR',
        },
      },
      openGraph: {
        title: 'Websites Suíços | Criação de Sites Profissionais',
        description: 'Criamos websites profissionais com hospedagem na Suíça. Oferecemos landing pages, e-commerce, lojas online e projetos personalizados.',
        url: baseUrl,
        siteName: 'CodeBR',
        images: [
          {
            url: `${baseUrl}/images/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'CodeBR - Criação de Sites Profissionais',
          },
        ],
        locale: 'pt_BR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Websites Suíços | Criação de Sites Profissionais',
        description: 'Criamos websites profissionais com hospedagem na Suíça. Oferecemos landing pages, e-commerce, lojas online e projetos personalizados.',
        images: [`${baseUrl}/images/og-image.jpg`],
      },
    };
  }
}

// Função para gerar os metadados de forma segura
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  // Await dos params no Next.js 15
  const resolvedParams = await params;
  const validLocale = resolvedParams?.locale || 'pt-BR';
  return getMetadataForLocale(validLocale);
}

// Componente de layout principal
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await dos params no Next.js 15
  const resolvedParams = await params;
  const validLocale = resolvedParams?.locale || 'pt-BR';

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html
      lang={validLocale}
      dir="ltr"
      className={manrope.className}
    >
      <head>
        {/* Preload crítico para LCP */}
        <link rel="preload" href="/fonts/manrope-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch para performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7641C0" />
        <meta name="msapplication-TileColor" content="#7641C0" />

        {/* Preload de CSS crítico */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* CSS crítico inline para evitar FOUC */
            body {
              margin: 0;
              padding: 0;
              background: #0A0A0A;
              color: white;
              font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            /* Evitar CLS no header */
            header {
              height: 80px;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 1000;
              background: rgba(10, 10, 10, 0.95);
              backdrop-filter: blur(10px);
            }

            /* Espaçamento para header fixo */
            main {
              padding-top: 80px;
            }

            /* Loading skeleton para evitar CLS */
            .loading-skeleton {
              background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
            }

            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `
        }} />
      </head>
      <body style={{ minHeight: '100dvh' }}>
        <NextIntlClientProvider locale={validLocale} messages={messages}>
          <Providers locale={validLocale}>
            {/* Preloader de recursos críticos */}
            <ResourcePreloader />

            {/* Service Worker para cache e performance */}
            <ServiceWorkerRegistration />

            {/* JSON-LD para SEO */}
            <JsonLd type="Organization" data={{}} />
            <JsonLd type="WebSite" data={{}} />

            {/* Otimização de fontes */}
            <OptimizedFonts />

            {/* Otimização de scripts e performance */}
            <OptimizedScripts />

            {/* Header com Suspense para evitar blocking */}
            <Suspense fallback={
              <header style={{ height: '80px', background: 'rgba(10, 10, 10, 0.95)' }} className="loading-skeleton" />
            }>
              <Header />
            </Suspense>

            {/* Main content */}
            <main>
              {children}
            </main>

            {/* Footer com lazy loading */}
            <Suspense fallback={
              <footer style={{ height: '200px', background: 'rgba(15, 15, 15, 0.8)' }} className="loading-skeleton" />
            }>
              <Footer />
            </Suspense>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}



