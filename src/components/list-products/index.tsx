'use client';

import { Product as ProductType } from '@/types/product';
import Product from '@/components/product';
import './index.css';

type ListProductsProps = {
  products: ProductType[];
};

const ListProducts = ({ products }: ListProductsProps) => {
  return (
    <div className='list-products'>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ListProducts;
