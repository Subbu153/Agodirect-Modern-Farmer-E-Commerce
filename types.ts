
export type UserRole = 'FARMER' | 'CUSTOMER' | 'INDUSTRIAL' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Product {
  id: string;
  farmerId: string;
  name: string;
  category: 'Vegetables' | 'Rice Items' | 'Fruits';
  price: number;
  bulkPrice?: number;
  quantity: number;
  image: string;
  description: string;
  discountTag?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  isBulk?: boolean;
}

export interface AppState {
  currentUser: User | null;
  products: Product[];
  cart: CartItem[];
  searchQuery: string;
}
