import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import styled from 'styled-components';

export interface NavigationMenuProps {
  mode?: 'horizontal' | 'vertical';
}

const StyledMenu = styled(Menu)`
  background: transparent;
  border: none;
  
  .ant-menu-item {
    color: white;
    font-size: 16px;
    
    &:hover, &.ant-menu-item-selected {
      color: ${props => props.theme.colors.primaryAccent};
      background: transparent;
    }
    
    &::after {
      display: none;
    }
  }
  
  &.ant-menu-horizontal {
    line-height: ${props => props.theme.layout.headerHeight};
  }
`;

const NavigationLinks = [
  {
    key: 'marketplace',
    label: 'Marketplace',
  },
  {
    key: 'items',
    label: 'Items',
  },
  {
    key: 'collection',
    label: 'Collection',
  },
  {
    key: 'community',
    label: 'Community',
  },
];

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ mode = 'horizontal' }) => {
  const menuProps: MenuProps = {
    mode,
    selectedKeys: ['marketplace'],
    items: NavigationLinks,
  };

  return <StyledMenu {...menuProps} />;
}; 