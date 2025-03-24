import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/assets/mock-data/products';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');
  const tier = searchParams.get('tier');
  const theme = searchParams.get('theme');
  const time = searchParams.get('time');
  const priceOrder = searchParams.get('priceOrder');
  const price = searchParams.get('price');
  const category = searchParams.get('category');
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  let filtered = [...products];

  // Filter by `search` in name and tier
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.title.toLowerCase().includes(searchLower) ||
        product.tier.toLowerCase().includes(searchLower) ||
        product.theme.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
    );
  }

  // Filter by `tier`
  if (tier) {
    filtered = filtered.filter(
      (product) => product.tier.toLowerCase() === tier.toLowerCase()
    );
  }

  // Filter by `theme`
  if (theme) {
    filtered = filtered.filter(
      (product) => product.theme.toLowerCase() === theme.toLowerCase()
    );
  }

  // Filter by `price`
  if (priceOrder === 'low-to-high') {
    // Price low to high
    filtered.sort((a, b) => a.price - b.price);
  } else if (priceOrder === 'high-to-low') {
    // Price high to low
    filtered.sort((a, b) => b.price - a.price);
  }

  // Sort by `time`
  if (time === 'latest') {
    // Latest
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (time === 'oldest') {
    // Oldest
    filtered.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  // Filter by `category`
  if (category) {
    filtered = filtered.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by `price`
  if (price) {
    const [min, max] = price.split(',').map(Number);
    filtered = filtered.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  const counts = filtered.length;
  const totalPages = Math.ceil(counts / Number(pageSize));
  const currentPage = Number(page);

  // Pagination
  if (page && pageSize) {
    const startIndex = (Number(page) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);
    filtered = filtered.slice(startIndex, endIndex);
  }

  return NextResponse.json({
    data: filtered,
    counts,
    totalPages,
    currentPage,
  });
};
