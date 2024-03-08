import React, { useState, ChangeEvent } from 'react';
import styles from './styles/SearchInput.module.scss';

interface Props {
  setSearchTerm: (term: string) => void;
}

function SearchInput({ setSearchTerm }: Props) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
