import { ProductCategory, ProductTheme, ProductTier, SortType } from '../enums/filter';

export interface Creator {
  name: string;
  isOnline: boolean;
  avatar: string;
}

export type TProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageBg: string;
  imageItem: string;
  category: string;
  creator: Creator;
  createdAt: string;
  tier: string;
  theme: string;
  tags: string[];
};

export type TFilterProduct = {
  tier?: string;
  theme?: string;
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  priceRange?: number[];
  sortTime?: string;
  sortPrice?: string;
  categories?: string[];
}; 