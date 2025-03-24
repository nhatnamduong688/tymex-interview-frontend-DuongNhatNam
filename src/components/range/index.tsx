import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import useDebounce from '@/hooks/useDebounce';
import useFilters from '@/hooks/useFilters';
import './index.css';
import 'rc-slider/assets/index.css';

interface RangeProps {
  title: string;
  min: number;
  max: number;
  step: number;
  defaultValue: [number, number];
}

const Range = ({ title, min, max, step, defaultValue }: RangeProps) => {
  const searchParams = useSearchParams();
  const initialPrice = searchParams.get('price')
    ? (searchParams.get('price')?.split(',').map(Number) as [number, number])
    : defaultValue;

  const [inputPrice, setInputPrice] = useState<[number, number]>(initialPrice);
  const debouncedPrice = useDebounce(inputPrice);
  const { dataFilter, setDataFilter } = useFilters();
  const ref = useRef(false);

  useEffect(() => {
    if (!dataFilter.price || dataFilter.price.length === 0) {
      setInputPrice(defaultValue);
    }
  }, [dataFilter.price, defaultValue]);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      return;
    }
    setDataFilter({ ...dataFilter, price: debouncedPrice });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrice]);

  const handleChange = (value: number | number[]) => {
    setInputPrice(value as [number, number]);
  };

  return (
    <div className='range'>
      <p className='range-title'>{title}</p>
      <Slider
        min={min}
        max={max}
        step={step}
        range
        value={inputPrice}
        onChange={handleChange}
        handleRender={(node, handleProps) => {
          return (
            <Tooltip
              prefixCls='rc-slider-tooltip'
              overlay={`${handleProps.value} ETH`}
              visible={handleProps.dragging}
              placement='top'
              trigger='hover'
              key={handleProps.index}
            >
              {node}
            </Tooltip>
          );
        }}
      />
    </div>
  );
};

export default Range;
