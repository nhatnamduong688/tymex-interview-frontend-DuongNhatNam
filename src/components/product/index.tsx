'use client';

import Image from 'next/image';
import Icon from '@/components/icon';
import pngwing1 from '../../../public/images/products/pngwing-1.png';
import pngwing2 from '../../../public/images/products/pngwing-2.png';
import pngwing3 from '../../../public/images/products/pngwing-3.png';
import pngwing4 from '../../../public/images/products/pngwing-4.png';
import pngwing5 from '../../../public/images/products/pngwing-5.png';
import './index.css';

interface ProductProps {
  title: string;
  category: string;
  price: number;
  isFavorite: boolean;
  theme: string;
  tier: string;
  imageId: number;
  author: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    avatar: string;
    onlineStatus: string;
  };
}

const Product = ({
  title,
  category,
  price,
  author,
  imageId,
  isFavorite,
}: ProductProps) => {
  const renderImage = () => {
    switch (imageId) {
      case 2:
        return <Image src={pngwing2} alt={title} />;
      case 4:
        return <Image src={pngwing3} alt={title} />;
      case 6:
        return <Image src={pngwing4} alt={title} />;
      case 8:
        return <Image src={pngwing5} alt={title} />;
      default:
        return <Image src={pngwing1} alt={title} />;
    }
  };

  return (
    <div className='product'>
      <div className={`product-wrapper ${category.toLowerCase()}`}>
        <div className='product-tier'>
          <div className='product-info-tier'>{category}</div>
          {isFavorite && <Icon name='heart' />}
        </div>
        <div className='product-image'>{renderImage()}</div>
      </div>
      <div className='product-info'>
        <div className='product-info-name'>{title}</div>
        <div className='product-info-price'>
          <Icon name='ethereum' />
          {price} ETH
        </div>
      </div>
      <div className='product-creator'>
        <div className='product-creator-avatar'>
          <Image
            src={author.avatar}
            alt={author.firstName}
            width={32}
            height={32}
          />
        </div>
        <div className='product-creator-name'>{author.firstName}</div>
      </div>
    </div>
  );
};

export default Product;
