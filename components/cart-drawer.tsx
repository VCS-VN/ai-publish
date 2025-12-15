"use client";

import * as React from "react";
import { ShoppingCart, Minus, Plus, Trash2, X } from "lucide-react";
import { round } from "lodash";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/hooks/useCart";
import { createTempCart } from "@/lib/api/cart";
import { isDemoMode, getCheckoutUrl, getPlaceholderImage } from "@/lib/utils/env";

export function CartDrawer() {
  const { items, count, updateItemQuantity, removeItem, clear } = useCart();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const placeholderImage = getPlaceholderImage();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const cartItems = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price, // Keep original cents value
        weight: item.weight,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          image: item.product.image,
          hsCode: item.product.hsCode,
        },
      }));

      return createTempCart(cartItems);
    },
    onSuccess: (data) => {
      const checkoutUrl = getCheckoutUrl();
      clear();
      setOpen(false);
      window.location.href = `${checkoutUrl}?cartCode=${data.code}`;
    },
    onError: (error) => {
      toast.error("Checkout failed. Please try again.");
      console.error("Checkout error:", error);
    },
  });

  const handleCheckout = () => {
    if (isDemoMode()) {
      toast.error("Checkout is not available in demo mode");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    checkoutMutation.mutate();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ShoppingCart className="h-6 w-6" />
          {count > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {count}
            </Badge>
          )}
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DrawerTitle>Shopping Cart ({count})</DrawerTitle>
            <DrawerClose asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-4 w-4" />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart className="h-16 w-16 mb-4 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-gray-100"
                >
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={item.image || placeholderImage}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = placeholderImage;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      ${round(item.price / 100, 2).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-1 hover:bg-red-50 text-red-600 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DrawerFooter className="border-t border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>${round(subtotal / 100, 2).toFixed(2)}</span>
            </div>
            {items.length > 0 && (
              <>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                  loading={checkoutMutation.isPending}
                  disabled={isDemoMode()}
                >
                  {isDemoMode() ? "Checkout (Demo Mode)" : "Proceed to Checkout"}
                </Button>
                {isDemoMode() && (
                  <p className="text-xs text-center text-gray-500">
                    Checkout is disabled in demo mode
                  </p>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => clear()}
                >
                  Clear Cart
                </Button>
              </>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
