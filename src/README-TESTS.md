# Cấu trúc Tests

Dự án sử dụng mô hình Feature-based cho việc tổ chức tests. Tests được đặt gần với code được test, trong thư mục `__tests__` bên trong từng module.

## Thư mục cấu trúc tests

```
src/
├── features/
│   ├── marketplace/
│   │   ├── components/
│   │   │   ├── __tests__/        # Tests cho UI components
│   │   ├── store/
│   │   │   ├── __tests__/        # Tests cho Redux slices
│   │   │   │   ├── filterSlice.test.ts
│   │   │   │   └── productsSlice.test.ts
│   │   ├── services/
│   │   │   ├── __tests__/        # Tests cho API services
│   │   │   │   ├── api.test.ts
│   │   │   │   └── productApi.test.ts
├── shared/
│   ├── components/
│   │   ├── __tests__/            # Tests cho shared components
│   ├── hooks/
│   │   ├── __tests__/            # Tests cho shared hooks
├── core/
│   ├── store/
│   │   ├── __tests__/            # Tests cho core store functionality
│   │   │   └── urlSyncMiddleware.test.ts
```

## Chạy Tests

### Chạy tất cả tests

```
yarn test
```

### Chạy tests cho một phần cụ thể

```
yarn test:features  # Chạy tất cả tests trong features/
yarn test:shared    # Chạy tất cả tests trong shared/
yarn test:core      # Chạy tất cả tests trong core/
```

### Chạy một test cụ thể

```
yarn test src/features/marketplace/store/__tests__/filterSlice.test.ts
```

### Chạy tests với coverage

```
yarn test:coverage
```

## Mocks và Test Utilities

Các mock objects và test utilities được tập trung trong các file `__tests__/index.ts` để tái sử dụng trong nhiều tests.

## Quy ước đặt tên

- File tests cần có hậu tố `.test.ts` hoặc `.test.tsx`
- Mỗi module cần có thư mục `__tests__` riêng
- Tên file test nên khớp với tên file được test (ví dụ: `filterSlice.ts` -> `filterSlice.test.ts`)

## Best Practices

1. **Tổ chức tests**: Mỗi bài test nên tập trung vào một khía cạnh cụ thể của chức năng
2. **Mocks**: Sử dụng mocks để cô lập các thành phần và giảm phụ thuộc
3. **Test Data**: Tạo test data dễ đọc và có ý nghĩa
4. **Coverage**: Cố gắng đạt được coverage cao nhất có thể cho code business logic
5. **Snapshot Tests**: Sử dụng snapshot tests cho UI components để phát hiện thay đổi không mong muốn
