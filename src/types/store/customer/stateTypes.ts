export interface CustomerData {
  id: string;
  username: string;
  purchasedItems: any[];
  token: string | null;
}

export interface CustomerState {
  id: string;
  username: string;
  purchasedItems: any[];
  token: string | null;
}
