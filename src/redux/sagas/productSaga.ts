import { call, put, takeLatest, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../slices/productSlice';

// Action types - Đây là các action riêng cho saga, không phải từ slice
export const FETCH_PRODUCTS_SAGA = 'products/fetchProductsSaga';
export const CREATE_PRODUCT_SAGA = 'products/createProductSaga';
export const UPDATE_PRODUCT_SAGA = 'products/updateProductSaga';
export const DELETE_PRODUCT_SAGA = 'products/deleteProductSaga';

// Action creators
export const fetchProductsSaga = () => ({
  type: FETCH_PRODUCTS_SAGA,
});

export const createProductSaga = (product: Omit<Product, 'id'>) => ({
  type: CREATE_PRODUCT_SAGA,
  payload: product,
});

export const updateProductSaga = (product: Product) => ({
  type: UPDATE_PRODUCT_SAGA,
  payload: product,
});

export const deleteProductSaga = (id: string) => ({
  type: DELETE_PRODUCT_SAGA,
  payload: id,
});

// Api functions
const fetchProductsApi = async () => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return await response.json();
};

const createProductApi = async (product: Omit<Product, 'id'>) => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return await response.json();
};

const updateProductApi = async (product: Product) => {
  const response = await fetch(`/api/products/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return await response.json();
};

const deleteProductApi = async (id: string) => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  return await response.json();
};

// Worker Sagas
function* fetchProductsSagaWorker() {
  try {
    // Gọi API thông qua effect 'call'
    const products: Product[] = yield call(fetchProductsApi);
    // Dispatch action thành công với effect 'put'
    yield put({ type: 'products/fetchProducts/fulfilled', payload: products });
  } catch (error) {
    // Dispatch action thất bại
    yield put({
      type: 'products/fetchProducts/rejected',
      payload: (error as Error).message,
    });
  }
}

function* createProductSagaWorker(action: PayloadAction<Omit<Product, 'id'>>) {
  try {
    const newProduct: Product = yield call(createProductApi, action.payload);
    yield put({ type: 'products/addProduct', payload: newProduct });
  } catch (error) {
    yield put({
      type: 'products/productError',
      payload: (error as Error).message,
    });
  }
}

function* updateProductSagaWorker(action: PayloadAction<Product>) {
  try {
    const updatedProduct: Product = yield call(updateProductApi, action.payload);
    yield put({ type: 'products/updateProduct', payload: updatedProduct });
  } catch (error) {
    yield put({
      type: 'products/productError',
      payload: (error as Error).message,
    });
  }
}

function* deleteProductSagaWorker(action: PayloadAction<string>) {
  try {
    yield call(deleteProductApi, action.payload);
    yield put({ type: 'products/deleteProduct', payload: action.payload });
  } catch (error) {
    yield put({
      type: 'products/productError',
      payload: (error as Error).message,
    });
  }
}

// Watcher Sagas
function* watchFetchProducts() {
  yield takeLatest(FETCH_PRODUCTS_SAGA, fetchProductsSagaWorker);
}

function* watchCreateProduct() {
  yield takeLatest(CREATE_PRODUCT_SAGA, createProductSagaWorker);
}

function* watchUpdateProduct() {
  yield takeLatest(UPDATE_PRODUCT_SAGA, updateProductSagaWorker);
}

function* watchDeleteProduct() {
  yield takeLatest(DELETE_PRODUCT_SAGA, deleteProductSagaWorker);
}

// Root Saga
export default function* productSaga() {
  yield all([
    watchFetchProducts(),
    watchCreateProduct(),
    watchUpdateProduct(),
    watchDeleteProduct(),
  ]);
} 