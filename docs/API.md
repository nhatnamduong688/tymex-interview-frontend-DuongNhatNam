# API Documentation

This document describes the API architecture and usage patterns in the application.

## Architecture

The API layer is organized following these principles:

1. **Domain-Driven Design**: API interactions are organized around business domains
2. **Repository Pattern**: Domain entities are accessed through repositories
3. **Abstraction**: Business logic is decoupled from API implementation details
4. **Type Safety**: All API responses are typed for better developer experience

## Implementation

### API Service

The `ApiService` class provides a base implementation for HTTP requests:

```typescript
import { apiClient } from '../infrastructure/api/client';

// GET request
const data = await apiClient.get<ResponseType>('/endpoint', { param: 'value' });

// POST request
const result = await apiClient.post<ResultType>('/endpoint', { data: 'value' });

// PUT request
await apiClient.put<void>('/endpoint', { data: 'updated' });

// DELETE request
await apiClient.delete<void>('/endpoint');
```

### Repositories

Repositories provide domain-specific methods for accessing data:

```typescript
import { ProductApiRepository } from '../infrastructure/api';

const productRepo = new ProductApiRepository();

// Get a product by ID
const product = await productRepo.getById('123');

// List products with filters
const products = await productRepo.list(
  { categoryId: '456', minPrice: 10, maxPrice: 100 },
  'price_asc',
  { page: 1, perPage: 20 }
);
```

## Error Handling

API errors are handled using the `ApiError` class:

```typescript
import { ApiError } from '../infrastructure/api';

try {
  await apiClient.get('/endpoint');
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error ${error.status}: ${error.message}`);
    // Handle specific error codes
    if (error.status === 401) {
      // Handle unauthorized
    }
  } else {
    // Handle other errors
  }
}
```

## API Endpoints

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/api/products` | GET | List products | `categoryId`, `minPrice`, `maxPrice`, `search`, `page`, `perPage`, `sort` |
| `/api/products/:id` | GET | Get product by ID | - |
| `/api/products/featured` | GET | Get featured products | `limit` |
| `/api/categories` | GET | List categories | - |
