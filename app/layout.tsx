import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from '@/components/providers';

export const metadata = {
  title: 'E-Commerce Store',
  description: 'Modern e-commerce store built with Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
