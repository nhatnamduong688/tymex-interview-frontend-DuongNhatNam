import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { debounce } from '../../../utils/helpers';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  initialValue?: string;
  debounceMs?: number;
  className?: string;
}

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  
  &::placeholder {
    color: #a3a3a3;
  }
`;

const SearchIcon = styled.svg`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: #737373;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #737373;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #525252;
  }
  
  &:focus {
    outline: none;
  }
`;

const SearchInput = ({
  placeholder = 'Search...',
  onSearch,
  initialValue = '',
  debounceMs = 300,
  className,
}: SearchInputProps) => {
  const [value, setValue] = useState(initialValue);
  
  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      onSearch(searchTerm);
    }, debounceMs),
    [onSearch, debounceMs]
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };
  
  const handleClear = () => {
    setValue('');
    onSearch('');
  };
  
  return (
    <SearchContainer className={className}>
      <SearchIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
      </SearchIcon>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        aria-label="Search"
      />
      {value && (
        <ClearButton onClick={handleClear} type="button" aria-label="Clear search">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </ClearButton>
      )}
    </SearchContainer>
  );
};

export default SearchInput; 