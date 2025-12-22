
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Filter, 
  X,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { MenuItem, Category, CoffeeTag } from '../types';

interface MenuManagementProps {
  items: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onUpdateItem: (item: MenuItem) => void;
}

const MenuManagement: React.FC<MenuManagementProps> = ({ items, onAddItem, onUpdateItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newItem: MenuItem = {
      id: editingItem?.id || Math.random().toString(36).substr(2, 9),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as Category,
      imageUrl: formData.get('imageUrl') as string || 'https://picsum.photos/seed/coffee/400/400',
      stockStatus: formData.get('stockStatus') as 'In Stock' | 'Out of Stock',
      roastLevel: formData.get('roastLevel') as string,
      tastingNotes: formData.get('tastingNotes') as string,
      tags: Array.from(formData.getAll('tags')) as CoffeeTag[],
    };

    if (editingItem) {
      onUpdateItem(newItem);
    } else {
      onAddItem(newItem);
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-serif font-bold tracking-tight">The Rabuste Collection</h2>
          <p className="text-neutral-500 mt-1">Curate and manage your high-end inventory.</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors"
        >
          <Plus size={18} />
          <span>New Offering</span>
        </button>
      </header>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          <input 
            type="text"
            placeholder="Search the collection..."
            className="w-full bg-black border border-neutral-800 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-neutral-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-3 bg-neutral-800 rounded-xl text-sm border border-transparent hover:border-neutral-600">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-neutral-900 border border-neutral-800 rounded-3xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Image</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Product Details</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Category</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Price</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {filteredItems.map(item => (
              <tr key={item.id} className="hover:bg-neutral-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-neutral-800 bg-black">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-neutral-500 line-clamp-1">{item.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-black border border-neutral-700 rounded text-neutral-400">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-serif">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.stockStatus === 'In Stock' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-xs">{item.stockStatus}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                    className="p-2 text-neutral-500 hover:text-white transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal / Slide-over */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl h-full bg-neutral-900 border-l border-neutral-800 rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-8 border-b border-neutral-800 flex justify-between items-center bg-black/40">
              <h3 className="text-2xl font-serif font-bold">{editingItem ? 'Refine Offering' : 'New Offering'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-800 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-6 h-[calc(100%-100px)] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-2">Item Name</label>
                  <input 
                    name="name"
                    required
                    defaultValue={editingItem?.name}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-neutral-500 outline-none" 
                  />
                </div>
                
                <div className="col-span-1">
                  <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-2">Price ($)</label>
                  <input 
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    defaultValue={editingItem?.price}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-neutral-500 outline-none" 
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-2">Category</label>
                  <select 
                    name="category"
                    defaultValue={editingItem?.category || Category.COFFEE}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-neutral-500 outline-none"
                  >
                    {Object.values(Category).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-2">Description</label>
                  <textarea 
                    name="description"
                    rows={3}
                    defaultValue={editingItem?.description}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-neutral-500 outline-none resize-none"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-2">Roast Level</label>
                  <input 
                    name="roastLevel"
                    placeholder="e.g. Expressive Dark"
                    defaultValue={editingItem?.roastLevel}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-neutral-500 outline-none" 
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-2">Tasting Notes</label>
                  <input 
                    name="tastingNotes"
                    placeholder="e.g. Earthy | Intense"
                    defaultValue={editingItem?.tastingNotes}
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-neutral-500 outline-none" 
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-2">Collection Tags</label>
                  <div className="flex flex-wrap gap-4 p-4 bg-black border border-neutral-800 rounded-xl">
                    {Object.values(CoffeeTag).map(tag => (
                      <label key={tag} className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            name="tags" 
                            value={tag} 
                            defaultChecked={editingItem?.tags.includes(tag)}
                            className="peer sr-only" 
                          />
                          <div className="w-5 h-5 border border-neutral-700 rounded bg-neutral-900 peer-checked:bg-white peer-checked:border-white transition-all flex items-center justify-center">
                            <Check size={14} className="text-black scale-0 peer-checked:scale-100 transition-transform" />
                          </div>
                        </div>
                        <span className="text-xs text-neutral-400 group-hover:text-white transition-colors">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-2">Image URL</label>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-black border border-neutral-800 rounded-xl flex items-center justify-center shrink-0">
                      <ImageIcon className="text-neutral-700" />
                    </div>
                    <input 
                      name="imageUrl"
                      placeholder="https://..."
                      defaultValue={editingItem?.imageUrl}
                      className="flex-1 bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-neutral-500 outline-none h-20"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-2">Stock Availability</label>
                  <div className="flex gap-4">
                    <label className="flex-1">
                      <input type="radio" name="stockStatus" value="In Stock" defaultChecked={editingItem?.stockStatus !== 'Out of Stock'} className="peer sr-only" />
                      <div className="text-center py-3 bg-black border border-neutral-800 rounded-xl text-xs font-bold text-neutral-500 peer-checked:border-white peer-checked:text-white cursor-pointer transition-all">
                        In Stock
                      </div>
                    </label>
                    <label className="flex-1">
                      <input type="radio" name="stockStatus" value="Out of Stock" defaultChecked={editingItem?.stockStatus === 'Out of Stock'} className="peer sr-only" />
                      <div className="text-center py-3 bg-black border border-neutral-800 rounded-xl text-xs font-bold text-neutral-500 peer-checked:border-red-500 peer-checked:text-red-500 cursor-pointer transition-all">
                        Sold Out
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex gap-4 sticky bottom-0 bg-neutral-900 pb-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 border border-neutral-800 rounded-full text-sm font-bold hover:bg-neutral-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-white text-black rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors"
                >
                  {editingItem ? 'Save Changes' : 'Add to Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
