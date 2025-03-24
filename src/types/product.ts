export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  isFavorite: boolean;
  createdAt: number;
  theme: string;
  tier: string;
  imageId: number;
  author: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    avatar: string;
    onlineStatus: string;
  };
};

export type FilterData = {
  search: string;
  tier: string;
  priceOrder: string;
  theme: string;
  time: string;
  category?: string;
  page?: number;
  price?: number[];
};

export type QuickFilter = {
  id: number;
  name: string;
  value: string;
  type: string;
};
