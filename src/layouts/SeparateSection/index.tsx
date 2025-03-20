import React from 'react';
import styled from 'styled-components';

const SeparateContainer = styled.section`
  height: 22rem;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/assets/images/section-frame.png');
`;

export const SeparateSection = () => {
  return <SeparateContainer />;
}; 