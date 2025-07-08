export interface Flower {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  origin: string;
  color: string;
  occasion: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  sizes: string[];
  sameDay: boolean;
}

export interface CartItem {
  id: string;
  flower: Flower;
  quantity: number;
  size: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  deliveryDate: string;
  address: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  wishlist: string[];
  orders: string[];
}