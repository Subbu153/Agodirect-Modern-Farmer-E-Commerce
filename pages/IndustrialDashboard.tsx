
import React from 'react';
import { Product } from '../types';
import { Truck, Scale, DollarSign, TrendingUp } from 'lucide-react';

interface IndustrialDashboardProps {
  products: Product[];
  onAddToCart: (p: string, q: number, b: boolean) => void;
}

const IndustrialDashboard: React.FC<IndustrialDashboardProps> = ({ products, onAddToCart }) => {
  return (
    <div className="space-y-8">
       <div className="bg-[#1a237e] text-white p-10 rounded-xl shadow-xl flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-black">Industrial Procurement</h1>
            <p className="text-blue-200">B2B Sourcing made easy. Negotiate directly with local farms.</p>
          </div>
          <div className="hidden md:flex gap-8">
             <div className="text-center">
               <Scale size={32} className="mx-auto mb-1 text-blue-300" />
               <p className="text-xs uppercase font-black tracking-widest">Weight Grade</p>
             </div>
             <div className="text-center">
               <Truck size={32} className="mx-auto mb-1 text-blue-300" />
               <p className="text-xs uppercase font-black tracking-widest">Logistics</p>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white p-4 rounded border shadow-sm flex items-center gap-4">
           <div className="p-3 bg-green-100 text-green-700 rounded-full"><DollarSign /></div>
           <div><p className="text-2xl font-bold">₹1.2L</p><p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Total Spent</p></div>
         </div>
         <div className="bg-white p-4 rounded border shadow-sm flex items-center gap-4">
           <div className="p-3 bg-blue-100 text-blue-700 rounded-full"><TrendingUp /></div>
           <div><p className="text-2xl font-bold">14</p><p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Quotes Pending</p></div>
         </div>
       </div>

       <div className="bg-white p-8 rounded-lg shadow-sm border">
         <h2 className="text-xl font-bold mb-6">Available for Bulk (B2B Rates)</h2>
         <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-gray-50">
               <tr>
                 <th className="p-4 font-bold text-gray-600">Harvest</th>
                 <th className="p-4 font-bold text-gray-600">Stock Availability</th>
                 <th className="p-4 font-bold text-gray-600">B2B Price/Kg</th>
                 <th className="p-4 font-bold text-gray-600">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y">
               {products.map(p => (
                 <tr key={p.id} className="hover:bg-gray-50">
                   <td className="p-4">
                     <div className="flex items-center gap-4">
                       <img src={p.image} className="w-16 h-16 object-cover rounded shadow-inner" />
                       <div className="space-y-1">
                         <p className="font-black text-gray-800 uppercase text-sm tracking-wide">{p.name}</p>
                         <p className="text-xs text-gray-400">Farmer: Rural Coop #4</p>
                       </div>
                     </div>
                   </td>
                   <td className="p-4 font-mono font-bold text-gray-500">
                     {p.quantity} Units Available
                   </td>
                   <td className="p-4">
                     <span className="text-xl font-black text-[#2874f0]">₹{p.bulkPrice || Math.round(p.price * 0.8)}</span>
                     <p className="text-[10px] text-orange-500 font-bold uppercase">Wholesale Rate</p>
                   </td>
                   <td className="p-4">
                      <button 
                        onClick={() => onAddToCart(p.id, 50, true)}
                        className="bg-orange-500 text-white px-6 py-2 rounded font-bold hover:bg-orange-600 shadow-md active:scale-95 transition-all"
                      >
                        Add 50Kg Bulk
                      </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
    </div>
  );
};

export default IndustrialDashboard;
