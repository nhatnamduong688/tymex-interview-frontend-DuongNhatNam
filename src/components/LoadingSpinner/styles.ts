import styled, { keyframes } from 'styled-components';

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export const Spinner = styled.div<{ size: number; color: string; thickness: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: ${props => props.thickness}px solid rgba(255, 255, 255, 0.2);
  border-top: ${props => props.thickness}px solid ${props => props.color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`; 