import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProducts, selectFilteredProducts, selectProductLoading, selectProductError } from '../slices/productSlice';
import { fetchProductsSaga } from '../sagas/productSaga';

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const loading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  // Sử dụng Redux Thunk
  useEffect(() => {
    // Để load sản phẩm bằng Redux Thunk:
    dispatch(fetchProducts());
    
    // Hoặc có thể sử dụng Redux Saga:
    // dispatch(fetchProductsSaga());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}; 