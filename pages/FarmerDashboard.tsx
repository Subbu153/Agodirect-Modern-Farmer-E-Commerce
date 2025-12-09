
import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { generateProductDescription } from '../services/ai';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FarmerDashboardProps {
  products: Product[];
  onAdd: (p: Product) => void;
  onUpdate: (p: Product) => void;
  onDelete: (id: string) => void;
}

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ products, onAdd, onUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Vegetables' as Product['category'],
    price: 0,
    bulkPrice: 0,
    quantity: 0,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
    description: ''
  });

  const handleAISuggestion = async () => {
    if (!formData.name) return alert('Enter a product name first!');
    setLoadingAI(true);
    const desc = await generateProductDescription(formData.name, formData.category);
    setFormData(prev => ({ ...prev, description: desc }));
    setLoadingAI(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      farmerId: 'f1'
    };
    onAdd(newProduct);
    setShowModal(false);
    setFormData({
      name: '',
      category: 'Vegetables',
      price: 0,
      bulkPrice: 0,
      quantity: 0,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
          <p className="text-gray-500">Welcome back, Farmer. Manage your harvests here.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#2874f0] text-white px-6 py-2 rounded font-bold shadow hover:bg-blue-600 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded shadow-sm border">
          <h2 className="text-lg font-bold mb-4">Your Active Inventory</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Stock</th>
                  <th className="pb-3 font-semibold">Price (Unit)</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 group">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} className="w-10 h-10 rounded object-cover" />
                        <span className="font-semibold text-gray-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{p.category}</td>
                    <td className="py-4 text-sm font-medium">{p.quantity} Units</td>
                    <td className="py-4 text-sm font-bold text-green-700">₹{p.price}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"><Edit3 size={16} /></button>
                        <button 
                          onClick={() => onDelete(p.id)}
                          className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border h-fit">
          <h2 className="text-lg font-bold mb-4">Sales Trends</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#2874f0" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-100">
            <p className="text-sm font-bold text-blue-800">Growth Tip:</p>
            <p className="text-xs text-blue-600">Consider listing seasonal fruits like Alphonso Mangoes for a 20% spike in sales next week.</p>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-[#2874f0] text-white">
              <h3 className="text-xl font-bold">List Harvest to Market</h3>
              <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                  <div className="relative">
                    <input 
                      required
                      type="text" 
                      className="w-full border rounded p-2 text-sm pr-12" 
                      placeholder="e.g. Organic Red Carrots"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <button 
                      type="button"
                      disabled={loadingAI}
                      onClick={handleAISuggestion}
                      className="absolute right-2 top-1.5 p-1 bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
                    >
                      <Sparkles size={16} />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                  <select 
                    className="w-full border rounded p-2 text-sm"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as any})}
                  >
                    <option>Vegetables</option>
                    <option>Rice Items</option>
                    <option>Fruits</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Total Quantity (Units)</label>
                  <input 
                    type="number" 
                    className="w-full border rounded p-2 text-sm" 
                    value={formData.quantity}
                    onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Unit Price (₹)</label>
                  <input 
                    type="number" 
                    className="w-full border rounded p-2 text-sm" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Bulk Price (₹)</label>
                  <input 
                    type="number" 
                    className="w-full border rounded p-2 text-sm" 
                    value={formData.bulkPrice}
                    onChange={e => setFormData({...formData, bulkPrice: parseInt(e.target.value)})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Marketing Description</label>
                  <textarea 
                    className="w-full border rounded p-2 text-sm h-20" 
                    placeholder="Write something nice about your product..."
                    value={formData.description}
                    readOnly={loadingAI}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border py-3 rounded font-bold hover:bg-gray-50 transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 shadow shadow-green-200 transition-all">List on Market</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
