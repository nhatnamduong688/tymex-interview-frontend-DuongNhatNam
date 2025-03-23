import styled from 'styled-components';
import { Form, Button } from 'antd';

export const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background: ${props => props.theme.colors.primaryGradient};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    color: white;
  }
`;

export const LoginButton = styled(Button)`
  width: 100%;
`;

export const LoginTitle = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 24px;
`;

export const WelcomeContainer = styled.div`
  text-align: center;
  color: white;
`; 