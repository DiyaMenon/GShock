import React, { useLayoutEffect, useRef, useState, useMemo, useEffect } from 'react';
import { FAQS } from './constants'; // Assuming you have this file
import { WorkshopType } from './types'; // Assuming you have this file
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- REFINED PALETTE (High Contrast / Sophisticated) ---
const THEME = {
  espresso: '#3E2723', // Deepest Brown (Hero BG, Primary Text)
  bronze: '#966328',   // Rich Caramel (Buttons, Borders)
  gold: '#D99A46',     // Golden Earth (Highlights, Hover states)
  latte: '#F5EFE6',    // Very Pale Beige (FAQ BG, Sidebar BG)
  cream: '#FFFCF2',    // Almost White (Main Page BG)
  white: '#FFFFFF'
};

/* ================= WORKSHOP CARD ================= */

const WorkshopCard: React.FC<{ workshop: WorkshopType }> = ({ workshop }) => {
  const [booked, setBooked] = useState(false);

  const handleReserve = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 3000);
  };

  return (
    <div className="workshop-card group relative w-full h-[28rem] bg-white border border-opacity-20 rounded-t-[4rem] overflow-hidden opacity-0 translate-y-12 shadow-sm hover:shadow-xl transition-shadow duration-500"
         style={{ borderColor: THEME.bronze }}>
      
      {/* ---------- PART 1 : IMAGE ---------- */}
      <div className="relative h-full overflow-hidden transition-all duration-500 group-hover:h-1/2">
        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
        />
        
        {/* Title Overlay (Visible initially) */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
          <span className="bg-white/90 backdrop-blur-md text-black text-[24px] text-center font-bold uppercase tracking-widest px-6 py-3 shadow-lg border border-black/5">
            {workshop.title}
          </span>
        </div>
      </div>

      {/* ---------- PART 2 : CONTENT (SLIDE UP) ---------- */}
      <div className="absolute inset-x-0 bottom-0 top-auto h-1/2 py-6 px-6 flex flex-col bg-white border-t transition-all duration-500 translate-y-full group-hover:translate-y-0"
           style={{ backgroundColor: THEME.cream, borderColor: THEME.bronze }}>
        
        <div className="flex justify-between items-start mb-4 border-b pb-4" style={{ borderColor: `${THEME.bronze}30` }}>
           <h3 className="text-lg font-serif font-black uppercase leading-none" style={{ color: THEME.espresso }}>
            {workshop.title}
          </h3>
          <div className="text-right">
             <div className="text-[14px] font-bold uppercase tracking-widest" style={{ color: THEME.bronze }}>
              {new Date(workshop.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
            </div>
             <div className="text-[11px] font-medium uppercase text-black/40">
               {new Date(workshop.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
             </div>
          </div>
        </div>

        <p className="font-light mb-4 line-clamp-3 text-[13px] italic leading-relaxed" style={{ color: `${THEME.espresso}CC` }}>
          {workshop.description}
        </p>

        <div className="mt-auto flex items-center gap-4">
          <div className="text-[18px] font-black uppercase tracking-widest"
               style={{ color: THEME.bronze }}>
            {workshop.price === 0 ? 'FREE' : `₹${workshop.price}`}
          </div>
          <button
            onClick={handleReserve}
            disabled={booked}
            style={{ 
              backgroundColor: booked ? THEME.bronze : THEME.espresso,
              color: THEME.white
            }}
            className="flex-1 text-[10px] font-black uppercase tracking-[0.2em] py-3 transition-all duration-300 hover:opacity-90 active:scale-95"
          >
            {booked ? 'Reserved' : 'Book Seat'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= FAQ ITEM ================= */

const FaqItem: React.FC<{ faq: { question: string; answer: string } }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b py-6 last:border-0" style={{ borderColor: `${THEME.bronze}40` }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <h3 className="text-lg md:text-xl font-serif italic transition-colors duration-300 pr-8"
            style={{ color: isOpen ? THEME.bronze : THEME.espresso }}>
          {faq.question}
        </h3>
        <span
          className={`text-2xl font-light transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}
          style={{ color: THEME.bronze }}
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm font-light leading-loose max-w-2xl"
             style={{ color: `${THEME.espresso}CC` }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */

const Workshop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // State
  const [workshops, setWorkshops] = useState<WorkshopType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceFilters, setPriceFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('date-asc');

  // Fetch Logic (Kept same as before)
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        // Mock data for display if API fails or for demo
        const mockData = [
            { id: 1, title: 'Latte Art Basics', date: '2025-01-20', startTime: '2025-01-20T10:00:00', endTime: '2025-01-20T12:00:00', description: 'Learn the fundamentals of milk frothing and pouring.', price: 2500, image: 'https://images.unsplash.com/photo-1551816557-4b77f804523d?q=80&w=2000&auto=format&fit=crop' },
            { id: 2, title: 'Espresso Calibration', date: '2025-01-22', startTime: '2025-01-22T14:00:00', endTime: '2025-01-22T16:00:00', description: 'Dial in your grinder and machine for the perfect shot.', price: 3000, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop' },
            { id: 3, title: 'Cupping & Sensory', date: '2025-01-25', startTime: '2025-01-25T11:00:00', endTime: '2025-01-25T13:00:00', description: 'Expand your palate with our head roaster.', price: 0, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1887&auto=format&fit=crop' },
        ];
        
        // Uncomment below for real API
        // const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/workshops`);
        // if (!response.ok) throw new Error('Failed');
        // const data = await response.json();
        
        setWorkshops(mockData); 
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load workshops.');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  // Filtering Logic (Kept same)
  const filteredAndSortedWorkshops = useMemo(() => {
    let result = [...workshops];
    if (priceFilters.length > 0) {
      result = result.filter(w => {
        if (priceFilters.includes('Free') && w.price === 0) return true;
        if (priceFilters.includes('Paid') && w.price > 0) return true;
        return false;
      });
    }
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'date-desc': return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc': default: return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });
    return result;
  }, [workshops, priceFilters, sortBy]);

  const handlePriceFilterChange = (price: string) => {
    setPriceFilters(prev => prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      gsap.to('.workshop-card', {
        scrollTrigger: { trigger: '.workshop-grid', start: 'top 90%' },
        y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power4.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, [filteredAndSortedWorkshops]);

  return (
    <div ref={containerRef} className="min-h-screen font-sans selection:text-white"
         style={{ backgroundColor: THEME.cream, '--tw-selection-bg': THEME.bronze } as React.CSSProperties}>
      
      {/* ---------------- NAVIGATION PLACEHOLDER ---------------- */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
          <div className="font-bold tracking-widest text-lg" style={{ color: THEME.white }}>RABUSTE</div>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest" style={{ color: THEME.white }}>
             {/* Forced white color to prevent blue links */}
             <a href="#" className="hover:opacity-70 transition-opacity">Visit Café</a>
             <a href="#" className="hover:opacity-70 transition-opacity">Login</a>
             <a href="#" className="hover:opacity-70 transition-opacity">Cart (0)</a>
          </div>
      </nav>

      {/* ---------------- HERO SECTION (Fixed: Deep Espresso Background) ---------------- */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden"
               style={{ backgroundColor: THEME.espresso }}>
        
        {/* Subtle decorative circle */}
        <div className="absolute top-[-20%] right-[-10%] w-[50vh] h-[50vh] rounded-full blur-[100px] opacity-20"
             style={{ backgroundColor: THEME.gold }}></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vh] h-[40vh] rounded-full blur-[80px] opacity-10"
             style={{ backgroundColor: THEME.bronze }}></div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block"
                style={{ color: THEME.bronze }}>
            The Lab Curriculum
          </span>

          <h1 className="text-6xl md:text-8xl font-serif uppercase text-white mb-6 leading-[0.9]">
            Brewing <br />
            <span className="italic font-light lowercase opacity-90" style={{ color: THEME.gold }}>
              Sophistication
            </span>
          </h1>

          <p className="text-lg font-light max-w-lg mx-auto leading-relaxed opacity-80" style={{ color: THEME.white }}>
            Join our sensory scientists and master baristas in exploring the technical
            limits of coffee extraction and flavor profiling.
          </p>
        </div>
      </section>

      {/* ---------------- WORKSHOPS HEADER ---------------- */}
      <div className="text-center py-20 border-b border-opacity-10"
           style={{ backgroundColor: THEME.cream, borderColor: THEME.espresso }}>
        <h2 className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tight"
            style={{ color: THEME.espresso }}>
          Technical Masterclasses
        </h2>
      </div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <section className="py-20 px-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
          
          {/* SIDEBAR (Fixed: Lighter, cleaner background) */}
          <aside className="sticky top-12 h-fit rounded-[2rem] p-8"
                 style={{ backgroundColor: THEME.latte }}> {/* Changed from muddy brown to Latte */}
            
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: THEME.espresso }}>
                Refine
              </h3>
              <button 
                onClick={() => {setPriceFilters([]); setSortBy('date-asc');}}
                className="text-[10px] uppercase font-bold hover:opacity-60 transition-opacity"
                style={{ color: THEME.bronze }}
              >
                Reset
              </button>
            </div>

            {/* SORTING */}
            <div className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-40" style={{ color: THEME.espresso }}>Sort By</p>
              <div className="space-y-2">
                {[
                  { id: 'date-asc', label: 'Earliest Date' },
                  { id: 'date-desc', label: 'Latest Date' },
                  { id: 'price-asc', label: 'Price: Low to High' },
                  { id: 'price-desc', label: 'Price: High to Low' }
                ].map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`block w-full text-left text-sm transition-all duration-300 ${
                      sortBy === option.id ? 'translate-x-2 font-bold' : 'hover:translate-x-1 opacity-60 hover:opacity-100'
                    }`}
                    style={{ color: THEME.espresso }}
                  >
                    {sortBy === option.id && <span className="mr-2" style={{ color: THEME.bronze }}>●</span>}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px mb-8 opacity-10" style={{ backgroundColor: THEME.espresso }} />

            {/* PRICE FILTER */}
            <div className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-40" style={{ color: THEME.espresso }}>Investment</p>
              <div className="space-y-4">
                {["Free", "Paid"].map(price => (
                  <label key={price} className="flex items-center justify-between text-sm cursor-pointer group">
                    <span className={`transition-colors duration-300 ${priceFilters.includes(price) ? 'font-bold' : 'opacity-70 group-hover:opacity-100'}`}
                          style={{ color: THEME.espresso }}>
                      {price}
                    </span>
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" checked={priceFilters.includes(price)} onChange={() => handlePriceFilterChange(price)} className="peer h-4 w-4 opacity-0 absolute cursor-pointer" />
                      <div className="h-4 w-4 border rounded transition-all duration-300 flex items-center justify-center"
                           style={{ borderColor: THEME.bronze, backgroundColor: priceFilters.includes(price) ? THEME.bronze : 'transparent' }}>
                        <div className={`h-1.5 w-1.5 bg-white rounded-sm transition-transform duration-300 ${priceFilters.includes(price) ? 'scale-100' : 'scale-0'}`}></div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

             {/* LINKS */}
             <div className="h-px mb-8 opacity-10" style={{ backgroundColor: THEME.espresso }} />
             <div>
                <ul className="space-y-3 text-sm opacity-80" style={{ color: THEME.espresso }}>
                     <li><a href="/" className="hover:underline">Home</a></li>
                     <li><a href="/menu" className="hover:underline">The Menu</a></li>
                     <li><a href="/art" className="hover:underline">Art Gallery</a></li>
                </ul>
             </div>
          </aside>

          {/* GRID */}
          <div className="flex-1">
            {!loading && !error && filteredAndSortedWorkshops.length > 0 ? (
              <div className="workshop-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {filteredAndSortedWorkshops.map(w => (
                  <WorkshopCard key={w.id} workshop={w} />
                ))}
              </div>
            ) : (
                <div className="py-20 text-center opacity-50" style={{ color: THEME.espresso }}>Loading or No Results</div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ SECTION (Fixed: Pale Background) ---------------- */}
      <section className="py-32 px-6" 
               style={{ backgroundColor: THEME.latte }}> {/* Fixed: Changed from Orange/Mustard to Pale Latte */}
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60" style={{ color: THEME.espresso }}>Need Help?</span>
             <h2 className="text-3xl font-serif font-bold mt-2" style={{ color: THEME.espresso }}>Common Queries</h2>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-opacity-10" style={{ borderColor: THEME.espresso }}>
            {FAQS.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Workshop;