import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codebr.com';
  const locales = ['pt-BR', 'en', 'fr'];
  
  // Páginas principais
  const mainPages = [
    '',
    '/contact',
    '/orcamento',
  ];

  // Gerar entradas para cada combinação de página e idioma
  const entries = locales.flatMap(locale => 
    mainPages.map(page => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
      priority: page === '' ? 1 : 0.8,
    }))
  );

  return entries;
} 