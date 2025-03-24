export interface ProductVariable {
  filterData: {
    search: string;
    tier: string;
    priceOrder: string;
    theme: string;
    time: string;
    category?: string;
    price?: string;
  };
  page: number;
  pageSize: number;
}
