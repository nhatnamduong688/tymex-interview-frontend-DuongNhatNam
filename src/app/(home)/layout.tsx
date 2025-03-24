import React from 'react';
import { menus } from '@/assets/mock-data/menus';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header menus={menus} />
      {children}
      <Footer />
    </div>
  );
}
