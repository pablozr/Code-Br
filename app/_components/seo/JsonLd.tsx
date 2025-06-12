'use client';

import { usePathname } from 'next/navigation';

interface JsonLdProps {
  type: 'Organization' | 'WebSite' | 'LocalBusiness' | 'Service' | 'BreadcrumbList' | 'FAQPage';
  data: Record<string, any>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codebr.com';
  const currentUrl = `${baseUrl}${pathname}`;

  // Dados base para a organização
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CodeBR',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://www.linkedin.com/company/codebr',
      'https://www.instagram.com/codebr',
    ],
    ...data,
  };

  // Dados base para o website
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CodeBR - Transformando seu negócio digital',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      'target': `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    ...data,
  };

  // Dados base para negócio local
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'CodeBR',
    image: `${baseUrl}/logo.png`,
    url: baseUrl,
    telephone: '+41123456789',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Exemplo, 123',
      addressLocality: 'Zurique',
      addressRegion: 'ZH',
      postalCode: '8000',
      addressCountry: 'CH'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '47.3769',
      longitude: '8.5417'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    ...data,
  };

  // Dados base para serviço
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Website Development',
    provider: {
      '@type': 'Organization',
      name: 'CodeBR',
      url: baseUrl
    },
    areaServed: {
      '@type': 'Country',
      name: 'Switzerland'
    },
    ...data,
  };

  // Selecionar o tipo correto de dados
  let schemaData;
  switch (type) {
    case 'Organization':
      schemaData = organizationData;
      break;
    case 'WebSite':
      schemaData = websiteData;
      break;
    case 'LocalBusiness':
      schemaData = localBusinessData;
      break;
    case 'Service':
      schemaData = serviceData;
      break;
    case 'BreadcrumbList':
    case 'FAQPage':
    default:
      schemaData = { '@context': 'https://schema.org', '@type': type, ...data };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
