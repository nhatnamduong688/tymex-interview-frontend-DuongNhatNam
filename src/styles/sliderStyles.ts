import type { SliderProps } from 'antd';
import type { GlobalToken } from 'antd/es/theme/interface';

/**
 * Style mặc định cho Slider với handle hình vuông
 * Chỉ định nghĩa hình dạng (shape), màu sắc sẽ được lấy từ theme token
 */
export const squareHandleSliderStyles: SliderProps['styles'] = {
  handle: { 
    borderRadius: 0, // Tạo góc vuông
    width: '16px',
    height: '16px',
    marginTop: '-7px',
    backgroundColor: 'var(--primary-bg-color, #da458f)',
    borderColor: 'var(--primary-bg-color, #da458f)',
    boxShadow: 'none',
    opacity: 1,
  },
  rail: { 
    backgroundColor: 'var(--slider-rail-color, rgba(58, 56, 65, 0.8))',
  },
  track: { 
    background: 'var(--primary-bg, linear-gradient(91.47deg, rgba(218, 69, 143, 0.8) -6%, rgba(218, 52, 221, 0.8) 113.05%))',
  }
};

/**
 * Style cho Slider với handle hình vuông lớn hơn
 * Thích hợp cho các UI cần touch target lớn hơn (mobile)
 */
export const largeSquareHandleSliderStyles: SliderProps['styles'] = {
  handle: { 
    borderRadius: 0,
    width: '20px',
    height: '20px',
    marginTop: '-8px',
    borderColor: '#da458f',
    backgroundColor: '#da458f',
    boxShadow: 'none',
    opacity: 1,
  },
  rail: { 
    backgroundColor: 'rgba(58, 56, 65, 0.8)',
    height: '4px',
  },
  track: { 
    background: '#da458f',
    height: '4px',
  }
};

/**
 * Style cho slider theo design mới với marks text ETH
 */
export const ethSliderStyles: SliderProps['styles'] = {
  handle: { 
    borderRadius: 0,
    width: '16px',
    height: '16px',
    marginTop: '-7px',
    borderColor: 'var(--primary-bg-color, #da458f)',
    backgroundColor: 'var(--primary-bg-color, #da458f)',
    boxShadow: 'none',
    opacity: 1,
    transform: 'translateX(-50%)'
  },
  rail: {
    backgroundColor: 'var(--slider-rail-color, rgba(58, 56, 65, 0.8))',
  },
  track: {
    background: 'var(--primary-bg, linear-gradient(91.47deg, rgba(218, 69, 143, 0.8) -6%, rgba(218, 52, 221, 0.8) 113.05%))',
  },
  mark: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: '12px',
    top: '20px',
  },
  markText: {
    color: '#d6d6d6',
    fontWeight: 500,
    fontSize: 14,
    '&:first-child': {
      transform: 'translateX(-50%)',
      textAlign: 'left',
    },
    '&:last-child': {
      transform: 'translateX(-50%)',
      textAlign: 'right',
    }
  }
};

/**
 * Function tạo styles dựa trên các tùy chọn
 * @param options - Các tùy chọn cho style
 * @returns SliderProps['styles'] - Style object
 */
export const createSliderStyles = (
  options?: {
    isSquare?: boolean;
    size?: 'small' | 'default' | 'large';
    customColors?: {
      handle?: string;
      rail?: string;
      track?: string;
    },
    withMarks?: boolean,
    currency?: 'USD' | 'ETH'
  }
): SliderProps['styles'] => {
  const { isSquare = true, size = 'default', customColors, withMarks = false, currency = 'USD' } = options || {};
  
  // Tính toán kích thước dựa vào size option
  let handleSize: number;
  switch (size) {
    case 'small': handleSize = 12; break;
    case 'large': handleSize = 20; break;
    default: handleSize = 16;
  }
  
  const styles: SliderProps['styles'] = {
    handle: {
      borderRadius: isSquare ? 0 : '50%',
      width: `${handleSize}px`,
      height: `${handleSize}px`,
      marginTop: `-${handleSize / 2 - 2}px`, // Center adjustment
      backgroundColor: customColors?.handle || 'var(--primary-bg-color, #da458f)',
      borderColor: customColors?.handle || 'var(--primary-bg-color, #da458f)',
      boxShadow: 'none',
      opacity: 1,
      transform: 'translateX(-50%)'
    },
    rail: {
      backgroundColor: customColors?.rail || 'var(--slider-rail-color, rgba(58, 56, 65, 0.8))',
    },
    track: {
      background: customColors?.track || 'var(--primary-bg, linear-gradient(91.47deg, rgba(218, 69, 143, 0.8) -6%, rgba(218, 52, 221, 0.8) 113.05%))',
    }
  };
  
  // Thêm styles cho marks nếu cần
  if (withMarks) {
    styles.mark = {
      color: 'rgba(255, 255, 255, 0.65)',
      fontSize: '12px',
      top: '20px',
    };
    styles.markText = {
      color: '#d6d6d6',
      fontWeight: 500,
      fontSize: 14,
      '&:first-child': {
        transform: 'translateX(-50%)',
        textAlign: 'left',
      },
      '&:last-child': {
        transform: 'translateX(-50%)',
        textAlign: 'right',
      }
    };
  }
  
  return styles;
}; 