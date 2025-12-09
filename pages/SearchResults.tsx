
import React, { useMemo } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface SearchResultsProps {
  query: string;
  products: Product[];
  onAddToCart: (p: string, q: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, products, onAddToCart }) => {
  const results = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [query, products]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow-sm flex justify-between items-center">
        <h1 className="text-xl">
          Showing results for <span className="font-bold">"{query}"</span>
        </h1>
        <p className="text-sm text-gray-500">{results.length} items found</p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {results.map(prod => (
            <ProductCard key={prod.id} product={prod} onAdd={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded shadow-sm text-center">
          <p className="text-xl font-bold text-gray-400">No products found for "{query}"</p>
          <p className="text-sm text-gray-300">Try searching for vegetables or fruits</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
