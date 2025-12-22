
import React, { useState } from 'react';
import { Search, Plus, Calendar, Users, X, Clock } from 'lucide-react';
import { Workshop, WorkshopCategory } from '../types';

interface Props {
  workshops: Workshop[];
  onAdd: (ws: Workshop) => void;
  onUpdate: (ws: Workshop) => void;
}

const WorkshopManagement: React.FC<Props> = ({ workshops, onAdd, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Workshop | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const item: Workshop = {
      id: editing?.id || Math.random().toString(36).substr(2, 9),
      title: fd.get('title') as string,
      description: fd.get('description') as string,
      startTime: fd.get('startTime') as string,
      endTime: fd.get('endTime') as string,
      category: fd.get('category') as WorkshopCategory,
      price: parseFloat(fd.get('price') as string),
      capacity: parseInt(fd.get('capacity') as string),
      attendees: editing?.attendees || [],
    };
    editing ? onUpdate(item) : onAdd(item);
    setIsModalOpen(false);
    setEditing(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-serif font-bold tracking-tight">Community & Workshops</h2>
          <p className="text-neutral-500 mt-1">Nurture expertise through foundations and expert sessions.</p>
        </div>
        <button onClick={() => { setEditing(null); setIsModalOpen(true); }} className="px-6 py-3 bg-white text-black rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2">
          <Plus size={18} /> Schedule Session
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {workshops.map(ws => (
          <div key={ws.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-neutral-700 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-neutral-700 ${ws.category === WorkshopCategory.EXPERT ? 'text-amber-400' : 'text-blue-400'}`}>
                  {ws.category}
                </span>
                <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                  <Clock size={12} /> {new Date(ws.startTime).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold">{ws.title}</h3>
              <p className="text-sm text-neutral-400 mt-1 line-clamp-1">{ws.description}</p>
            </div>
            <div className="flex items-center gap-12 text-center md:text-right">
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-1">Capacity</p>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Users size={14} className="text-neutral-500" />
                  {ws.attendees.length} / {ws.capacity}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-1">Price</p>
                <p className="text-lg font-serif font-bold">{ws.price === 0 ? 'FREE' : `$${ws.price}`}</p>
              </div>
              <button onClick={() => { setEditing(ws); setIsModalOpen(true); }} className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl h-full bg-neutral-900 border-l border-neutral-800 rounded-3xl overflow-y-auto">
            <div className="p-8 border-b border-neutral-800 flex justify-between items-center">
              <h3 className="text-2xl font-serif font-bold">{editing ? 'Modify Session' : 'New Workshop'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-800 rounded-full"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Title</label>
                  <input name="title" defaultValue={editing?.title} required className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Description</label>
                  <textarea name="description" rows={3} defaultValue={editing?.description} required className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Start Time</label>
                    <input name="startTime" type="datetime-local" defaultValue={editing?.startTime?.slice(0, 16)} required className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">End Time</label>
                    <input name="endTime" type="datetime-local" defaultValue={editing?.endTime?.slice(0, 16)} required className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Category</label>
                    <select name="category" defaultValue={editing?.category} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none">
                      {Object.values(WorkshopCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Price ($)</label>
                    <input name="price" type="number" defaultValue={editing?.price} required className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Capacity</label>
                    <input name="capacity" type="number" defaultValue={editing?.capacity} required className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors mt-4">
                Schedule Workshop
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopManagement;
