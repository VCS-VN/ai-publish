export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  rating?: number
  reviews?: number
}

export interface ProductsResponse {
  data: Product[]
  total: number
}

export interface CartItem extends Product {
  quantity: number
}
