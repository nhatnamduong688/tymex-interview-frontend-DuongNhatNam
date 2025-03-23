import React from 'react';
import { Spin } from 'antd';
import { Container } from './styles';

export const PageLoading: React.FC = () => {
  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
}; 