export interface CustomerData {
  id: string;
  username: string;
  purchasedItems: TPurchasedItems[];
  token: string | null;
}

export interface TPurchasedItems {
  images: string[];
  name: string;
  price: number;
  reviews: {
    comment: string;
    createdAt: string;
    customer: string;
    product: string;
    rating: number;
    _id: string;
  }[];
  _id: string;
}

export interface CustomerState {
  id: string;
  username: string;
  purchasedItems: TPurchasedItems[];
  token: string | null;
}
