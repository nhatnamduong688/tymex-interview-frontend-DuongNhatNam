import { memo } from 'react';
import { Flex, Layout } from "antd";
import { Button } from "../../components/Button";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { MobileNavigation } from "./MobileNavigation";
import { NavigationMenu } from "../NavigationMenu";
import styled from "styled-components";
import { IGlobe } from "../../icons/IGlobe";
import { ICaretDown } from "../../icons/ICaretDown";

const StyledHeader = styled(Layout.Header)`
  height: var(--header-height) !important;
  line-height: var(--header-height) !important;
  padding: 0 !important;
  background-color: #17161ab2;
  z-index: 999;
`;

const HeaderInner = styled.nav`
  ${props => props.theme.mixins.container};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const RegionMenu = styled(Flex)`
  margin-left: 16px;
  cursor: pointer;
`;

export const HeaderLayout = memo(() => {
  const { isCollapsed } = useBreakpoint();

  return (
    <StyledHeader>
      <HeaderInner>
        {isCollapsed ? <MobileNavigation /> : <NavigationMenu />}

        <Flex gap={12}>
          <Button type="primary" size="large">
            Connect Wallet
          </Button>
          <RegionMenu align="center" gap={8}>
            <IGlobe />
            <ICaretDown />
          </RegionMenu>
        </Flex>
      </HeaderInner>
    </StyledHeader>
  );
}); 