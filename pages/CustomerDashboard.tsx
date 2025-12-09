
import React from 'react';
import { Product, CartItem } from '../types';
import ProductCard from '../components/ProductCard';
import { Package, Clock, Heart } from 'lucide-react';

interface CustomerDashboardProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (p: string, q: number) => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ products, cart, onAddToCart }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-white p-8 rounded-lg shadow-sm border flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#2874f0]">Welcome, Happy Shopper!</h1>
          <p className="text-gray-500 mt-1">Here's a look at what's fresh today.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-2xl font-black text-gray-800">{cart.length}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">In Cart</p>
          </div>
          <div className="text-center border-l pl-4">
            <p className="text-2xl font-black text-gray-800">4</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Orders</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded shadow-sm border space-y-3">
            <h2 className="font-bold flex items-center gap-2 border-b pb-2"><Clock size={16} /> Recent Browsing</h2>
            <div className="space-y-3">
              {products.slice(0, 3).map(p => (
                <div key={p.id} className="flex gap-3 cursor-pointer group">
                  <img src={p.image} className="w-12 h-12 object-cover rounded shadow-sm" />
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold line-clamp-1 group-hover:text-blue-600">{p.name}</p>
                    <p className="text-xs text-green-600 font-bold">₹{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded shadow-sm border space-y-2">
            <h2 className="font-bold border-b pb-2">Filter Harvests</h2>
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm p-1 hover:bg-gray-50 rounded cursor-pointer">
                <input type="checkbox" /> Organic Only
              </label>
              <label className="flex items-center gap-2 text-sm p-1 hover:bg-gray-50 rounded cursor-pointer">
                <input type="checkbox" /> Below ₹50
              </label>
              <label className="flex items-center gap-2 text-sm p-1 hover:bg-gray-50 rounded cursor-pointer">
                <input type="checkbox" /> High Rated
              </label>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded shadow-sm border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Heart size={20} className="text-red-500" /> Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map(p => (
                <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerDashboard;
