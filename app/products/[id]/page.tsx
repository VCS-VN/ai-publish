'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useProduct } from '@/hooks/useProducts'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, AlertCircle, ArrowLeft, ShoppingCart, Star, Package, Shield, Truck } from 'lucide-react'
import { hasMonmiOAuth } from '@/lib/api/client'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: product, isLoading, error } = useProduct(id)
  const { addToCart } = useCart()

  if (isLoading) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <p className="text-muted-foreground">
            The product you&apos;re looking for doesn&apos;t exist
          </p>
          <Link href="/products">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="container py-12">
      <div className="mb-6">
        <Link href="/products">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>

      {!hasMonmiOAuth && (
        <div className="mb-6">
          <Badge variant="secondary">Demo Mode - Fake Data</Badge>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <Badge className="mb-3">{product.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating!)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}

            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <Badge variant="secondary" className="gap-1">
                <Package className="h-3 w-3" />
                {product.stock} in stock
              </Badge>
            ) : (
              <Badge variant="destructive">Out of stock</Badge>
            )}
          </div>

          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>

          {/* Features */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">
                      Free shipping on orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Secure Payment</h4>
                    <p className="text-sm text-muted-foreground">
                      Your payment information is safe with us
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Easy Returns</h4>
                    <p className="text-sm text-muted-foreground">
                      30-day return policy for all products
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
