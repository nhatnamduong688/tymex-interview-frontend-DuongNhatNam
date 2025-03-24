import Image from 'next/image';
import BgNewArrival from '../../../public/images/new-arrival.png';
import BgListNft from '../../../public/images/list-nft.png';
import BgDj from '../../../public/images/dj.png';
import './index.css';

const HeroSection = () => {
  return (
    <div className='hero-section'>
      <div className='bg-title'>
        <Image src={BgNewArrival} alt='new arrival' />
      </div>
      <div className='bg-list-nft'>
        <Image src={BgListNft} alt='list nft' />
      </div>
      <div className='bg-dj'>
        <Image src={BgDj} alt='dj' />
      </div>
    </div>
  );
};

export default HeroSection;
