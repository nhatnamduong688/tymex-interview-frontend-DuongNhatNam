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
  category: ProductCategory | string;
  creator: Creator;
  createdAt: string;
  tier: ProductTier | string;
  theme: ProductTheme | string;
  tags: string[];
};

export type TFilterProduct = {
  // Search/filter fields
  keyword?: string;         // Sử dụng cho title_like, sync với search
  search?: string;          // Sử dụng cho title_like, sync với keyword
  
  // Category filtering
  categories?: (ProductCategory | string)[];    // Support both enum and string values
  
  // Product attributes filtering
  tier?: ProductTier | string;            // Support both enum and string values
  theme?: ProductTheme | string;           // Support both enum and string values
  
  // Price filtering
  minPrice?: string;        // Sử dụng cho price_gte
  maxPrice?: string;        // Sử dụng cho price_lte
  priceRange?: [number, number]; // UI range slider, được convert thành minPrice/maxPrice
  
  // Sorting
  sortTime?: SortType | string;        // Sử dụng cho _sort=createdAt&_order=asc/desc
  sortPrice?: SortType | string;       // Sử dụng cho _sort=price&_order=asc/desc
  
  // Pagination - thường không là part của filter nhưng đôi khi được thêm vào
  _page?: number;           // Trang hiện tại
  _limit?: number;          // Số item trên mỗi trang
}; 