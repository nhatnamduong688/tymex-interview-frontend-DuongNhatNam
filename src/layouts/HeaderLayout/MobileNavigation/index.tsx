import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { NavigationMenu } from "../../NavigationMenu";

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content {
    background: #011529 !important;

    .ant-drawer-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 16px 32px;
    }

    .ant-drawer-header {
      padding: 16px 32px;
    }

    .ant-drawer-close {
      margin: 0;
      color: #fff;
    }
  }

  .ant-menu-item {
    padding: 0;
  }
`;

export const MobileNavigation = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Button
        icon={<MenuOutlined />}
        type="text"
        size="large"
        onClick={() => setOpenDrawer((open) => !open)}
      />
      <StyledDrawer
        placement="left"
        width={300}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <NavigationMenu mode="vertical" />
      </StyledDrawer>
    </>
  );
}; 