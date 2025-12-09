
import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (pid: string, qty: number) => void;
  onCardClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, onCardClick }) => {
  return (
    <div 
      className="bg-white p-4 group cursor-pointer hover:shadow-xl transition-shadow border-transparent border border-white hover:border-gray-200 rounded relative"
      onClick={onCardClick}
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        {product.discountTag && (
          <span className="absolute top-2 left-2 bg-[#2874f0] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
            {product.discountTag}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-[#2874f0]">{product.name}</h3>
        <div className="flex items-center gap-1">
          <div className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 font-bold">
            4.2 <Star size={10} fill="white" />
          </div>
          <span className="text-xs text-gray-500 font-medium">(1,248)</span>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-lg">₹{product.price}</span>
          <span className="text-xs text-gray-500 line-through">₹{Math.round(product.price * 1.2)}</span>
          <span className="text-green-600 text-xs font-bold">20% off</span>
        </div>
        
        <p className="text-xs text-gray-400 font-medium">Free Delivery</p>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          onAdd(product.id, 1);
        }}
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600 flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        <ShoppingCart size={16} /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
