import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "../../NavigationMenu";

const StyledDrawer = styled(Drawer)`
  .ant-drawer-wrapper-body {
    background: rgba(10, 14, 35, 0.95);
    
    .ant-drawer-header {
      background: transparent;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      
      .ant-drawer-header-title {
        .ant-drawer-title {
          color: white;
        }
        
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
  const { t } = useTranslation();
  
  // States
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
        <NavigationMenu mode="vertical" />
      </StyledDrawer>
    </Container>
  );
}; 