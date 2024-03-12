import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './utils/store';

test('renders header component', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const headerElement = screen.getByTestId('header');
  expect(headerElement).toBeInTheDocument();
});

test('renders Home component for root path', () => {
  render(
    <Provider store={store}>
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
    </Provider>
  );

  const homeElement = screen.getByText(/Podcaster/i);
  expect(homeElement).toBeInTheDocument();
});

test('renders NotFound component for unknown paths', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const notFoundElement = screen.getByTestId('not-found-component');
  expect(notFoundElement).toBeInTheDocument();
});
