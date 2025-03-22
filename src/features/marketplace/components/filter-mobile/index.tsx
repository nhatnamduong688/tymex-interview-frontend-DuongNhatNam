import { Drawer, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { Filter } from "../filter-form";
import { Button } from "../../../../shared/components/Button";
import { FilterOutlined } from "@ant-design/icons";

const FilterMobileButton = styled(Button)`
  padding: 20px 16px 20px 16px !important;
  margin-left: 20px;
  margin-bottom: 20px;
  width: 180px;
`;

const FilterMobileDrawer = styled(Drawer)`
  &.ant-drawer .ant-drawer-content-wrapper {
    max-width: 400px !important;
  }

  &.ant-drawer .ant-drawer-content {
    background: #17161a !important;

    .ant-drawer-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 32px;
    }

    .ant-drawer-header {
      padding: 32px;

      &-title {
        flex-direction: row-reverse;

        h3 {
          margin: 0;
        }
      }
    }

    .ant-drawer-close {
      margin: 0;
      color: #fff !important;
    }
  }
`;

export const FilterMobile = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  
  return (
    <>
      <FilterMobileButton
        icon={<FilterOutlined />}
        ghost
        onClick={() => setOpenDrawer((open) => !open)}
      >
        Filters & Sort
      </FilterMobileButton>
      
      <FilterMobileDrawer
        placement="left"
        width="100%"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={<Typography.Title level={3}>Filters & Sort</Typography.Title>}
      >
        <Filter />
      </FilterMobileDrawer>
    </>
  );
}; 