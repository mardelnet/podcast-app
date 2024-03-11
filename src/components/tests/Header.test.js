import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Header from '../Header';

const mockStore = configureMockStore();

describe('Header component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      loading: {
        loading: false
      }
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
  });

  it('renders the correct text', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Podcaster')).toBeInTheDocument();
  });

  it('does not render loader when data is not loading', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
