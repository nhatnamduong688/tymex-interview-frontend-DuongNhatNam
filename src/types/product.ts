import { ProductCategory, ProductTheme, ProductTier, SortType } from '@/enums/filter';

export type TProduct = {
  id?: string;
  tier: string;
  theme: string;
  created: string;
  backgroundItem: string;
  item: string;
  category: string;
  nameItem: string;
  price: number;
  nameCreator: string;
  statusOnline: boolean;
  tags?: string[];
  description?: string;
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