export interface Category {
  id: number;
  image?: string;
  nameEn: string;
  name: string;
}
export interface Product {
  id: number;
  image: string;
  nameEn: string;
  name: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  category: Category;
  quantity?: number;
  totalPrice?: number;
  stockQuantity: number;
  images: string[];
  brand: string;
  specifications: [];
}

export type CartState = Product[];
