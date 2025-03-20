import React, { memo } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  height: auto;
  background-color: #0c1023;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const FooterSection = styled.div`
  height: 100%;
  width: 100%;
  padding: 48px 0;
`;

const Divider = styled.hr`
  width: 100%;
  border-color: rgba(255, 255, 255, 0.1);
`;

const FooterBottom = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
`;

const Copyright = styled.p`
  flex: 1;
  color: #89888b;
`;

const FooterLinks = styled.ul`
  display: flex;
  min-width: 340px;
  align-items: center;
  gap: 48px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FooterLink = styled.li`
  a {
    color: #89888b;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: white;
    }
  }
`;

export const FooterLayout = memo(() => {
  return (
    <FooterContainer>
      <Container>
        <FooterSection></FooterSection>
        
        <Divider />
        
        <FooterSection>
          <FooterBottom>
            <Copyright>&copy; {new Date().getFullYear()} Tyme - Edit. All Rights reserved.</Copyright>
            
            <FooterLinks>
              <FooterLink>
                <a href="">Security</a>
              </FooterLink>
              <FooterLink>
                <a href="">Legal</a>
              </FooterLink>
              <FooterLink>
                <a href="">Privacy</a>
              </FooterLink>
            </FooterLinks>
          </FooterBottom>
        </FooterSection>
      </Container>
    </FooterContainer>
  );
}); 