import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import selectedProductReducer from '../features/products/selectedProductSlice';
import searchReducer from "../features/products/searchSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    selectedProduct: selectedProductReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;