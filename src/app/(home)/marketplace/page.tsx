import GroupProducts from '@/components/group-products';
import HeroSection from '@/components/hero-section';
import { Suspense } from 'react';

export default function Marketplace() {
  return (
    <div className='marketplace-page'>
      <div className='animated fadeInLeft'>
        <HeroSection />
      </div>
      <div className='animated fadeInLeft'>
        <Suspense fallback={<div>Loading products...</div>}>
          <GroupProducts />
        </Suspense>
      </div>
    </div>
  );
}
