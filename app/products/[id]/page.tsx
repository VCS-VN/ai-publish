"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { round, groupBy } from "lodash";
import { toast } from "sonner";
import { Header } from "@/components/header";
import { DemoModeBanner } from "@/components/demo-mode-banner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetProductQuery } from "@/lib/hooks/useProducts";
import { useCart } from "@/lib/hooks/useCart";
import { ProductModel, Variant } from "@/lib/types/product";
import { getPlaceholderImage } from "@/lib/utils/env";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const placeholderImage = getPlaceholderImage();

  const { data: product, isLoading, error } = useGetProductQuery(productId);
  const { addToCart } = useCart();

  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, Variant>>({});
  const [quantity, setQuantity] = useState(1);

  // Compute attributes by grouping configs by attribute
  const attributes = useMemo(() => {
    if (!product?.models) return [];

    const allConfigs = product.models.flatMap((model) => model.configs);
    const grouped = groupBy(allConfigs, (config) => config.attribute.id);

    return Object.entries(grouped).map(([attributeId, configs]) => {
      const uniqueVariants = Array.from(
        new Map(configs.map((c) => [c.id, c])).values()
      );
      return {
        id: attributeId,
        name: configs[0]?.attribute?.name || "",
        variants: uniqueVariants,
      };
    });
  }, [product]);

  // Preselect default model configs on load
  useEffect(() => {
    if (product?.defaultModel) {
      setSelectedModel(product.defaultModel);
      setQuantity(1);

      const initialOptions: Record<number, Variant> = {};
      product.defaultModel.configs.forEach((config, index) => {
        initialOptions[index] = config;
      });
      setSelectedOptions(initialOptions);
    }
  }, [product]);

  // Match selected options to a model
  useEffect(() => {
    if (!product?.models || Object.keys(selectedOptions).length === 0) return;

    const selectedVariantIds = Object.values(selectedOptions).map((v) => v.id);

    const matchedModel = product.models.find((model) => {
      if (model.configs.length !== selectedVariantIds.length) return false;
      const modelVariantIds = model.configs.map((c) => c.id).sort();
      const selectedIds = selectedVariantIds.slice().sort();
      return modelVariantIds.every((id, idx) => id === selectedIds[idx]);
    });

    setSelectedModel(matchedModel || null);
  }, [selectedOptions, product]);

  const handleVariantSelect = (attributeIndex: number, variant: Variant) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [attributeIndex]: variant,
    }));
  };

  const handleAddToCart = () => {
    if (!selectedModel || !product) {
      toast.error("Please select all options");
      return;
    }

    addToCart(
      {
        id: selectedModel.id,
        name: selectedModel.name,
        price: selectedModel.price,
        weight: selectedModel.weight,
        quantity,
        image: product.image,
        product: {
          id: product.id,
          name: product.name,
          image: product.image,
          hsCode: product.hsCode,
        },
      },
      quantity
    );

    toast.success("Added to cart");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-red-600">Product not found</p>
        </div>
      </div>
    );
  }

  const displayPrice = selectedModel?.price
    ? round(selectedModel.price / 100, 2)
    : round(product.defaultModel?.price / 100, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <DemoModeBanner />

      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
            <img
              src={product.image || placeholderImage}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = placeholderImage;
              }}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              {product.category?.name && (
                <Badge variant="secondary" className="mb-2">
                  {product.category.name}
                </Badge>
              )}
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              {product.description && (
                <p className="text-gray-600">{product.description}</p>
              )}
            </div>

            <div className="text-3xl font-bold">
              ${displayPrice.toFixed(2)}
            </div>

            {/* Variant Selection */}
            {attributes.map((attribute, attrIndex) => (
              <div key={attribute.id}>
                <label className="block text-sm font-medium mb-2">
                  {attribute.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {attribute.variants.map((variant) => {
                    const isSelected =
                      selectedOptions[attrIndex]?.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => handleVariantSelect(attrIndex, variant)}
                        className={`px-4 py-2 border rounded-md transition-colors ${
                          isSelected
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {variant?.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!selectedModel}
            >
              {selectedModel ? "Add to Cart" : "Select Options"}
            </Button>

            {product.hsCode && (
              <p className="text-sm text-gray-500">
                HS Code: {product.hsCode}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
