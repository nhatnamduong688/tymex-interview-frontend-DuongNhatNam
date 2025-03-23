import React from 'react';
import { Slider, Form } from 'antd';
import { squareHandleSliderStyles, largeSquareHandleSliderStyles } from '../styles/sliderStyles';

const ExampleComponent: React.FC = () => {
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
          styles={squareHandleSliderStyles}
        />
      </Form.Item>
      
      <h3>Slider với handle hình vuông lớn hơn</h3>
      <Form.Item name="priceRangeLarge" label="Price Range (Large)">
        <Slider
          range
          min={0}
          max={200}
          defaultValue={[50, 150]}
          tooltip={{ formatter: value => `$${value}` }}
          styles={largeSquareHandleSliderStyles}
        />
      </Form.Item>
    </div>
  );
};

export default ExampleComponent; 