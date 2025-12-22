
import React, { useState } from 'react';
import { Search, Plus, MoreVertical, X, Image as ImageIcon } from 'lucide-react';
import { Artwork, ArtStatus } from '../types';

interface Props {
  artworks: Artwork[];
  onAdd: (art: Artwork) => void;
  onUpdate: (art: Artwork) => void;
}

const ArtGalleryManagement: React.FC<Props> = ({ artworks, onAdd, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Artwork | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const item: Artwork = {
      id: editing?.id || Math.random().toString(36).substr(2, 9),
      title: fd.get('title') as string,
      artist: fd.get('artist') as string,
      year: fd.get('year') as string,
      medium: fd.get('medium') as string,
      dimensions: fd.get('dimensions') as string,
      price: parseFloat(fd.get('price') as string),
      status: fd.get('status') as ArtStatus,
      primaryImageUrl: fd.get('primaryImageUrl') as string,
      hoverImageUrl: fd.get('hoverImageUrl') as string,
      themeColor: fd.get('themeColor') as string,
      tastingNotes: fd.get('tastingNotes') as string,
    };
    editing ? onUpdate(item) : onAdd(item);
    setIsModalOpen(false);
    setEditing(null);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-serif font-bold tracking-tight">Micro Art Gallery</h2>
          <p className="text-neutral-500 mt-1">Manage exhibitions and commercial art pieces.</p>
        </div>
        <button onClick={() => { setEditing(null); setIsModalOpen(true); }} className="px-6 py-3 bg-white text-black rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2">
          <Plus size={18} /> New Artwork
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map(art => (
          <div key={art.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden group hover:border-neutral-600 transition-all">
            <div className="aspect-[4/5] relative bg-black overflow-hidden">
              <img src={art.primaryImageUrl} alt={art.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4">
                 <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-black/80 border border-neutral-700 ${art.status === ArtStatus.SOLD_OUT ? 'text-red-400' : 'text-green-400'}`}>
                   {art.status}
                 </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-serif font-bold text-xl">{art.title}</h3>
                  <p className="text-sm text-neutral-400">{art.artist}, {art.year}</p>
                </div>
                <button onClick={() => { setEditing(art); setIsModalOpen(true); }} className="text-neutral-500 hover:text-white">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">Medium</p>
                  <p className="text-xs text-neutral-300">{art.medium}</p>
                </div>
                <p className="text-lg font-serif font-bold">${art.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl h-full bg-neutral-900 border-l border-neutral-800 rounded-3xl overflow-y-auto">
            <div className="p-8 border-b border-neutral-800 flex justify-between items-center">
              <h3 className="text-2xl font-serif font-bold">{editing ? 'Refine Work' : 'Catalogue Work'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-800 rounded-full"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Title</label>
                  <input name="title" defaultValue={editing?.title} required className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Artist</label>
                  <input name="artist" defaultValue={editing?.artist} required className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Year</label>
                  <input name="year" defaultValue={editing?.year} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Medium</label>
                  <input name="medium" defaultValue={editing?.medium} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Dimensions</label>
                  <input name="dimensions" defaultValue={editing?.dimensions} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Price ($)</label>
                  <input name="price" type="number" defaultValue={editing?.price} required className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Status</label>
                  <select name="status" defaultValue={editing?.status} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none">
                    {Object.values(ArtStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Primary Image URL</label>
                  <input name="primaryImageUrl" defaultValue={editing?.primaryImageUrl} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Hover Reveal Image URL</label>
                  <input name="hoverImageUrl" defaultValue={editing?.hoverImageUrl} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Theme Color (Hex)</label>
                  <input name="themeColor" type="color" defaultValue={editing?.themeColor || '#000000'} className="w-full h-11 bg-black border border-neutral-800 rounded-xl px-1 py-1 focus:border-white transition-colors outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Tasting Notes (Vibe)</label>
                  <input name="tastingNotes" defaultValue={editing?.tastingNotes} placeholder="e.g. Velvety | Deep" className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-white transition-colors outline-none" />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors mt-4">
                Save Artwork
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtGalleryManagement;
