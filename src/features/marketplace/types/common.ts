export interface DataResponse<T> {
  data: T;
  hasMore: boolean;
  nextOffset: number;
}

export interface ParamsPaging {
  limit: number;
  offset: number;
} 