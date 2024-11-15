import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/types';

interface SelectedProductState {
  product: Product | null;
}

const initialState: SelectedProductState = {
  product: null,
};

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    setSelectedProduct(state, action: PayloadAction<Product | null>) {
      state.product = action.payload;
    },
  },
});

export const { setSelectedProduct } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;