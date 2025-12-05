import { useQuery } from '@tanstack/react-query'
import { apiClient, hasMonmiOAuth } from '@/lib/api/client'
import { getFakeProducts, getFakeProductById } from '@/lib/api/fake-data'
import { ProductsResponse, Product } from '@/types/product'

const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID

export function useProducts() {
  return useQuery<ProductsResponse>({
    queryKey: ['products', STORE_ID],
    queryFn: async () => {
      // Only fetch from API if Monmi OAuth is integrated
      if (hasMonmiOAuth && STORE_ID) {
        const response = await apiClient.get<ProductsResponse>(
          '/api/v1/products',
          {
            params: { storeId: STORE_ID },
          }
        )
        return response.data
      }

      // Otherwise, use fake data
      return getFakeProducts(STORE_ID)
    },
  })
}

export function useProduct(id: string) {
  return useQuery<Product | undefined>({
    queryKey: ['product', id, STORE_ID],
    queryFn: async () => {
      // Only fetch from API if Monmi OAuth is integrated
      if (hasMonmiOAuth && STORE_ID) {
        const response = await apiClient.get<Product>(
          `/api/v1/products/${id}`,
          {
            params: { storeId: STORE_ID },
          }
        )
        return response.data
      }

      // Otherwise, use fake data
      return getFakeProductById(id)
    },
    enabled: !!id,
  })
}
