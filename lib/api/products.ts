import { apiClient } from "./client";
import { Product, ProductsResponse } from "@/lib/types/product";
import { isDemoMode, getPlaceholderImage } from "@/lib/utils/env";

const PLACEHOLDER_IMAGE = getPlaceholderImage();

// Fake data that mirrors real product structure
const FAKE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic T-Shirt",
    description: "A comfortable cotton t-shirt perfect for everyday wear",
    image: PLACEHOLDER_IMAGE,
    hsCode: "6109100010",
    category: { id: "cat1", name: "Clothing" },
    defaultModel: {
      id: "model-1-1",
      name: "Classic T-Shirt - Blue - Small",
      price: 2999, // $29.99 in cents
      weight: 200,
      configs: [
        {
          id: "var-color-blue",
          value: "Blue",
          attribute: { id: "attr-color", name: "Color" },
        },
        {
          id: "var-size-s",
          value: "Small",
          attribute: { id: "attr-size", name: "Size" },
        },
      ],
    },
    models: [
      {
        id: "model-1-1",
        name: "Classic T-Shirt - Blue - Small",
        price: 2999,
        weight: 200,
        configs: [
          {
            id: "var-color-blue",
            value: "Blue",
            attribute: { id: "attr-color", name: "Color" },
          },
          {
            id: "var-size-s",
            value: "Small",
            attribute: { id: "attr-size", name: "Size" },
          },
        ],
      },
      {
        id: "model-1-2",
        name: "Classic T-Shirt - Blue - Medium",
        price: 2999,
        weight: 220,
        configs: [
          {
            id: "var-color-blue",
            value: "Blue",
            attribute: { id: "attr-color", name: "Color" },
          },
          {
            id: "var-size-m",
            value: "Medium",
            attribute: { id: "attr-size", name: "Size" },
          },
        ],
      },
      {
        id: "model-1-3",
        name: "Classic T-Shirt - Red - Small",
        price: 2999,
        weight: 200,
        configs: [
          {
            id: "var-color-red",
            value: "Red",
            attribute: { id: "attr-color", name: "Color" },
          },
          {
            id: "var-size-s",
            value: "Small",
            attribute: { id: "attr-size", name: "Size" },
          },
        ],
      },
      {
        id: "model-1-4",
        name: "Classic T-Shirt - Red - Medium",
        price: 3199,
        weight: 220,
        configs: [
          {
            id: "var-color-red",
            value: "Red",
            attribute: { id: "attr-color", name: "Color" },
          },
          {
            id: "var-size-m",
            value: "Medium",
            attribute: { id: "attr-size", name: "Size" },
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Denim Jeans",
    description: "Classic denim jeans with a modern fit",
    image: PLACEHOLDER_IMAGE,
    hsCode: "6203420090",
    category: { id: "cat1", name: "Clothing" },
    defaultModel: {
      id: "model-2-1",
      name: "Denim Jeans - 30",
      price: 5999,
      weight: 600,
      configs: [
        {
          id: "var-waist-30",
          value: "30",
          attribute: { id: "attr-waist", name: "Waist" },
        },
      ],
    },
    models: [
      {
        id: "model-2-1",
        name: "Denim Jeans - 30",
        price: 5999,
        weight: 600,
        configs: [
          {
            id: "var-waist-30",
            value: "30",
            attribute: { id: "attr-waist", name: "Waist" },
          },
        ],
      },
      {
        id: "model-2-2",
        name: "Denim Jeans - 32",
        price: 5999,
        weight: 620,
        configs: [
          {
            id: "var-waist-32",
            value: "32",
            attribute: { id: "attr-waist", name: "Waist" },
          },
        ],
      },
      {
        id: "model-2-3",
        name: "Denim Jeans - 34",
        price: 6199,
        weight: 640,
        configs: [
          {
            id: "var-waist-34",
            value: "34",
            attribute: { id: "attr-waist", name: "Waist" },
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Running Shoes",
    description: "Comfortable running shoes for daily exercise",
    image: PLACEHOLDER_IMAGE,
    hsCode: "6404110000",
    category: { id: "cat2", name: "Footwear" },
    defaultModel: {
      id: "model-3-1",
      name: "Running Shoes - Black - 9",
      price: 7999,
      weight: 800,
      configs: [
        {
          id: "var-color-black",
          value: "Black",
          attribute: { id: "attr-color", name: "Color" },
        },
        {
          id: "var-shoe-size-9",
          value: "9",
          attribute: { id: "attr-shoe-size", name: "Shoe Size" },
        },
      ],
    },
    models: [
      {
        id: "model-3-1",
        name: "Running Shoes - Black - 9",
        price: 7999,
        weight: 800,
        configs: [
          {
            id: "var-color-black",
            value: "Black",
            attribute: { id: "attr-color", name: "Color" },
          },
          {
            id: "var-shoe-size-9",
            value: "9",
            attribute: { id: "attr-shoe-size", name: "Shoe Size" },
          },
        ],
      },
      {
        id: "model-3-2",
        name: "Running Shoes - Black - 10",
        price: 7999,
        weight: 820,
        configs: [
          {
            id: "var-color-black",
            value: "Black",
            attribute: { id: "attr-color", name: "Color" },
          },
          {
            id: "var-shoe-size-10",
            value: "10",
            attribute: { id: "attr-shoe-size", name: "Shoe Size" },
          },
        ],
      },
      {
        id: "model-3-3",
        name: "Running Shoes - White - 9",
        price: 8199,
        weight: 800,
        configs: [
          {
            id: "var-color-white",
            value: "White",
            attribute: { id: "attr-color", name: "Color" },
          },
          {
            id: "var-shoe-size-9",
            value: "9",
            attribute: { id: "attr-shoe-size", name: "Shoe Size" },
          },
        ],
      },
      {
        id: "model-3-4",
        name: "Running Shoes - White - 10",
        price: 8199,
        weight: 820,
        configs: [
          {
            id: "var-color-white",
            value: "White",
            attribute: { id: "attr-color", name: "Color" },
          },
          {
            id: "var-shoe-size-10",
            value: "10",
            attribute: { id: "attr-shoe-size", name: "Shoe Size" },
          },
        ],
      },
    ],
  },
];

export const getProducts = async (queries?: {
  search?: string;
}): Promise<ProductsResponse> => {
  if (isDemoMode()) {
    // Return fake data in demo mode
    let filteredProducts = FAKE_PRODUCTS;
    if (queries?.search) {
      const searchLower = queries.search.toLowerCase();
      filteredProducts = FAKE_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      );
    }
    return {
      data: filteredProducts,
      total: filteredProducts.length,
    };
  }

  const { data } = await apiClient.get<ProductsResponse>("/api/v1/products", {
    params: {
      storeId: process.env.NEXT_PUBLIC_STORE_ID,
      search: queries?.search,
      isGettingDefaultModel: true,
      isGettingModels: true,
    },
  });

  return data;
};

export const getProduct = async (id: string): Promise<Product> => {
  if (isDemoMode()) {
    const product = FAKE_PRODUCTS.find((p) => p.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  const { data } = await apiClient.get<Product>(`/api/v1/products/${id}`, {
    params: {
      storeId: process.env.NEXT_PUBLIC_STORE_ID,
      isGettingDefaultModel: true,
      isGettingModels: true,
    },
  });

  return data;
};
