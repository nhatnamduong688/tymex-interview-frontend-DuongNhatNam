import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 30px 0;
  background-color: #0c1023;
  color: white;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  padding: 0 20px;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FooterTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const FooterLink = styled.a`
  display: block;
  color: #89888b;
  margin-bottom: 10px;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: white;
  }
`;

const FooterBottom = styled.div`
  width: 100%;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: #89888b;
`;

export const FooterLayout: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>TYMEX</FooterTitle>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Products</FooterTitle>
          <FooterLink href="#">Marketplace</FooterLink>
          <FooterLink href="#">Items</FooterLink>
          <FooterLink href="#">Collections</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink href="#">Help Center</FooterLink>
          <FooterLink href="#">Community</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>© 2023 TYMEX. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
}; 