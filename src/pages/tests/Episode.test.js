import React from 'react';
import { render } from '@testing-library/react';
import Episode from '../Episode';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../../utils/loadingSlice';

const store = configureStore({
  reducer: loadingReducer
});

describe('Episode Component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
          <Episode />
      </Provider>
    );
  });
});
