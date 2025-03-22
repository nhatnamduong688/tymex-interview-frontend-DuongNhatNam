import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageLoading: React.FC = () => {
  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
}; 