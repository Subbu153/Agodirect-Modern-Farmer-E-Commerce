
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { User, Product, CartItem, UserRole } from './types';
import { INITIAL_PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FarmerDashboard from './pages/FarmerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import IndustrialDashboard from './pages/IndustrialDashboard';
import SearchResults from './pages/SearchResults';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('agro_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('agro_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('agro_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState<'home' | 'dashboard' | 'search'>('home');

  useEffect(() => {
    localStorage.setItem('agro_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('agro_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('agro_cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (role: UserRole) => {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Test ${role}`,
      email: `${role.toLowerCase()}@agro.com`,
      role
    };
    setCurrentUser(mockUser);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setActivePage('home');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActivePage(query ? 'search' : 'home');
  };

  const addToCart = (productId: string, qty: number, isBulk: boolean = false) => {
    if (!currentUser) return alert('Please login to add items to cart!');
    setCart(prev => {
      const existing = prev.find(i => i.productId === productId && i.isBulk === isBulk);
      if (existing) {
        return prev.map(i => i.productId === productId && i.isBulk === isBulk 
          ? { ...i, quantity: i.quantity + qty } 
          : i);
      }
      return [...prev, { productId, quantity: qty, isBulk }];
    });
  };

  const updateProduct = (p: Product) => {
    setProducts(prev => prev.map(old => old.id === p.id ? p : old));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addProduct = (p: Product) => {
    setProducts(prev => [p, ...prev]);
  };

  const renderContent = () => {
    if (activePage === 'search') {
      return (
        <SearchResults 
          query={searchQuery} 
          products={products} 
          onAddToCart={addToCart} 
        />
      );
    }

    if (activePage === 'dashboard' && currentUser) {
      switch (currentUser.role) {
        case 'FARMER':
          return (
            <FarmerDashboard 
              products={products.filter(p => p.farmerId === currentUser.id || p.farmerId === 'f1' || p.farmerId === 'f2')} 
              onAdd={addProduct}
              onUpdate={updateProduct}
              onDelete={deleteProduct}
            />
          );
        case 'CUSTOMER':
          return (
            <CustomerDashboard 
              products={products} 
              cart={cart}
              onAddToCart={addToCart}
            />
          );
        case 'INDUSTRIAL':
          return (
            <IndustrialDashboard 
              products={products} 
              onAddToCart={addToCart}
            />
          );
      }
    }

    return (
      <Home 
        products={products} 
        onLogin={handleLogin} 
        onAddToCart={addToCart}
        currentUser={currentUser}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      <Navbar 
        user={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        onSearch={handleSearch}
        cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)}
        onGoHome={() => setActivePage('home')}
        onGoDashboard={() => setActivePage('dashboard')}
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
      
      <footer className="bg-white border-t mt-auto py-8 text-center text-gray-500 text-sm">
        <p>© 2024 AgroDirect Marketplace. All agricultural rights reserved.</p>
        <p className="mt-2">Made for Farmers, by the Digital Earth Initiative.</p>
      </footer>
    </div>
  );
};

export default App;
