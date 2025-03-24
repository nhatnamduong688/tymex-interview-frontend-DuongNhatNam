'use client';

import { useState, useRef } from 'react';
import Icon from '@/components/icon';
import './index.css';

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: Option[];
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const Dropdown = ({
  options,
  label,
  value,
  placeholder,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    onChange(value); // Gọi hàm onChange để cập nhật giá trị
    setIsOpen(false);
  };

  return (
    <div className='dropdown-container' ref={dropdownRef}>
      <label className='dropdown-label'>{label}</label>
      <div className='dropdown-content'>
        <div className='dropdown-selected' onClick={toggleDropdown}>
          <span className='dropdown-selected-text'>
            {options.find((option) => option.value === value)?.label ||
              placeholder ||
              'Select an option'}
          </span>
          <div className={`dropdown-icon ${isOpen ? 'open' : ''}`}>
            <Icon name='chevron-gray-down' />
          </div>
        </div>

        <ul
          className={`dropdown-options ${isOpen ? 'open' : ''}`}
          style={{ height: isOpen ? `${options.length * 50}px` : '0' }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-option ${
                option.value === value ? 'selected' : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
