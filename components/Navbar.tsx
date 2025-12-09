
import React, { useState } from 'react';
import { ShoppingCart, User as UserIcon, Search, ChevronDown, LogOut, Layout } from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogin: (role: UserRole) => void;
  onLogout: () => void;
  onSearch: (q: string) => void;
  cartCount: number;
  onGoHome: () => void;
  onGoDashboard: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout, onSearch, cartCount, onGoHome, onGoDashboard }) => {
  const [searchVal, setSearchVal] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
  };

  return (
    <nav className="bg-[#2874f0] text-white shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-6">
        {/* Logo */}
        <div 
          onClick={onGoHome}
          className="cursor-pointer flex flex-col items-center"
        >
          <span className="text-2xl font-bold italic tracking-tight">AgroDirect</span>
          <span className="text-[11px] italic text-yellow-300 font-semibold -mt-1">Explore Plus ➕</span>
        </div>

        {/* Search */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl relative">
          <input 
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search for vegetables, fruits and more"
            className="w-full py-2 px-4 rounded-sm text-gray-800 outline-none pr-10 shadow-inner"
          />
          <Search className="absolute right-3 top-2.5 text-[#2874f0] w-5 h-5 cursor-pointer" />
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-8 font-semibold">
          {!user ? (
            <div className="relative group">
              <button 
                className="bg-white text-[#2874f0] px-10 py-1 rounded-sm font-bold shadow-sm flex items-center gap-2 group-hover:bg-gray-100"
              >
                Login
              </button>
              {/* Login Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white text-gray-800 rounded shadow-xl w-64 border">
                  <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <span className="font-bold">New Customer?</span>
                    <span className="text-[#2874f0] text-xs cursor-pointer hover:underline">Sign Up</span>
                  </div>
                  <ul>
                    <li onClick={() => onLogin('FARMER')} className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 border-b">
                      <Layout size={18} /> Login as Farmer
                    </li>
                    <li onClick={() => onLogin('CUSTOMER')} className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 border-b">
                      <UserIcon size={18} /> Login as Customer
                    </li>
                    <li onClick={() => onLogin('INDUSTRIAL')} className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                      <ShoppingCart size={18} /> Login as Industrial Buyer
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative group flex items-center gap-2 cursor-pointer">
              <span className="capitalize">{user.name}</span>
              <ChevronDown size={16} />
              {/* User Menu */}
              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white text-gray-800 rounded shadow-xl w-48 border">
                  <ul>
                    <li onClick={onGoDashboard} className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 border-b text-sm">
                      <Layout size={16} /> My Dashboard
                    </li>
                    <li onClick={onLogout} className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-sm text-red-600">
                      <LogOut size={16} /> Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 cursor-pointer relative group">
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -left-2 bg-orange-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#2874f0] font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
