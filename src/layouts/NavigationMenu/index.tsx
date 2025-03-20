import React from 'react';
import { Menu } from "antd";
import { NAVIGATION_ITEMS } from "../../constants/common";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const NavMenuWrapper = styled.div`
  flex: 1;

  .ant-menu {
    background: transparent;
    border-bottom: none;
    
    &-item {
      padding: 0 30px;
      background-color: transparent !important;

      &-active, &-selected {
        .ant-menu-title-content {
          ${props => props.theme.mixins.gradientText}
        }
      }

      &-selected {
        .ant-menu-title-content {
          &::after {
            position: absolute;
            content: "";
            width: 16px;
            height: 2px;
            background-image: ${props => props.theme.colors.primaryGradient};
            bottom: -4px;
            left: 4px;
          }
        }
      }
    }

    &-title-content {
      font-family: ${props => props.theme.fonts.heading};
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      text-align: center;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
      color: #fff;
      text-transform: uppercase;
      position: relative;
      transition: none;
    }
  }
`;

export interface NavigationMenuProps {
  mode?: "horizontal" | "vertical";
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  mode = "horizontal",
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  return (
    <NavMenuWrapper>
      <Menu
        theme="dark"
        mode={mode}
        selectedKeys={[pathname]}
        items={[
          NAVIGATION_ITEMS.HOME,
          NAVIGATION_ITEMS.ABOUT_US,
          NAVIGATION_ITEMS.OUR_TEAMS,
          NAVIGATION_ITEMS.MARKETPLACE,
          NAVIGATION_ITEMS.ROADMAP,
          NAVIGATION_ITEMS.WHITEPAPER,
        ].map((navigationItem) => ({
          key: navigationItem.path,
          label: navigationItem.label,
          onClick: () => {
            if (navigationItem.path === pathname) return;
            navigate(navigationItem.path);
          },
        }))}
      />
    </NavMenuWrapper>
  );
}; 