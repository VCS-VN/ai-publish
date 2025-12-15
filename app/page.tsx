"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/header";
import { DemoModeBanner } from "@/components/demo-mode-banner";
import { ProductList } from "@/components/product-list";
import { Input } from "@/components/ui/input";
import { useGetProductsQuery } from "@/lib/hooks/useProducts";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading, error } = useGetProductsQuery({
    search: debouncedSearch,
  });

  // Debounce search input
  const handleSearch = (value: string) => {
    setSearch(value);
    const timer = setTimeout(() => {
      setDebouncedSearch(value);
    }, 300);
    return () => clearTimeout(timer);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <DemoModeBanner />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-gray-600 mb-6">
            Browse our collection of quality products
          </p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">Failed to load products</p>
          </div>
        ) : (
          <ProductList products={data?.data || []} />
        )}
      </main>
    </div>
  );
}
