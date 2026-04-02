import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Rentro - PG Accommodation Platform | Find Your Perfect PG',
    template: '%s | Rentro',
  },
  description: 'Find the perfect PG accommodation with Rentro. Search thousands of verified PG listings, compare prices, read reviews, and book your ideal paying guest accommodation online.',
  keywords: ['PG accommodation', 'paying guest', 'PG rooms', 'hostel', 'student accommodation', 'affordable housing', 'PG near me'],
  authors: [{ name: 'Rentro Team' }],
  creator: 'Rentro',
  publisher: 'Rentro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rentro.com',
    title: 'Rentro - PG Accommodation Platform',
    description: 'Find the perfect PG accommodation with verified listings, genuine reviews, and easy booking',
    siteName: 'Rentro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rentro - PG Accommodation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rentro - PG Accommodation Platform',
    description: 'Find the perfect PG accommodation with verified listings and genuine reviews',
    images: ['/twitter-image.jpg'],
    creator: '@rentro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    // Add other verification codes as needed
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://rentro.com" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <div id="__next">{children}</div>
      </body>
    </html>
  );
}
