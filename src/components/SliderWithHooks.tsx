import React from 'react';
import { Slider, Form } from 'antd';
import { useSliderStyles } from '../hooks/useSliderStyles';

const SliderWithHooks: React.FC = () => {
  // Tạo các phiên bản styles khác nhau
  const defaultSquareStyles = useSliderStyles();
  const largeSquareStyles = useSliderStyles({ 
    size: 'large',
    customColors: { 
      handle: '#ff4400',
      track: 'linear-gradient(91.47deg, rgba(218, 69, 143, 0.4) -6%, rgba(218, 52, 221, 0.4) 113.05%)'
    }
  });
  const smallRoundStyles = useSliderStyles({ 
    isSquare: false,
    size: 'small'
  });

  return (
    <div className="slider-examples">
      <h3>Slider với handle hình vuông mặc định</h3>
      <Form.Item name="priceRange" label="Price Range">
        <Slider
          range
          min={0}
          max={200}
          defaultValue={[0, 200]}
          tooltip={{ formatter: value => `$${value}` }}
          styles={defaultSquareStyles}
        />
      </Form.Item>
      
      <h3>Slider với handle hình vuông lớn</h3>
      <Form.Item name="priceRangeLarge" label="Price Range (Large)">
        <Slider
          range
          min={0}
          max={200}
          defaultValue={[50, 150]}
          tooltip={{ formatter: value => `$${value}` }}
          styles={largeSquareStyles}
        />
      </Form.Item>
      
      <h3>Slider với handle tròn nhỏ</h3>
      <Form.Item name="priceRangeSmall" label="Price Range (Small Round)">
        <Slider
          range
          min={0}
          max={200}
          defaultValue={[25, 75]}
          tooltip={{ formatter: value => `$${value}` }}
          styles={smallRoundStyles}
        />
      </Form.Item>
    </div>
  );
};

export default SliderWithHooks; 