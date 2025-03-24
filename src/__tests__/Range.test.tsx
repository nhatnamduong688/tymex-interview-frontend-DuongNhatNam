import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../test-utils';
import Range from '@/components/range';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: jest.fn((param) => param === 'price' ? '1,5' : null),
    toString: jest.fn(() => ''),
  }),
}));

// Mock the useFilters hook
jest.mock('@/hooks/useFilters', () => ({
  __esModule: true,
  default: () => ({
    dataFilter: { price: [1, 5] },
    setDataFilter: jest.fn(),
  }),
}));

// Mock the rc-slider and rc-tooltip components
jest.mock('rc-slider', () => {
  return {
    __esModule: true,
    default: ({ min, max, step, range, value, onChange, handleRender }: any) => {
      // Simulate the slider component
      return (
        <div data-testid="mock-slider" className="rc-slider">
          <div data-testid="slider-min" onClick={() => onChange([min, value[1]])}>
            {value[0]}
          </div>
          <div data-testid="slider-max" onClick={() => onChange([value[0], max])}>
            {value[1]}
          </div>
          {handleRender(
            <div data-testid="slider-handle" />,
            { value: value[0], dragging: false, index: 0 }
          )}
        </div>
      );
    },
  };
});

jest.mock('rc-tooltip', () => {
  return {
    __esModule: true,
    default: ({ children }: any) => <div data-testid="mock-tooltip">{children}</div>,
  };
});

describe('Range Component', () => {
  const defaultProps = {
    title: 'Price Range',
    min: 0,
    max: 10,
    step: 0.1,
    defaultValue: [0, 10] as [number, number],
  };

  it('renders the range component with correct title', () => {
    render(<Range {...defaultProps} />);
    
    expect(screen.getByText('Price Range')).toBeInTheDocument();
    expect(screen.getByTestId('mock-slider')).toBeInTheDocument();
  });

  it('displays the correct initial values from URL params', () => {
    render(<Range {...defaultProps} />);
    
    // Initial values should be from the mock URL params (1,5)
    expect(screen.getByTestId('slider-min').textContent).toBe('1');
    expect(screen.getByTestId('slider-max').textContent).toBe('5');
  });

  it('updates values when slider is changed', () => {
    render(<Range {...defaultProps} />);
    
    // Change min value to minimum (which is 0)
    fireEvent.click(screen.getByTestId('slider-min'));
    expect(screen.getByTestId('slider-min').textContent).toBe('0');
    
    // Change max value to maximum (which is 10)
    fireEvent.click(screen.getByTestId('slider-max'));
    expect(screen.getByTestId('slider-max').textContent).toBe('10');
  });
}); 