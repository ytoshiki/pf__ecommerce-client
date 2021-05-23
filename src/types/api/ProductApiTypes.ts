import { CategoryApiTypes } from './CategoryApiTypes';
import { ReviewApiTypes } from './ReviewApiTypes';

export interface ProductApiTypes {
  images: string[];
  reviews: ReviewApiTypes[] | [];
  _id: string;
  name: string;
  category: CategoryApiTypes;
  price: number;
  createdAt: string;
}
