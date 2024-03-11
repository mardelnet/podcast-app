import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

/**
 * Configures the Redux store with the provided reducers.
 * @returns {Store} The configured Redux store.
 */
const store = configureStore({
  reducer: {
    /**
     * Reducer for managing the state related to loaders.
     */
    loading: loadingReducer,
  },
});

export default store;
