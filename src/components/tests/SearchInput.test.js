import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchInput from '../SearchInput';

describe('SearchInput component', () => {
  it('renders correctly', () => {
    const setSearchTermMock = jest.fn();
    render(<SearchInput setSearchTerm={setSearchTermMock} />);
    const inputElement = screen.getByPlaceholderText('Search podcasts...');
    expect(inputElement).toBeInTheDocument();
  });

  it('triggers setSearchTerm on input change', () => {
    const setSearchTermMock = jest.fn();
    render(<SearchInput setSearchTerm={setSearchTermMock} />);
    const inputElement = screen.getByPlaceholderText('Search podcasts...');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(setSearchTermMock).toHaveBeenCalledWith('test');
  });

  it('updates input value on change', () => {
    const setSearchTermMock = jest.fn();
    render(<SearchInput setSearchTerm={setSearchTermMock} />);
    const inputElement = screen.getByPlaceholderText('Search podcasts...');

    fireEvent.change(inputElement, { target: { value: 'updated value' } });

    expect(inputElement.value).toBe('updated value');
  });
});
