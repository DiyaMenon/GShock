import React, { useState } from 'react';
import axios from 'axios';
import { CoffeeItem, MenuCategory } from '../../types';

// ... (Interfaces match previous code) ...
interface BackendPairingResponse {
  coffee?: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    tags?: string[];
  };
  art?: {
    _id: string;
    title: string;
    artistName?: string;
    primaryImageUrl: string;
    price: number;
  };
  reasoning: string;
}

interface SynesthesiaPairingProps {
  onAddToCart: (item: CoffeeItem) => void;
}

const VIBE_OPTIONS = [
  { id: 'bold', label: 'Bold & Intense', desc: 'High energy, sharp focus' },
  { id: 'smooth', label: 'Smooth & Contemplative', desc: 'Slow living, soft textures' },
  { id: 'earthy', label: 'Earthy & Grounded', desc: 'Natural tones, deep roots' },
];

export const SynesthesiaPairing: React.FC<SynesthesiaPairingProps> = ({ onAddToCart }) => {
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState<'coffee' | 'art' | null>(null);
  const [result, setResult] = useState<BackendPairingResponse | null>(null);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

  // Initial Full Analysis
  const handleAnalysis = async (vibeId: string) => {
    setSelectedVibe(vibeId);
    setIsAnalyzing(true);
    setResult(null);
    setError('');

    try {
      const response = await axios.get(`${API_BASE_URL}/synesthesia/pair`, {
        params: { vibe: vibeId, type: 'both', t: Date.now() }
      });
      setTimeout(() => {
        setResult(response.data);
        setIsAnalyzing(false);
      }, 1500);
    } catch (err) {
      setError("Our curators are offline. Please try again.");
      setIsAnalyzing(false);
    }
  };

  // Independent Shuffle Logic (Updated with excludeId)
  const handleShuffle = async (type: 'coffee' | 'art') => {
    if (!selectedVibe || !result) return;
    setIsRefreshing(type);

    try {
      const params: any = { 
        vibe: selectedVibe, 
        type: type, 
        t: Date.now() 
      };

      // Pass the current ID to exclude it from the next random pick
      if (type === 'coffee' && result.coffee?._id) {
        params.excludeMenuId = result.coffee._id;
      }
      if (type === 'art' && result.art?._id) {
        params.excludeArtId = result.art._id;
      }

      const response = await axios.get(`${API_BASE_URL}/synesthesia/pair`, { params });

      // Merge new data with existing state
      setResult(prev => {
        if (!prev) return null;
        return {
          ...prev,
          coffee: type === 'coffee' ? response.data.coffee : prev.coffee,
          art: type === 'art' ? response.data.art : prev.art
        };
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(null);
    }
  };

  const handleAddCoffee = () => {
    if (!result?.coffee) return;
    onAddToCart({
      id: result.coffee._id,
      name: result.coffee.name,
      description: result.coffee.description,
      price: `₹${result.coffee.price}`,
      imageUrl: result.coffee.imageUrl,
      category: result.coffee.category as MenuCategory,
      tags: result.coffee.tags || []
    });
  };

  return (
    <section className="py-24 bg-[#F9F9F9] relative overflow-hidden">
      {/* Background & Header UI Code (Same as before) ... */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3E2723] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3E2723] mb-4">Beta Feature</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#3E2723] mb-6 font-oswald">Synesthesia Pairing Engine</h3>
          <p className="max-w-2xl mx-auto text-gray-600 serif italic">
            Select your current vibe. Lock your favorite choice and shuffle the rest.
          </p>
        </div>

        {/* Vibe Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {VIBE_OPTIONS.map((vibe) => (
            <button
              key={vibe.id}
              onClick={() => handleAnalysis(vibe.id)}
              disabled={isAnalyzing}
              className={`
                group relative px-8 py-6 w-full md:w-64 text-left border transition-all duration-300
                ${selectedVibe === vibe.id 
                  ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-xl scale-105' 
                  : 'bg-white text-[#3E2723] border-gray-200 hover:border-[#3E2723] hover:shadow-lg'
                }
              `}
            >
              <span className="block text-[10px] uppercase tracking-widest opacity-70 mb-2">Vibe Selection</span>
              <span className="block text-xl font-bold uppercase tracking-tight mb-1">{vibe.label}</span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-1 bg-[#3E2723] animate-pulse mb-4"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Analyzing Palate & Aesthetics...</p>
          </div>
        )}

        {/* Results */}
        {!isAnalyzing && result && result.coffee && result.art && (
          <div className="animate-fade-in-up">
            <div className="bg-white p-8 border border-gray-100 shadow-2xl relative">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* --- COFFEE CARD --- */}
                <div className="relative group">
                  <div className="flex justify-between items-center mb-4">
                     <div className="bg-[#3E2723] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                       Taste Profile
                     </div>
                     {/* Shuffle Coffee Button */}
                     <button 
                       onClick={() => handleShuffle('coffee')}
                       disabled={isRefreshing === 'coffee'}
                       className="text-gray-400 hover:text-[#3E2723] transition-colors p-2"
                       title="Try different coffee"
                     >
                       <span className={`text-xl block ${isRefreshing === 'coffee' ? 'animate-spin' : ''}`}>↻</span>
                     </button>
                  </div>

                  <div className="aspect-square overflow-hidden bg-gray-100 mb-6">
                    <img src={result.coffee.imageUrl} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-2xl font-bold uppercase tracking-tighter text-[#3E2723]">{result.coffee.name}</h4>
                  <p className="text-sm text-gray-500 mb-4">₹{result.coffee.price}</p>
                  <button onClick={handleAddCoffee} className="w-full bg-[#3E2723] text-white py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-900 transition-colors">
                    Add to Order
                  </button>
                </div>

                {/* --- ART CARD --- */}
                <div className="relative border-l-0 lg:border-l border-gray-100 lg:pl-12">
                   <div className="flex justify-between items-center mb-4">
                     <div className="bg-gray-100 text-gray-800 text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                        Visual Match
                     </div>
                     {/* Shuffle Art Button */}
                     <button 
                       onClick={() => handleShuffle('art')}
                       disabled={isRefreshing === 'art'}
                       className="text-gray-400 hover:text-[#3E2723] transition-colors p-2"
                       title="Try different art"
                     >
                       <span className={`text-xl block ${isRefreshing === 'art' ? 'animate-spin' : ''}`}>↻</span>
                     </button>
                   </div>

                    <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-6 shadow-inner">
                      <img src={result.art.primaryImageUrl} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <h4 className="text-2xl font-bold uppercase tracking-tighter text-[#3E2723] italic">"{result.art.title}"</h4>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{result.art.artistName}</p>
                      </div>
                      <p className="text-sm font-medium text-[#3E2723]">₹{result.art.price}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 border-l-2 border-[#3E2723]">
                      <p className="text-sm text-gray-600 leading-relaxed serif italic">{result.reasoning}</p>
                    </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};