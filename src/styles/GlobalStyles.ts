import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    --primary-bg: ${props => props.theme.colors.primaryGradient};
    --secondary-color: ${props => props.theme.colors.secondary};
    --header-height: ${props => props.theme.layout.headerHeight};
    --mobile-header-height: ${props => props.theme.layout.mobileHeaderHeight};
    --heading-font: ${props => props.theme.fonts.heading};
    font-family: ${props => props.theme.fonts.body};
  }

  .ant-btn {
    > span {
      font-weight: 600;
    }

    &-primary {
      background: var(--primary-bg) !important;
      box-shadow: 0 0 50px 0 #bb4bff52;
    }
  }

  #nprogress .bar {
    background: #da34dd !important;
    height: 4px !important;
    z-index: 120000000 !important;
  }

  #nprogress .spinner {
    display: none !important;
  }

  /* Tạm thời bỏ @font-face cho đến khi có file font */
  /* @font-face {
    font-family: 'Drone Ranger Pro';
    src: url('/assets/fonts/DroneRangerPro.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  } */
`;

export default GlobalStyles; 