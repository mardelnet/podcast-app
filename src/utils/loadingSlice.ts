import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { loading: boolean } = {
  loading: true,
};

export const dataIsLoadingSlice = createSlice({
  name: 'dataIsLoading',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { isLoading } = dataIsLoadingSlice.actions;

export default dataIsLoadingSlice.reducer;