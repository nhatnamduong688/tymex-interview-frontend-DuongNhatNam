import { ThemeConfig } from 'antd';

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#1890ff',
    colorTextBase: '#ffffff',
    colorBgBase: '#17161A',
    fontFamily: 'Inter, sans-serif',
    borderRadius: 8,
    fontSize: 14,
  },
  components: {
    Button: {
      colorPrimary: '#1890ff',
      algorithm: true,
      primaryColor: '#1890ff',
      defaultBg: 'transparent',
      defaultColor: '#ffffff',
      defaultBorderColor: '#ffffff',
    },
    Card: {
      colorBgContainer: '#3a384199',
      colorBorderSecondary: 'transparent',
      colorText: '#ffffff',
      colorTextHeading: '#ffffff',
      borderRadiusLG: 10,
      colorTextDescription: 'rgba(255, 255, 255, 0.65)',
    },
    Typography: {
      colorText: '#ffffff',
      colorTextHeading: '#ffffff',
      colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
    },
    Input: {
      colorText: '#ffffff',
      colorBgContainer: '#31393E',
      colorBorder: '#31393E',
      colorPrimaryHover: '#40a9ff',
    },
    Select: {
      colorBgContainer: '#31393E',
      colorText: '#ffffff',
      colorTextPlaceholder: 'rgba(255, 255, 255, 0.45)',
      colorBorder: '#31393E',
      colorPrimaryHover: '#40a9ff',
      colorTextDisabled: 'rgba(255, 255, 255, 0.25)',
      optionSelectedBg: 'rgba(24, 144, 255, 0.1)',
    },
    Menu: {
      colorItemBg: 'transparent',
      colorItemText: '#ffffff',
      colorItemTextHover: '#1890ff',
      colorItemTextSelected: '#1890ff',
      colorActiveBarBorderSize: 0,
      colorItemBgHover: 'rgba(255, 255, 255, 0.05)',
      colorItemBgSelected: 'rgba(24, 144, 255, 0.1)',
    },
    Layout: {
      colorBgHeader: '#17161A',
      colorBgBody: '#17161A',
      colorBgTrigger: '#17161A',
      colorBgContainer: '#17161A',
    },
    Table: {
      colorText: '#ffffff',
      colorTextHeading: '#ffffff',
      colorBgContainer: '#31393E',
      colorBorderSecondary: '#31393E',
    },
    Modal: {
      colorBgElevated: '#31393E',
      colorText: '#ffffff',
    },
    Tabs: {
      colorText: 'rgba(255, 255, 255, 0.65)',
      colorTextHeading: '#ffffff',
      inkBarColor: '#1890ff',
      itemHoverColor: '#ffffff',
      itemSelectedColor: '#1890ff',
    },
  },
};

export default themeConfig; 