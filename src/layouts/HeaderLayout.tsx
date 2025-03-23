import styled from 'styled-components';
import { Layout } from 'antd';

const HeaderContainer = styled(Layout.Header)`
  background-color: rgba(15, 20, 40, 0.85) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(60, 80, 150, 0.2);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
`;

export const HeaderLayout = () => {
  return <HeaderContainer />;
}; 