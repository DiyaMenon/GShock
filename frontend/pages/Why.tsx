
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <a 
    href="#" 
    className="group flex flex-col items-center gap-2 py-6 transition-all duration-300 hover:bg-coffee-vivid/5 relative"
  >
    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-coffee-soft text-coffee-medium group-hover:bg-coffee-vivid group-hover:text-white transition-all duration-300 group-hover:rotate-12">
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-coffee-dark/40 group-hover:text-coffee-vivid transition-colors">
      {label}
    </span>
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-coffee-vivid group-hover:h-1/2 transition-all duration-300 rounded-r-full"></div>
  </a>
);

const Why: React.FC = () => {
  return (
    <div className="animate-fadeIn flex">
      {/* Home Sidebar - Hidden on mobile, fixed on desktop */}
      <aside className="hidden lg:flex fixed left-0 top-20 bottom-0 w-24 bg-white border-r border-coffee-vivid/10 flex-col py-8 z-40">
        <div className="flex-grow flex flex-col divide-y divide-coffee-vivid/5">
          <SidebarLink 
            label="Menu" 
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            } 
          />
          <SidebarLink 
            label="Workshop" 
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            } 
          />
          <SidebarLink 
            label="Roastery" 
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            } 
          />
          <SidebarLink 
            label="Eco" 
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            } 
          />
        </div>
        
        <div className="px-4 py-8 flex flex-col items-center gap-6">
          <div className="w-1 h-12 bg-coffee-vivid/20 rounded-full"></div>
          <div className="rotate-90 origin-center whitespace-nowrap text-[8px] font-black uppercase tracking-[0.5em] text-coffee-medium/40 py-10">
            Scroll to Discover
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow lg:pl-24">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center px-6 md:px-12 overflow-hidden bg-white">
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
             <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white z-10"></div>
             <img 
              src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop" 
              alt="Robusta Coffee" 
              className="w-full h-full object-cover opacity-80 transition-transform duration-[10s] hover:scale-110"
            />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-20">
            <div className="max-w-2xl">
              <span className="inline-block py-1 px-4 bg-coffee-vivid/10 text-coffee-vivid rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-8 animate-fadeIn">
                EST. Coffea Canephora
              </span>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] text-coffee-dark tracking-tighter">
                Boldly <br/> <span className="text-coffee-vivid italic font-serif font-normal">Different.</span>
              </h1>
              <p className="text-xl md:text-2xl text-coffee-dark/70 mb-12 font-medium leading-relaxed max-w-lg">
                Unlock the untapped potential of Robusta. Higher caffeine, richer crema, and a resilience that defines the future of coffee.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/why" 
                  className="bg-coffee-dark text-white font-bold py-5 px-10 rounded-full hover:bg-coffee-vivid transition-all transform hover:-translate-y-1 shadow-lg shadow-coffee-dark/10"
                >
                  Explore Why
                </Link>
                <Link 
                  to="/flavor" 
                  className="bg-white border-2 border-coffee-dark/10 text-coffee-dark font-bold py-5 px-10 rounded-full hover:border-coffee-vivid hover:text-coffee-vivid transition-all"
                >
                  Flavor Profile
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Insight Section */}
        <section className="py-32 bg-coffee-soft">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="group">
                <div className="text-6xl font-serif text-coffee-vivid/20 group-hover:text-coffee-vivid mb-4 transition-colors font-black">01</div>
                <h3 className="text-2xl font-bold mb-4 text-coffee-dark">Superior Kick</h3>
                <p className="text-coffee-dark/60 leading-relaxed">Nearly 2.7% caffeine content provides a clean, potent energy that lasts significantly longer than traditional Arabica.</p>
              </div>
              <div className="group">
                <div className="text-6xl font-serif text-coffee-vivid/20 group-hover:text-coffee-vivid mb-4 transition-colors font-black">02</div>
                <h3 className="text-2xl font-bold mb-4 text-coffee-dark">The Secret of Crema</h3>
                <p className="text-coffee-dark/60 leading-relaxed">The high oil content and density make it the master of crema, providing that thick, velvety texture sought by world-class baristas.</p>
              </div>
              <div className="group">
                <div className="text-6xl font-serif text-coffee-vivid/20 group-hover:text-coffee-vivid mb-4 transition-colors font-black">03</div>
                <h3 className="text-2xl font-bold mb-4 text-coffee-dark">Climate Champion</h3>
                <p className="text-coffee-dark/60 leading-relaxed">Tougher, faster-growing, and resistant to heat. Robusta is the ecological insurance policy for our morning rituals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Quote */}
        <section className="py-40 text-center px-6">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-coffee-vivid mx-auto mb-12"></div>
            <h2 className="text-4xl md:text-6xl font-serif italic text-coffee-dark leading-tight">
              "Robusta is not the alternative; it is the evolution of coffee for a world that needs strength."
            </h2>
            <p className="mt-8 uppercase tracking-[0.4em] font-bold text-coffee-medium text-sm">— The Modern Barista</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Why;
