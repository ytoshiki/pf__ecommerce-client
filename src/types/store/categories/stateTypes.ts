export interface CategoryData {
  id: string;
  name: string;
  image: string;
  heading: string;
  paragraph: string | null;
  products: any[];
}

export interface CategoryState {
  categories: CategoryData[];
  loading: boolean;
}
