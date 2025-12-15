export interface Category {
  id: string;
  name: string;
}

export interface Attribute {
  id: string;
  name: string;
}

export interface Variant {
  id: string;
  value: string;
  name?: string;
  attribute: Attribute;
}

export interface ProductModel {
  id: string;
  name: string;
  price: number; // in cents
  weight: number;
  configs: Variant[];
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  image: string;
  hsCode?: string;
  category?: Category;
  models: ProductModel[];
  defaultModel: ProductModel;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number; // in cents
  weight: number;
  quantity: number;
  image: string;
  product: {
    id: string;
    name: string;
    image: string;
    hsCode?: string;
  };
}
