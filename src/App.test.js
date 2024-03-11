import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import App from './App';

describe('App Component', () => {
  test('renders Header component', () => {
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

  test('renders Podcast component for /podcast/:podcastId path', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/podcast/123']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const podcastElement = screen.getByTestId('podcast');
    expect(podcastElement).toBeInTheDocument();
  });

  test('renders Episode component for /podcast/:podcastId/episode/:episodeId path', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/podcast/123/episode/456']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const episodeElement = screen.getByTestId('episode');
    expect(episodeElement).toBeInTheDocument();
  });

  test('renders NotFound component for any other path', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/random-path']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const notFoundElement = screen.getByTestId('not-found-component');
    expect(notFoundElement).toBeInTheDocument();
  });
});
