// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';
// import Home from './pages/Home';
// import Podcast from './pages/Podcast';
// import Episode from './pages/Episode';
// import NotFound from './pages/NotFound';
// import Header from './components/Header';

// jest.mock('./pages/Home', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="home-component">Home component</div>),
// }));

// jest.mock('./pages/Podcast', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="podcast-component">Podcast component</div>),
// }));

// jest.mock('./pages/Episode', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="episode-component">Episode component</div>),
// }));

// jest.mock('./pages/NotFound', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="not-found-component">NotFound component</div>),
// }));

// describe('App component', () => {
//   it('renders header', () => {
//     render(<Header />);
//     const headerElement = screen.getByRole('banner');
//     expect(headerElement).toBeInTheDocument();
//   });

//   it('renders Home component', () => {
//     render(<Home />);
//     const homeElement = screen.getByTestId('home-component');
//     expect(homeElement).toBeInTheDocument();
//   });

//   it('renders Podcast component', () => {
//     render(<Podcast />);
//     const podcastElement = screen.getByTestId('podcast-component');
//     expect(podcastElement).toBeInTheDocument();
//   });

//   it('renders Episode component', () => {
//     render(<Episode />);
//     const episodeElement = screen.getByTestId('episode-component');
//     expect(episodeElement).toBeInTheDocument();
//   });

//   it('renders NotFound component', () => {
//     render(<NotFound />);
//     const notFoundElement = screen.getByTestId('not-found-component');
//     expect(notFoundElement).toBeInTheDocument();
//   });
// });
