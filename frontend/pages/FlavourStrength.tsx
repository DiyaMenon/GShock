import React, { useState } from 'react';

interface FlavorNote {
  note: string;
  intensity: number;
  desc: string;
  details: string;
  icon: string;
}

const FlavorStrength: React.FC = () => {
  const [activeNote, setActiveNote] = useState<number | null>(null);

  const flavorNodes: FlavorNote[] = [
    { 
      note: "Dark Chocolate", 
      intensity: 90, 
      desc: "Intense, bittersweet cocoa base.", 
      details: "The signature characteristic of high-quality Robusta. It provides a heavy, lingering sweetness that balances the natural bitterness.",
      icon: "🍫"
    },
    { 
      note: "Roasted Peanut", 
      intensity: 75, 
      desc: "Savory, nutty undertones.", 
      details: "A distinct nuttiness that surfaces in the middle of the sip, often associated with a dry, pleasant finish similar to dark roasted legumes.",
      icon: "🥜"
    },
    { 
      note: "Earthy/Woody", 
      intensity: 85, 
      desc: "Classic robust character.", 
      details: "Deep, forest-like aromatic notes. Unlike some lower grades, specialty Robusta earthiness is clean, reminiscent of cedar or rich soil.",
      icon: "🌲"
    },
    { 
      note: "Molasses", 
      intensity: 65, 
      desc: "Rich sweetness in the finish.", 
      details: "A thick, syrupy sweetness that coats the palate, contributing significantly to the bean's legendary body and viscosity.",
      icon: "🍯"
    },
  ];

  return (
    <div className="animate-fadeIn py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
        
        {/* Left Column: Interactive Sensory Map */}
        <div className="space-y-16">
          <header>
            <h2 className="text-6xl font-black text-coffee-dark mb-8 tracking-tighter">Intensity <br/><span className="text-coffee-vivid">Defined.</span></h2>
            <p className="text-lg text-coffee-dark/60 leading-relaxed font-medium">
              Explore the sensory landscape. Hover over each profile to unlock deep-tasting notes and intensity benchmarks.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {flavorNodes.map((item, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setActiveNote(idx)}
                onMouseLeave={() => setActiveNote(null)}
                className={`group relative p-8 rounded-[2rem] border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                  activeNote === idx 
                    ? 'bg-white border-coffee-vivid shadow-2xl scale-[1.02] z-20' 
                    : 'bg-coffee-soft/30 border-transparent grayscale-[0.5] opacity-80'
                }`}
              >
                {/* Background Intensity Fill */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-coffee-vivid/5 transition-all duration-700"
                  style={{ height: activeNote === idx ? `${item.intensity}%` : '0%' }}
                ></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl">{item.icon}</span>
                    <span className={`text-2xl font-black transition-colors duration-300 ${activeNote === idx ? 'text-coffee-vivid' : 'text-coffee-medium'}`}>
                      {item.intensity}%
                    </span>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-coffee-dark mb-2">{item.note}</h4>
                  <p className="text-coffee-dark/60 text-sm font-medium mb-4 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className={`transition-all duration-500 overflow-hidden ${activeNote === idx ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-coffee-medium font-serif italic border-t border-coffee-vivid/10 pt-4">
                      {item.details}
                    </p>
                  </div>
                </div>

                {/* Progress Indicator Bar */}
                <div className="absolute bottom-4 left-8 right-8 h-1 bg-coffee-dark/5 rounded-full overflow-hidden">
                   <div 
                    className="h-full bg-coffee-vivid transition-all duration-1000"
                    style={{ width: `${item.intensity}%` }}
                   ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-8 bg-coffee-soft rounded-[2rem] border border-coffee-vivid/10 flex items-center gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-coffee-vivid flex items-center justify-center text-white animate-pulse">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-coffee-dark font-medium italic">
              "Sensory intensities are based on Specialty Coffee Association (SCA) cupping protocols for Fine Robusta."
            </p>
          </div>
        </div>

        {/* Right Column: Comparative Stats */}
        <div className="space-y-12">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-coffee-dark/5 border border-coffee-vivid/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-coffee-soft/50 rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 hover:scale-150"></div>
             
             <div className="absolute -top-6 -right-6 w-24 h-24 bg-coffee-vivid rounded-full flex items-center justify-center text-white font-black text-lg animate-float shadow-xl shadow-coffee-vivid/20">
                BOLDER
             </div>
             
             <h3 className="text-3xl font-serif font-bold text-coffee-dark mb-8 border-b border-coffee-vivid/10 pb-6">The Power Comparison</h3>
             
             <div className="space-y-10">
                <div className="group flex items-center gap-8 p-4 rounded-2xl hover:bg-coffee-soft transition-colors duration-300">
                  <div className="w-16 h-16 bg-coffee-soft group-hover:bg-white group-hover:shadow-md rounded-2xl flex items-center justify-center text-coffee-vivid transition-all">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-black text-xs uppercase tracking-widest text-coffee-medium mb-1">Caffeine Purity</h5>
                    <p className="text-3xl font-serif text-coffee-dark">2.7% <span className="text-sm font-sans font-normal opacity-40">vs 1.5% Arabica</span></p>
                  </div>
                </div>

                <div className="group flex items-center gap-8 p-4 rounded-2xl hover:bg-coffee-soft transition-colors duration-300">
                  <div className="w-16 h-16 bg-coffee-soft group-hover:bg-white group-hover:shadow-md rounded-2xl flex items-center justify-center text-coffee-vivid transition-all">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-black text-xs uppercase tracking-widest text-coffee-medium mb-1">Body Density</h5>
                    <p className="text-3xl font-serif text-coffee-dark">Viscous <span className="text-sm font-sans font-normal opacity-40">Heavy Mouthfeel</span></p>
                  </div>
                </div>

                <div className="group flex items-center gap-8 p-4 rounded-2xl hover:bg-coffee-soft transition-colors duration-300">
                  <div className="w-16 h-16 bg-coffee-soft group-hover:bg-white group-hover:shadow-md rounded-2xl flex items-center justify-center text-coffee-vivid transition-all">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-black text-xs uppercase tracking-widest text-coffee-medium mb-1">Antioxidants</h5>
                    <p className="text-3xl font-serif text-coffee-dark">Higher CGA <span className="text-sm font-sans font-normal opacity-40">Chlorogenic Acid</span></p>
                  </div>
                </div>
             </div>
          </div>

          <div className="p-8 bg-coffee-dark rounded-[2rem] text-white shadow-xl shadow-coffee-dark/20 relative group overflow-hidden">
             <div className="absolute inset-0 bg-coffee-vivid opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
             <h4 className="font-bold text-xl mb-3 flex items-center gap-3 relative z-10">
               <span className="w-2 h-2 bg-coffee-vivid rounded-full"></span>
               Barista's Tip
             </h4>
             <p className="text-white/80 leading-relaxed font-medium relative z-10">
               "When blending for espresso, use 15-20% high-quality Robusta. It anchors the blend, adds punch, and creates that iconic, persistent crema that consumers love."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorStrength;
