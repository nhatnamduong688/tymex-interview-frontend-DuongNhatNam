import { createGlobalStyle } from "styled-components";
import { cssVariables } from "./theme";

const GlobalStyle = createGlobalStyle`
  ${cssVariables}
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--body-font);
    background-color: var(--background);
    color: var(--text);
    font-size: var(--font-size-md);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--heading-font);
    margin-bottom: var(--spacing-md);
    font-weight: 500;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: var(--transitions-fast);
    
    &:hover {
      color: var(--primary-light);
    }
  }

  button {
    cursor: pointer;
    font-family: var(--body-font);
  }

  input, select, textarea {
    font-family: var(--body-font);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Container styles */
  .container {
    width: 100%;
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
  }

  /* Layout utilities */
  .flex {
    display: flex;
  }

  .flex-column {
    flex-direction: column;
  }

  .justify-between {
    justify-content: space-between;
  }

  .justify-center {
    justify-content: center;
  }

  .align-center {
    align-items: center;
  }

  .text-center {
    text-align: center;
  }

  /* Custom styles for Ant Design components */
  .ant-form-item {
    margin-bottom: var(--spacing-md);
  }

  .ant-form-item-control-input {
    min-height: auto;
  }

  .ant-input, 
  .ant-select-selector,
  .ant-select-dropdown {
    background-color: var(--background-light) !important;
    border-color: transparent !important;
    color: var(--text) !important;
  }

  .ant-input-affix-wrapper {
    background-color: var(--background-light) !important;
    border-color: transparent !important;
    
    .ant-input {
      background-color: transparent !important;
    }
  }

  .ant-select-dropdown {
    background-color: var(--background-light) !important;
  }

  .ant-select-item {
    color: var(--text) !important;
  }

  .ant-select-item-option-selected {
    background-color: rgba(218, 69, 143, 0.2) !important;
  }

  .ant-btn-primary {
    background: var(--primary-bg);
    border: none;
    
    &:hover {
      background: var(--primary-hover) !important;
    }
  }

  /* Style for filter form container */
  .container-filter {
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    background-color: var(--background-light);
    margin-bottom: var(--spacing-xl);
  }

  /* Style for action buttons in filter form */
  .action-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-lg);
    
    .ant-btn {
      min-width: 120px;
    }
  }
  
  /* Slider customization */
  .ant-slider-mark-text {
    color: var(--text-secondary) !important;
  }
  
  .ant-slider-mark-text:first-child {
    transform: translateX(0) !important;
    left: 0 !important;
  }

  .ant-slider-mark-text:last-child {
    transform: translateX(-100%) !important;
    left: 100% !important;
  }
  
  .ant-form-item-label > label {
    color: var(--text) !important;
    font-weight: 500;
  }
`;

export default GlobalStyle; 