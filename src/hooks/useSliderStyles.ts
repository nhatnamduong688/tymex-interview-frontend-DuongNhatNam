import { useMemo } from 'react';
import type { SliderProps } from 'antd';
import { theme } from 'antd';

// Custom hook trả về styles cho slider
export const useSliderStyles = (
  options?: {
    isSquare?: boolean;
    size?: 'small' | 'default' | 'large';
    customColors?: {
      handle?: string;
      rail?: string;
      track?: string;
    }
  }
) => {
  const { token } = theme.useToken();
  const { isSquare = true, size = 'default', customColors } = options || {};
  
  // Tính toán kích thước dựa vào size option
  const handleSize = useMemo(() => {
    switch (size) {
      case 'small': return 12;
      case 'large': return 20;
      default: return 16;
    }
  }, [size]);
  
  // Tạo styles dựa vào options
  const styles: SliderProps['styles'] = useMemo(() => ({
    handle: {
      borderRadius: isSquare ? 0 : '50%',
      width: `${handleSize}px`,
      height: `${handleSize}px`,
      marginTop: `-${handleSize / 2 - 2}px`, // Center adjustment
      backgroundColor: customColors?.handle || token.colorPrimary,
      borderColor: customColors?.handle || token.colorPrimary,
    },
    rail: {
      backgroundColor: customColors?.rail || token.colorBgContainerDisabled,
    },
    track: {
      background: customColors?.track || token.colorPrimary,
    }
  }), [isSquare, handleSize, customColors, token]);
  
  return styles;
};

// Sử dụng:
// const sliderStyles = useSliderStyles({ 
//   isSquare: true, 
//   size: 'large',
//   customColors: { handle: '#ff4400' } 
// }); 