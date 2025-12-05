'use client'

import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/ProductCard'
import { Loader2, AlertCircle } from 'lucide-react'
import { hasMonmiOAuth } from '@/lib/api/client'
import { Badge } from '@/components/ui/badge'

export default function ProductsPage() {
  const { data, isLoading, error } = useProducts()

  if (isLoading) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-2xl font-bold">Error Loading Products</h2>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    )
  }

  const products = data?.data || []
  const total = data?.total || 0

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold">All Products</h1>
            {!hasMonmiOAuth && (
              <Badge variant="secondary" className="text-xs">
                Demo Mode - Fake Data
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-lg">
            Browse our collection of {total} amazing products
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <h2 className="text-2xl font-bold">No Products Found</h2>
            <p className="text-muted-foreground">
              Check back later for new products
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
