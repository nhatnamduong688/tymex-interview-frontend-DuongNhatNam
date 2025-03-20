import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginRequest } from '../../store/reducers/authReducer';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background: ${props => props.theme.colors.primaryGradient};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    color: white;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

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
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>Login</h2>
      
      {error && <Alert message={error} type="error" style={{ marginBottom: '16px' }} />}
      
      {isAuthenticated ? (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h3>Welcome, {user?.name}!</h3>
          <p>You are successfully logged in.</p>
        </div>
      ) : (
        <StyledForm
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={<span style={{ color: 'white' }}>Email</span>}
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="user@example.com" />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: 'white' }}>Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <Form.Item>
            <LoginButton type="primary" htmlType="submit" loading={loading}>
              Login
            </LoginButton>
          </Form.Item>
          
          <div style={{ color: 'white', textAlign: 'center', fontSize: '12px' }}>
            Demo credentials: user@example.com / password
          </div>
        </StyledForm>
      )}
    </LoginContainer>
  );
}; 