import styled from 'styled-components';
import { Layout } from 'antd';

const HeaderContainer = styled(Layout.Header)`
  background-color: rgba(15, 20, 40, 0.95) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(60, 80, 150, 0.2);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(to bottom, rgba(15, 20, 40, 0.5), transparent);
    z-index: -1;
    pointer-events: none;
  }
`;

export const HeaderLayout = () => {
  return <HeaderContainer />;
}; 