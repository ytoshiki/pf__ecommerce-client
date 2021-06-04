export interface CartData {
  id: string;
  name: string;
  images: string[];
  category: string;
  price: number;
  quantity: number;
  sum: number;
}

export interface CartState {
  cartItems: CartData[];
  sum: number;
}
