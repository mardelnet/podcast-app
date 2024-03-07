import React, { useState, ChangeEvent } from 'react';

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
    <input
      type="text"
      placeholder="Search podcasts..."
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}

export default SearchInput;
