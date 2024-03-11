import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
const initialState: { loading: boolean } = {
  loading: true,
};

// Create a slice for managing loading state
export const dataIsLoadingSlice = createSlice({
  name: 'dataIsLoading',
  initialState,
  reducers: {
    /**
     * Reducer function to update the loading state.
     * @param state - The current state.
     * @param action - PayloadAction containing the loading status.
     */
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

// Export actions and reducer
export const { isLoading } = dataIsLoadingSlice.actions;
export default dataIsLoadingSlice.reducer;
