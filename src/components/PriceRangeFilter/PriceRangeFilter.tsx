import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  initialMin?: number;
  initialMax?: number;
  onChange?: (min: number, max: number) => void;
  applyOnChange?: boolean;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  min,
  max,
  initialMin = min,
  initialMax = max,
  onChange,
  applyOnChange = false
}) => {
  const router = useRouter();
  const [range, setRange] = useState<[number, number]>([initialMin, initialMax]);
  
  useEffect(() => {
    if (applyOnChange) {
      handleApply();
    }
  }, [range]);
  
  const handleChange = (value: [number, number]) => {
    setRange(value);
  };
  
  const handleApply = () => {
    if (onChange) {
      onChange(range[0], range[1]);
    } else {
      // Default behavior: update URL query params
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          minPrice: range[0],
          maxPrice: range[1]
        }
      });
    }
  };
  
  return (
    <div className="price-range-filter">
      <h3 className="price-range-filter__title">Price Range</h3>
      
      <div className="price-range-filter__slider">
        {/* Slider implementation would go here */}
        {/* For a real implementation, you would use a slider library like rc-slider */}
        <div className="price-range-filter__slider-placeholder">
          Slider: {range[0]} - {range[1]}
        </div>
      </div>
      
      <div className="price-range-filter__inputs">
        <div className="price-range-filter__input-group">
          <label htmlFor="min-price">Min</label>
          <input
            id="min-price"
            type="number"
            min={min}
            max={range[1]}
            value={range[0]}
            onChange={(e) => setRange([Number(e.target.value), range[1]])}
          />
        </div>
        
        <div className="price-range-filter__input-group">
          <label htmlFor="max-price">Max</label>
          <input
            id="max-price"
            type="number"
            min={range[0]}
            max={max}
            value={range[1]}
            onChange={(e) => setRange([range[0], Number(e.target.value)])}
          />
        </div>
      </div>
      
      {!applyOnChange && (
        <button 
          className="price-range-filter__apply"
          onClick={handleApply}
        >
          Apply
        </button>
      )}
    </div>
  );
};

export default PriceRangeFilter; 