import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/types';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  skip: number;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  skip: 0,
};

export const fetchProducts = createAsyncThunk<Product[], number>(
  'products/fetchProducts',
  async (skip = 0) => {
    const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${skip}`);
    const data = await response.json();
    return data.products;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = [...state.items, ...action.payload];
        state.skip += 20;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productSlice.reducer;