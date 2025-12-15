import { apiClient } from "./client";

interface TempCartItem {
  id: string;
  name: string;
  price: number; // in cents (original, not divided)
  weight: number;
  quantity: number;
  product: {
    id: string;
    name: string;
    image: string;
    hsCode?: string;
  };
}

interface CreateTempCartRequest {
  storeId: string;
  items: TempCartItem[];
}

interface CreateTempCartResponse {
  code: string;
}

export const createTempCart = async (
  items: TempCartItem[]
): Promise<CreateTempCartResponse> => {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;
  if (!storeId) {
    throw new Error("Store ID is required");
  }

  const { data } = await apiClient.post<CreateTempCartResponse>(
    "/api/v1/temp-carts",
    {
      storeId,
      items,
    }
  );

  return data;
};
