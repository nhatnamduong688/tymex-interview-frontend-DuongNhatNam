'use client';

import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import Button from '@/components/button';
import Icon from '@/components/icon';
import Link from '@/components/link';
import Hambuger from '@/components/hambuger';
import './index.css';

interface IHeader {
  menus: {
    name: string;
    href: string;
  }[];
}

const Header = ({ menus }: IHeader) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { connectWallet } = useConnectWallet();

  const onOpenMenu = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <header className={`header ${open ? 'show' : ''}`}>
      <nav className={`${open ? 'show' : ''}`}>
        <ul>
          {menus.map((item, idx) => (
            <li key={`item.name-${idx}`}>
              <Link
                text={item.name}
                href={item.href}
                active={pathname === item.href}
              />
            </li>
          ))}
        </ul>
        <div className='wallet-group'>
          <Button text='Connect Wallet' onClick={connectWallet} />
          <div className='language-selector'>
            <Icon name='global' />
            <Icon name='chevron-down' />
          </div>
        </div>
      </nav>
      <Hambuger active={open} onClick={onOpenMenu} />
    </header>
  );
};

export default Header;
