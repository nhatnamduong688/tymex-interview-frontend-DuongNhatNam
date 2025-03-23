import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import TopProgressBar from "../../components/TopProgressBar";

const AuthContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthLayout = () => {
  return (
    <StyledLayout>
      <TopProgressBar />
      <Content>
        <Outlet />
      </Content>
    </StyledLayout>
  );
};

export default AuthLayout; 