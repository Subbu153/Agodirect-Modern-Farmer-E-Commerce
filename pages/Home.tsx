
import React from 'react';
import { CATEGORIES } from '../constants';
import { Product, User, UserRole } from '../types';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  products: Product[];
  onLogin: (r: UserRole) => void;
  onAddToCart: (pid: string, qty: number) => void;
  currentUser: User | null;
}

const Home: React.FC<HomeProps> = ({ products, onLogin, onAddToCart, currentUser }) => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="w-full bg-blue-100 rounded shadow overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1200&h=300" 
          alt="Main Banner" 
          className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center px-12">
          <div className="text-white space-y-2">
            <h1 className="text-4xl font-black drop-shadow-lg">Fresh From Local Farms</h1>
            <p className="text-lg font-medium drop-shadow-md">Support your local agriculture. Get organic products delivered home.</p>
            <button 
               onClick={() => !currentUser && onLogin('CUSTOMER')}
               className="bg-orange-500 px-8 py-2 rounded font-bold shadow-lg hover:bg-orange-600 active:scale-95 transition-all"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Top Categories</h2>
        <div className="grid grid-cols-3 gap-6">
          {CATEGORIES.map(cat => (
            <div 
              key={cat.name} 
              className="group cursor-pointer flex flex-col items-center p-6 border rounded-lg hover:shadow-md hover:border-blue-400 transition-all"
            >
              <span className="text-5xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h3 className="font-bold text-lg">{cat.name}</h3>
              <p className="text-xs text-gray-500">Explore items</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-white p-6 rounded shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-xl font-bold">Featured Deals</h2>
          <button className="text-[#2874f0] font-semibold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.slice(0, 5).map(prod => (
            <ProductCard 
              key={prod.id} 
              product={prod} 
              onAdd={onAddToCart}
              onCardClick={() => !currentUser && onLogin('CUSTOMER')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
