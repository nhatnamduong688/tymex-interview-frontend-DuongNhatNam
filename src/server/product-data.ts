import { TProduct } from "../types/product";
import { ProductTheme, ProductTier, ProductCategory } from "../enums/filter";

// Generate dummy products for testing
const dummyProducts: TProduct[] = Array.from({ length: 50 }, (_, index) => ({
  id: `product-${index + 1}`,
  name: `Product ${index + 1}`,
  description: `This is a sample description for product ${index + 1}. It includes some interesting features and details about this amazing digital asset.`,
  price: Number((Math.random() * 200).toFixed(2)),
  imageBg: `/assets/img/product/bg-${(index % 4) + 1}.png`,
  imageItem: `/assets/img/product/item-${(index % 4) + 1}.png`,
  category: Object.values(ProductCategory).filter(c => c !== "")[Math.floor(Math.random() * (Object.values(ProductCategory).length - 1))],
  creator: {
    name: ['Artist One', 'Creator Studio', 'Digital Designer', 'NFT Musician'][Math.floor(Math.random() * 4)],
    isOnline: Math.random() > 0.5,
    avatar: `/assets/img/avatar/avatar-${Math.floor(Math.random() * 5) + 1}.png`
  },
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
  tier: Math.random() > 0.5 ? ProductTier.Basic : ProductTier.Premium,
  theme: Math.random() > 0.5 ? ProductTheme.Light : ProductTheme.Dark,
  tags: [
    ['collectible', 'digital', 'art'][Math.floor(Math.random() * 3)],
    ['rare', 'metaverse', 'property', 'game'][Math.floor(Math.random() * 4)]
  ],
}));

export default dummyProducts; 