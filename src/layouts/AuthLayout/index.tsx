import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const AuthContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthLayout = () => {
  return (
    <AuthContainer>
      <h3>Auth layout is working!</h3>
      <Outlet />
    </AuthContainer>
  );
};

export default AuthLayout; 