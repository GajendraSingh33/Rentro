'use client';

import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Rentro - PG Accommodation Platform',
  description: 'Find the perfect PG accommodation for your needs',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <div id="__next">{children}</div>
      </body>
    </html>
  );
}
