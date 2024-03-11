import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';

describe('NotFound Component', () => {
  test('renders NotFound component correctly', () => {
    render(<NotFound />);
    const notFoundElement = screen.getByTestId('not-found-component');
    expect(notFoundElement).toBeInTheDocument();
  });

  test('renders "NotFound" text', () => {
    render(<NotFound />);
    const notFoundText = screen.getByText('NotFound');
    expect(notFoundText).toBeInTheDocument();
  });
});
