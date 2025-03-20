import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  height: ${props => props.theme.layout.headerHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: ${props => props.theme.layout.mobileHeaderHeight};
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const MenuButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ConnectWalletButton = styled.button`
  background-image: ${props => props.theme.colors.primaryGradient};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

export const HeaderLayout: React.FC = () => {
  return (
    <HeaderContainer>
      <MenuButton>☰</MenuButton>
      <Logo>TYMEX</Logo>
      <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
    </HeaderContainer>
  );
}; 