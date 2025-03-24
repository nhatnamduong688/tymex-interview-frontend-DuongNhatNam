'use client';

import { useEffect, useRef } from 'react';
import useDebounce from '@/hooks/useDebounce';
import Icon from '@/components/icon';
import './index.css';
import Input from '../input';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

const SearchInput = ({ value = '', onChange, onClear }: SearchInputProps) => {
  const debouncedValue = useDebounce(value);

  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      onChange(debouncedValue);
    }
    ref.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className='search-input'>
      <Input
        placeholder='Quick search'
        value={value}
        onChange={onChange}
        icon={<Icon name='search' />}
      />
      {value && (
        <div className='search-input-icon' onClick={onClear}>
          <Icon name='close' />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
