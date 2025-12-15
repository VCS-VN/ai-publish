"use client";

import Link from "next/link";
import { round } from "lodash";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/types/product";
import { getPlaceholderImage } from "@/lib/utils/env";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.defaultModel?.price
    ? round(product.defaultModel.price / 100, 2)
    : 0;

  const placeholderImage = getPlaceholderImage();

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img
            src={product.image || placeholderImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = placeholderImage;
            }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-1">
            {product.name}
          </h3>
          {product.category?.name && (
            <p className="text-sm text-gray-500 mb-2">
              {product.category.name}
            </p>
          )}
          <p className="text-xl font-bold">${price.toFixed(2)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
