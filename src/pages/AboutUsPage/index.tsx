import React from 'react';
import styled from 'styled-components';
import { LoginForm } from '../../components/LoginForm';

const Container = styled.div`
  min-height: 80vh;
  padding: 100px 20px 20px;
`;

const AboutUsPage: React.FC = () => {
  return (
    <Container>
      <h1>About Us Page</h1>
      <p>This is a demo of Redux and Redux Saga integration.</p>
      <LoginForm />
    </Container>
  );
};

export default AboutUsPage; 