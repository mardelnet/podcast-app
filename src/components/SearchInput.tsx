import React, { useState, ChangeEvent } from 'react';
import styles from './styles/SearchInput.module.scss';

/**
 * Interface representing the properties of the SearchInput component.
 */
interface Props {
  /**
   * Function to set the search term.
   * @param term - The search term to set.
   */
  setSearchTerm: (term: string) => void;
}

/**
 * Functional component representing a search input field.
 * @param props - Props containing setSearchTerm function.
 * @returns JSX.Element representing the SearchInput component.
 */
function SearchInput({ setSearchTerm }: Props): JSX.Element {
  // State for input value
  const [inputValue, setInputValue] = useState('');

  /**
   * Event handler for input change.
   * Sets the input value and triggers setSearchTerm.
   * @param e - ChangeEvent from the input field.
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value); // Pass the value to the parent component
  };

  return (
    <div className={styles['search-container']}>
      <input
        className={styles['search-input']}
        type="text"
        placeholder="Search podcasts..."
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchInput;
