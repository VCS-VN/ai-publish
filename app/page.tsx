import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, TrendingUp, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center gap-8 px-4 py-24 md:py-32">
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
            Welcome to Your{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              E-Commerce
            </span>{' '}
            Store
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Discover amazing products at unbeatable prices. Shop the latest
            trends in electronics, fashion, accessories, and more.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/products">
              <Button size="lg" className="gap-2">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 text-center p-6 rounded-lg border bg-card">
            <div className="rounded-full bg-primary/10 p-4">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Wide Selection</h3>
            <p className="text-muted-foreground">
              Browse through thousands of products across multiple categories
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center p-6 rounded-lg border bg-card">
            <div className="rounded-full bg-primary/10 p-4">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Best Prices</h3>
            <p className="text-muted-foreground">
              Get the best deals and competitive prices on all products
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center p-6 rounded-lg border bg-card">
            <div className="rounded-full bg-primary/10 p-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Secure Shopping</h3>
            <p className="text-muted-foreground">
              Shop with confidence with our secure payment system
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col items-center gap-6 rounded-xl bg-primary p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Start Shopping?
          </h2>
          <p className="max-w-[600px] text-lg opacity-90">
            Explore our collection and find exactly what you&apos;re looking for
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="gap-2">
              View All Products <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
