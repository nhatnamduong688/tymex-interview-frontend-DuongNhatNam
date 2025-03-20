import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { NavigationMenu } from "../NavigationMenu";
import styles from "./style.module.scss";

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
      <Drawer
        rootClassName={styles["mobile-navigation-container"]}
        placement="left"
        width={300}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <NavigationMenu mode="vertical" />
      </Drawer>
    </>
  );
}; 