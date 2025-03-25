# Redux Integration Guide

Dự án này được tích hợp Redux để quản lý trạng thái ứng dụng, sử dụng Redux Toolkit, Redux Thunk và Redux Saga.

## Cấu trúc thư mục

```
src/redux/
  ├── hooks.ts             # Custom hooks cho Redux
  ├── providers.tsx        # Redux Provider
  ├── rootReducer.ts       # Kết hợp các reducer
  ├── store.ts             # Cấu hình store Redux
  ├── slices/              # Redux slices (sử dụng RTK)
  │   ├── productSlice.ts
  │   └── authSlice.ts
  ├── sagas/               # Redux sagas
  │   ├── rootSaga.ts
  │   ├── productSaga.ts
  │   └── authSaga.ts
  ├── services/            # API services
  │   ├── api.ts           # Base API service
  │   ├── productService.ts
  │   └── authService.ts
  └── examples/            # Các ví dụ sử dụng
      ├── ProductList.tsx
      └── LoginForm.tsx
```

## Cách sử dụng

### 1. Kích hoạt Redux cho toàn bộ ứng dụng

Mở `src/app/layout.tsx` và thêm ReduxProviders:

```tsx
import { ReduxProviders } from '@/redux/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProviders>{children}</ReduxProviders>
      </body>
    </html>
  );
}
```

### 2. Sử dụng Redux trong Component

```tsx
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAllProducts, fetchProducts } from '@/redux/slices/productSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### 3. Sử dụng Redux Saga

```tsx
import { useAppDispatch } from '@/redux/hooks';
import { fetchProductsSaga } from '@/redux/sagas/productSaga';

function MyComponent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsSaga());
  }, [dispatch]);

  // ...
}
```

### 4. API Services

Các API services cung cấp các phương thức để gọi API và có thể sử dụng độc lập với Redux:

```tsx
import { ProductService } from '@/redux/services/productService';

async function loadProducts() {
  try {
    const products = await ProductService.getProducts();
    // Handle data
  } catch (error) {
    // Handle error
  }
}
```

## Best Practices

1. Sử dụng `useAppDispatch` và `useAppSelector` thay vì các hooks nguyên bản.
2. Tách logic API vào các services.
3. Sử dụng selectors để truy cập state.
4. Sử dụng Redux Toolkit cho các tác vụ đơn giản và Redux Saga cho các flow phức tạp.
