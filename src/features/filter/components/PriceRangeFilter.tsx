import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text } from '../../../design-system/primitives/Text';
import { debounce } from '../../../utils/helpers';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  initialMin?: number;
  initialMax?: number;
  currency?: string;
  onChange: (min: number, max: number) => void;
  debounceMs?: number;
  className?: string;
}

const Container = styled.div`
  padding: 1.5rem 0;
`;

const Title = styled(Text)`
  margin-bottom: 1rem;
`;

const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 0.5rem;
  background-color: #d4d4d4;
`;

const RangeContainer = styled.div`
  position: relative;
  height: 4px;
  background-color: #e5e5e5;
  border-radius: 2px;
`;

const RangeProgress = styled.div<{ $left: number; $width: number }>`
  position: absolute;
  height: 100%;
  background-color: #1890ff;
  border-radius: 2px;
  left: ${({ $left }) => $left}%;
  width: ${({ $width }) => $width}%;
`;

const SliderThumb = styled.div<{ $position: number }>`
  position: absolute;
  top: 50%;
  left: ${({ $position }) => $position}%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background-color: white;
  border: 2px solid #1890ff;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.3);
  }
`;

const PriceDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #737373;
`;

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  initialMin,
  initialMax,
  currency = 'USD',
  onChange,
  debounceMs = 300,
  className,
}: PriceRangeFilterProps) => {
  const [min, setMin] = useState(initialMin ?? minPrice);
  const [max, setMax] = useState(initialMax ?? maxPrice);
  
  // Calculate slider positions and progress
  const minPosition = ((min - minPrice) / (maxPrice - minPrice)) * 100;
  const maxPosition = ((max - minPrice) / (maxPrice - minPrice)) * 100;
  const progressWidth = maxPosition - minPosition;
  
  // Format price displays
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  // Create debounced version of onChange
  const debouncedOnChange = React.useCallback(
    debounce((min: number, max: number) => {
      onChange(min, max);
    }, debounceMs),
    [onChange, debounceMs]
  );
  
  // Call onChange when min/max change
  useEffect(() => {
    debouncedOnChange(min, max);
  }, [min, max, debouncedOnChange]);
  
  // Handle min input change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return;
    
    setMin(Math.max(minPrice, Math.min(value, max - 1)));
  };
  
  // Handle max input change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return;
    
    setMax(Math.min(maxPrice, Math.max(value, min + 1)));
  };
  
  return (
    <Container className={className}>
      <Title variant="body" weight="semibold">Price Range</Title>
      
      <InputsContainer>
        <Input
          type="number"
          min={minPrice}
          max={max - 1}
          value={min}
          onChange={handleMinChange}
          aria-label="Minimum price"
        />
        <Divider />
        <Input
          type="number"
          min={min + 1}
          max={maxPrice}
          value={max}
          onChange={handleMaxChange}
          aria-label="Maximum price"
        />
      </InputsContainer>
      
      <RangeContainer>
        <RangeProgress $left={minPosition} $width={progressWidth} />
        <SliderThumb 
          $position={minPosition} 
          tabIndex={0}
          role="slider"
          aria-label="Minimum price"
          aria-valuemin={minPrice}
          aria-valuemax={max - 1}
          aria-valuenow={min}
        />
        <SliderThumb 
          $position={maxPosition} 
          tabIndex={0}
          role="slider"
          aria-label="Maximum price"
          aria-valuemin={min + 1}
          aria-valuemax={maxPrice}
          aria-valuenow={max}
        />
      </RangeContainer>
      
      <PriceDisplay>
        <div>{formatPrice(minPrice)}</div>
        <div>{formatPrice(maxPrice)}</div>
      </PriceDisplay>
    </Container>
  );
};

export default PriceRangeFilter; 