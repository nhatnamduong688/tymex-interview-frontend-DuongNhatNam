import { ThemeConfig } from 'antd';

const themeFilter: ThemeConfig = {
  components: {
    Form: {
      colorBgContainer: 'transparent',
      colorText: '#ffffff',
      colorTextDescription: 'rgba(255, 255, 255, 0.6)',
      itemMarginBottom: 24,
      verticalLabelPadding: "0 0 8px",
      labelColor: "#bdbdbd",
      labelFontSize: 14,
      labelFontWeight: 500,
    },
    Input: {
      colorText: '#ffffff',
      colorBgContainer: '#31393E',
      colorBorder: '#31393E',
      hoverBorderColor: '#31393E',
      activeBorderColor: '#da458f',
      colorPrimaryHover: '#da458f',
      borderRadius: 8,
      controlHeight: 40,
      addonBg: "rgba(218, 69, 143, 0.1)",
      activeShadow: "0 0 0 2px rgba(218, 69, 143, 0.2)",
    },
    Slider: {
      railBg: '#3a3841',
      trackBg: 'linear-gradient(91.47deg, rgba(218, 69, 143, 0.4) -6%, rgba(218, 52, 221, 0.4) 113.05%)',
      handleColor: '#da458f',
      handleActiveColor: '#da34dd',
      dotBorderColor: '#3a3841',
      railSize: 4,
    },
    Select: {
      colorBgContainer: '#31393E',
      colorBgElevated: '#333d42',
      colorText: '#ffffff',
      colorTextPlaceholder: 'rgba(255, 255, 255, 0.45)',
      colorBorder: '#31393E',
      colorPrimaryHover: '#da458f',
      optionSelectedColor: '#ffffff',
      optionSelectedBg: 'rgba(218, 69, 143, 0.2)',
      multipleItemBg: "rgba(218, 69, 143, 0.2)",
      colorTextDisabled: 'rgba(255, 255, 255, 0.25)',
      optionHeight: 36, 
      optionFontSize: 14,
      borderRadius: 8,
      borderRadiusSM: 6,
      controlHeight: 40,
      controlItemBgActive: "rgba(218, 69, 143, 0.1)",
      controlItemBgHover: "rgba(137, 136, 139, 0.1)",
    },
    Button: {
      colorPrimary: '#da458f',
      colorPrimaryHover: '#da34dd',
      defaultBg: 'transparent',
      defaultColor: '#bdbdbd',
      defaultBorderColor: '#5f5f5f',
      textHoverBg: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 8,
      controlHeight: 40,
      colorBorder: '#5f5f5f',
    },
    Divider: {
      marginLG: 16,
      colorSplit: "rgba(137, 136, 139, 0.2)",
    },
    Badge: {
      colorBgContainer: "#da458f",
    }
  },
};

export default themeFilter; 