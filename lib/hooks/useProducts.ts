import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getProducts, getProduct } from "@/lib/api/products";
import { ProductsResponse, Product } from "@/lib/types/product";

export const useGetProductsQuery = (
  queries?: { search?: string },
  props?: Omit<
    UseQueryOptions<ProductsResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ProductsResponse, Error>({
    ...props,
    queryKey: ["products", queries],
    queryFn: () => getProducts(queries),
  });
};

export const useGetProductQuery = (
  id: string,
  props?: Omit<UseQueryOptions<Product, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<Product, Error>({
    ...props,
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};
