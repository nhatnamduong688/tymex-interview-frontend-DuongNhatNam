import { ThemeConfig } from 'antd';

const themeFilter: ThemeConfig = {
  components: {
    Form: {
      colorBgContainer: 'transparent',
      // colorText: '#ffffff',
      colorTextDescription: 'rgba(255, 255, 255, 0.6)',
    },
    Input: {
      colorText: '#ffffff',
      colorBgContainer: '#31393E',
      colorBorder: '#31393E',
      hoverBorderColor: '#31393E',
      activeBorderColor: '#31393E',
      colorPrimaryHover: '#e6f7ff',
    },
    Slider: {
      railBg: '#31393E',
      trackBg: '#e6f7ff',
      handleColor: '#ffffff',
      handleActiveColor: '#ffffff',
      dotBorderColor: '#31393E',
    },
    Select: {
      colorBgContainer: '#31393E',
      colorBgElevated: '#31393E',
      // colorText: '#ffffff',
      colorTextPlaceholder: 'rgba(255, 255, 255, 0.45)',
      colorBorder: '#31393E',
      // colorPrimaryHover: '#e6f7ff',
      // optionSelectedColor: '#e6f7ff',
      optionSelectedBg: 'rgba(24, 144, 255, 0.1)',
      colorTextDisabled: 'rgba(255, 255, 255, 0.25)',
      optionHeight: 32,
    },
    Button: {
      primaryColor: '#1890ff',
      defaultBg: 'transparent',
      // defaultColor: '#ffffff',
      // defaultBorderColor: '#ffffff',
      textHoverBg: 'rgba(255, 255, 255, 0.1)',
    }
  },
};

export default themeFilter; 