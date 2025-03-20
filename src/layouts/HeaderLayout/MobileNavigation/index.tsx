import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { useBreakpoint } from "../../../hooks/useBreakpoint";

const StyledDrawer = styled(Drawer)`
  .ant-drawer-wrapper-body {
    background: rgba(10, 14, 35, 0.95);
    
    .ant-drawer-header {
      background: transparent;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      
      .ant-drawer-header-title {
        .ant-drawer-close {
          color: white;
        }
      }
    }
    
    .ant-drawer-body {
      padding: 24px 0;
    }
  }
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-bottom: 20px;
  
  a {
    display: block;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 600;
    position: relative;
    font-size: 18px;
    padding: 12px 24px;
    transition: all 125ms linear;

    &:hover,
    &:active {
      color: ${props => props.theme.colors.primaryAccent};
    }

    &.active {
      text-transform: uppercase;
      background-image: ${props => props.theme.colors.primaryGradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: 'Inter';
      font-weight: 800;
      font-size: 18px;

      &::after {
        content: '';
        position: absolute;
        left: 24px;
        bottom: 5px;
        height: 2px;
        width: 16px;
        background-image: ${props => props.theme.colors.primaryGradient};
      }
    }
  }
`;

const Container = styled.div`
  width: 100%;
`;

const StyledMenuIcon = styled(MenuOutlined)`
  font-size: 18px;
  color: white;
`;

export const MobileNavigation = () => {
  // Hooks
  const { sm } = useBreakpoint();
  const [visible, setVisible] = useState<boolean>(false);

  // Logic handlers
  const toggleDrawer = (): void => setVisible(prev => !visible);

  if (!sm) return null;

  return (
    <Container>
      <Button
        type="text"
        shape="circle"
        icon={<StyledMenuIcon />}
        onClick={toggleDrawer}
      />

      <StyledDrawer
        title={<Typography.Title level={4} style={{ color: 'white', margin: 0 }}>TYMEX</Typography.Title>}
        open={visible}
        onClose={toggleDrawer}
        closable
        placement="left"
      >
        <NavList>
          <NavItem>
            <a href="">Home</a>
          </NavItem>
          <NavItem>
            <a href="">About Us</a>
          </NavItem>
          <NavItem>
            <a href="">Our Teams</a>
          </NavItem>
          <NavItem>
            <a className="active" href="">Marketplace</a>
          </NavItem>
          <NavItem>
            <a href="">Roadmap</a>
          </NavItem>
          <NavItem>
            <a href="">Whitepaper</a>
          </NavItem>
        </NavList>
      </StyledDrawer>
    </Container>
  );
}; 