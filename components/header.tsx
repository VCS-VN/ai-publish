"use client";

import Link from "next/link";
import { Store } from "lucide-react";
import { CartDrawer } from "./cart-drawer";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Store className="h-6 w-6" />
          <span>Store</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Products
          </Link>
          <CartDrawer />
        </nav>
      </div>
    </header>
  );
}
