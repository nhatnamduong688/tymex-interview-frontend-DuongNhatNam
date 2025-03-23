import { TProduct } from '../../types/product';
import { ServerProduct } from './types';
import { stringToTheme, stringToTier } from '../../utils/enumHelpers';
import { ProductTheme, ProductTier } from '../../enums/filter';

/**
 * Transform server product data to client product model
 */
export function transformServerProduct(product: ServerProduct): TProduct {
  return {
    id: String(product.id),
    name: product.title,
    description: '',
    price: product.price,
    imageBg: '',
    imageItem: '',
    category: product.category,
    creator: {
      name: `${product.author.firstName} ${product.author.lastName}`,
      isOnline: product.author.onlineStatus === 'online',
      avatar: product.author.avatar
    },
    isFavorite: product.isFavorite,
    createdAt: String(product.createdAt),
    theme: stringToTheme(product.theme) || ProductTheme.Light,
    tier: stringToTier(product.tier) || ProductTier.Basic,
    tags: [],
  };
}

/**
 * Transform array of server products to client products
 */
export function transformServerProducts(products: ServerProduct[]): TProduct[] {
  return products.map(transformServerProduct);
} 