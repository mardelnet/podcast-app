import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../loadingSlice';
import { RootState } from '../store';

describe('Redux Store Configuration', () => {
  it('should configure the store with loading reducer', () => {
    const store = configureStore({
      reducer: {
        loading: loadingReducer,
      },
    });

    // Check if the store is defined
    expect(store).toBeDefined();

    // Check if the store has the correct state shape
    const state: RootState = store.getState();
    expect(state).toEqual({
      loading: {
        loading: true,
      },
    });
  });
});
