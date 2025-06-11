'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface AdvancedMetaTagsProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  locale?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonicalUrl?: string;
}

export function AdvancedMetaTags({
  title,
  description,
  image = '/images/og-image.jpg',
  type = 'website',
  locale = 'pt-BR',
  twitterCard = 'summary_large_image',
  canonicalUrl,
}: AdvancedMetaTagsProps) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codebr.com';
  const currentUrl = `${baseUrl}${pathname}`;
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const canonical = canonicalUrl || currentUrl;

  return (
    <Head>
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="CodeBR" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Outras meta tags importantes */}
      <meta name="author" content="CodeBR" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
}
