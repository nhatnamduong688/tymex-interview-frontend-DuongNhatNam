import axios from 'axios';
import { ProductVariable } from './type';

export const getProducts = async (request: ProductVariable) => {
  const response = await axios.get(
    `/api/products?${new URLSearchParams({
      ...request.filterData,
      page: request.page.toString(),
      pageSize: request.pageSize.toString(),
    }).toString()}`
  );
  return response.data;
};
