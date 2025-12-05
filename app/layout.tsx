import type { ReactNode } from 'react'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/Header'

export const metadata = {
  title: 'E-Commerce Store',
  description: 'Shop the best products at great prices',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built with Next.js 16, TypeScript, and Tailwind CSS
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
