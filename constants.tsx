
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    farmerId: 'f1',
    name: 'Fresh Organic Tomatoes',
    category: 'Vegetables',
    price: 40,
    bulkPrice: 32,
    quantity: 500,
    image: 'https://images.unsplash.com/photo-1546473427-e1ad6d6621b3?auto=format&fit=crop&q=80&w=400',
    description: 'Juicy, farm-fresh organic tomatoes perfect for salads and cooking.',
    discountTag: '15% OFF'
  },
  {
    id: '2',
    farmerId: 'f1',
    name: 'Premium Basmati Rice',
    category: 'Rice Items',
    price: 120,
    bulkPrice: 95,
    quantity: 1000,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    description: 'Long-grain aged basmati rice with exceptional aroma.',
    discountTag: 'Bulk Deal'
  },
  {
    id: '3',
    farmerId: 'f2',
    name: 'Royal Alphonso Mangoes',
    category: 'Fruits',
    price: 800,
    bulkPrice: 650,
    quantity: 50,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400',
    description: 'The king of fruits - naturally ripened and incredibly sweet.',
    discountTag: 'Bestseller'
  },
  {
    id: '4',
    farmerId: 'f2',
    name: 'Green Bell Peppers',
    category: 'Vegetables',
    price: 60,
    bulkPrice: 45,
    quantity: 200,
    image: 'https://images.unsplash.com/photo-1566275529824-cca6d00a2507?auto=format&fit=crop&q=80&w=400',
    description: 'Crunchy and vibrant green capsicums fresh from the fields.',
  },
  {
    id: '5',
    farmerId: 'f1',
    name: 'Wild Forest Honey',
    category: 'Fruits',
    price: 350,
    bulkPrice: 280,
    quantity: 100,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400',
    description: 'Pure forest honey collected by local tribes.',
  }
];

export const CATEGORIES = [
  { name: 'Vegetables', icon: '🥦' },
  { name: 'Rice Items', icon: '🌾' },
  { name: 'Fruits', icon: '🍎' }
];
