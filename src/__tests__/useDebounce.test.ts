import { renderHook, act } from '@testing-library/react';
import useDebounce from '@/hooks/useDebounce';

describe('useDebounce Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500));
    
    expect(result.current).toBe('initial value');
  });

  it('returns the debounced value after the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Initial value is returned immediately
    expect(result.current).toBe('initial value');
    
    // Change the value
    rerender({ value: 'changed value', delay: 500 });
    
    // Value shouldn't change immediately
    expect(result.current).toBe('initial value');
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // After delay, the value should be updated
    expect(result.current).toBe('changed value');
  });

  it('uses default delay of 500ms when no delay is provided', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'initial value' } }
    );
    
    // Change the value
    rerender({ value: 'changed value' });
    
    // Value shouldn't change immediately
    expect(result.current).toBe('initial value');
    
    // Fast-forward time by less than the default delay
    act(() => {
      jest.advanceTimersByTime(400);
    });
    
    // Value should still be the initial value
    expect(result.current).toBe('initial value');
    
    // Complete the default delay
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // After default delay, the value should be updated
    expect(result.current).toBe('changed value');
  });

  it('cancels previous timeout when value changes rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Change value multiple times in quick succession
    rerender({ value: 'change 1', delay: 500 });
    
    // Fast-forward time partially
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Value should still be initial
    expect(result.current).toBe('initial value');
    
    // Change again before the delay has elapsed
    rerender({ value: 'change 2', delay: 500 });
    
    // Fast-forward time to complete first delay
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Value should still not be updated yet
    expect(result.current).toBe('initial value');
    
    // Complete the second delay
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Only the latest value should be reflected
    expect(result.current).toBe('change 2');
  });
}); 