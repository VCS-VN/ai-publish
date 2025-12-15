import { useCartStore } from "@/lib/stores/cart-store";
import { CartItem } from "@/lib/types/product";

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (item: CartItem, quantity: number = 1) => {
    addItem({ ...item, quantity });
  };

  return {
    items,
    count,
    addToCart,
    updateItemQuantity,
    removeItem,
    clear,
  };
};
