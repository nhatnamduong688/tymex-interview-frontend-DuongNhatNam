import { memo, useMemo } from 'react';
import { Flex, Layout, Dropdown, MenuProps } from "antd";
import { Button } from "../../components/Button";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { MobileNavigation } from "./MobileNavigation";
import styled from "styled-components";
import { GlobalOutlined, DownOutlined } from '@ant-design/icons';

const StyledHeader = styled(Layout.Header)`
  height: var(--header-height) !important;
  line-height: var(--header-height) !important;
  padding: 0 !important;
  background-color: #17161ab2;
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
`;

const HeaderInner = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 96px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  a {
    display: block;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 600;
    position: relative;
    font-size: 18px;
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
        left: 10px;
        bottom: -5px;
        height: 2px;
        width: 16px;
        background-image: ${props => props.theme.colors.primaryGradient};
      }
    }
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  min-width: 300px;
  align-items: center;
  justify-content: flex-end;
  gap: 48px;
`;

const RegionMenu = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 16px;
`;

export const HeaderLayout = memo(() => {
  const { xl } = useBreakpoint();

  const locales: MenuProps['items'] = useMemo(() => {
    return [
      {
        key: 'en',
        label: 'English',
        onClick: () => console.log('Changed to English'),
      },
      {
        key: 'vi',
        label: 'Tiếng Việt',
        onClick: () => console.log('Changed to Vietnamese'),
      },
    ];
  }, []);

  return (
    <StyledHeader>
      <HeaderInner>
        <div className="flex w-full items-center justify-between gap-6">
          <MobileNavigation />
          
          {xl && (
            <nav className="h-full w-full">
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
                <NavItem className="flex items-center gap-4">
                  <a className="active" href="">
                    Marketplace
                  </a>
                  <a href="">Roadmap</a>
                </NavItem>
                <NavItem>
                  <a href="">Whitepaper</a>
                </NavItem>
              </NavList>
            </nav>
          )}

          <ActionsContainer>
            <Button type="primary" size="large">
              Connect Wallet
            </Button>
            
            <Dropdown
              menu={{
                items: locales,
                selectable: true,
                defaultSelectedKeys: ['en'],
              }}
              placement="bottom"
              arrow
            >
              <RegionMenu>
                <GlobalOutlined />
                <DownOutlined />
              </RegionMenu>
            </Dropdown>
          </ActionsContainer>
        </div>
      </HeaderInner>
    </StyledHeader>
  );
}); 