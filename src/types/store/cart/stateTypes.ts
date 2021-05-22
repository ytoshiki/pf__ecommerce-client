export interface CartData {
  id: string;
  name: string;
  images: string[];
  category: string;
  price: number;
  quantity: number;
}

export interface CartState {
  cartItems: CartData[];
  sum: number;
}
