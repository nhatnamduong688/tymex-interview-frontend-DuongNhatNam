import React from 'react';
import styled from 'styled-components';

const SeparateContainer = styled.section`
  height: 22rem;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/assets/images/section-frame.png');
  position: relative;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  background-color: #0c1023; /* Fallback color matching footer */
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(12, 16, 35, 0.8);
    z-index: -1;
  }
`;

export const SeparateSection = () => {
  return <SeparateContainer />;
}; 