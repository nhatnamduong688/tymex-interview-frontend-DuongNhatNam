import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginRequest } from '../../store/reducers/authReducer';
import {
  LoginContainer,
  StyledForm,
  LoginButton,
  LoginTitle,
  WelcomeContainer
} from './styles';

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated, user } = useAppSelector(state => state.auth);
  
  const onFinish = (values: any) => {
    dispatch(loginRequest(values as LoginFormValues));
  };

  return (
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
      
      {error && <Alert message={error} type="error" style={{ marginBottom: '16px' }} />}
      
      {isAuthenticated ? (
        <WelcomeContainer>
          <h3>Welcome, {user?.name}!</h3>
          <p>You are successfully logged in.</p>
        </WelcomeContainer>
      ) : (
        <StyledForm
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <LoginButton type="primary" htmlType="submit" loading={loading}>
              Log in
            </LoginButton>
          </Form.Item>
        </StyledForm>
      )}
    </LoginContainer>
  );
}; 