import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Custom hook for debouncing values
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface SearchInputProps {
  initialValue?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  autoSearch?: boolean;
  debounceMs?: number;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  initialValue = '',
  placeholder = 'Search products...',
  onSearch,
  autoSearch = true,
  debounceMs = 500,
  className = ''
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);
  
  useEffect(() => {
    if (autoSearch && debouncedSearchTerm) {
      handleSearch();
    }
  }, [debouncedSearchTerm]);
  
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      // Default behavior: navigate to search page
      router.push({
        pathname: '/search',
        query: { q: searchTerm }
      });
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className={`search-input ${className}`}>
      <input
        type="text"
        className="search-input__field"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search"
      />
      <button 
        className="search-input__button"
        onClick={handleSearch}
        aria-label="Search"
        type="button"
      >
        <svg 
          className="search-input__icon" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchInput; 