import React from 'react';
import { SpinnerContainer, Spinner } from './styles';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 50, 
  color = '#da458f', 
  thickness = 4 
}) => {
  return (
    <SpinnerContainer>
      <Spinner size={size} color={color} thickness={thickness} />
    </SpinnerContainer>
  );
}; 