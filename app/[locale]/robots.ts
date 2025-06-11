import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codebr.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_components/',
        '/_lib/',
        '/_styles/',
        '/_actions/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 