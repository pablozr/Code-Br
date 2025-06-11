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

  return (
    <html
      lang={validLocale}
      dir="ltr"
      className={manrope.className}
    >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7641C0" />
        <meta name="msapplication-TileColor" content="#7641C0" />
      </head>
      <body style={{ minHeight: '100dvh' }}>
        <Providers locale={validLocale}>
          {/* JSON-LD para SEO */}
          <JsonLd type="Organization" data={{}} />
          <JsonLd type="WebSite" data={{}} />

          {/* Otimização de fontes */}
          <OptimizedFonts />

          {/* Otimização de scripts e performance */}
          <OptimizedScripts />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}



