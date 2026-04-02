import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/owner/dashboard/',
          '/seeker/dashboard/',
          '/profile/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/owner/dashboard/',
          '/seeker/dashboard/',
          '/profile/',
        ],
      },
    ],
    sitemap: 'https://rentro.com/sitemap.xml',
  };
}
