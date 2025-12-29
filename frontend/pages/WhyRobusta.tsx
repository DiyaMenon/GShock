import React from 'react';

const WhyRobusta: React.FC = () => {
  const features = [
    {
      title: "Unyielding Nature",
      desc: "Cultivated at lower altitudes, Robusta plants are naturally high in caffeine and chlorogenic acid—natural pesticides that make them incredibly hardy against 'coffee leaf rust' and insects.",
      tags: ["Resilient", "Natural Protection"],
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Economic Impact",
      desc: "Farmers love Robusta for its yield. Producing significantly more fruit per tree than Arabica, it provides a stable livelihood for millions of families in Vietnam, Brazil, and Africa.",
      tags: ["High Yield", "Sustainability"],
      image: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?q=80&w=1950&auto=format&fit=crop"
    },
    {
      title: "Master of Crema",
      desc: "For the perfect espresso, Robusta is irreplaceable. It generates a thicker, longer-lasting crema that stabilizes the foam and carries deep, earthy aromas that persist in the cup.",
      tags: ["Espresso Grade", "Texture"],
      image: "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=1887&auto=format&fit=crop"
    }
  ];

  return (
    <div className="animate-fadeIn">
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-24">
          <h2 className="text-6xl font-black text-coffee-dark mb-6 tracking-tighter">The Case for <br/><span className="text-coffee-vivid">Robusta.</span></h2>
          <p className="text-xl text-coffee-dark/60 max-w-2xl leading-relaxed">
            More than just a source of energy, Robusta is the backbone of global coffee culture, offering a distinct sensory experience and unmatched environmental durability.
          </p>
        </header>

        <div className="space-y-40">
          {features.map((feature, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}>
              <div className="flex-1 w-full">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-coffee-vivid/10 rounded-[2.5rem] transform group-hover:scale-105 transition-transform duration-500"></div>
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="relative rounded-[2rem] w-full h-[500px] object-cover shadow-2xl transition-all duration-700 hover:brightness-110"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-8">
                <div className="flex gap-2">
                  {feature.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-coffee-soft border border-coffee-vivid/20 text-coffee-medium text-[10px] font-black uppercase tracking-widest rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl font-serif font-bold text-coffee-dark">{feature.title}</h3>
                <p className="text-lg text-coffee-dark/70 leading-relaxed font-medium">
                  {feature.desc}
                </p>
                <div className="pt-4">
                  <button className="flex items-center gap-4 text-coffee-vivid font-black uppercase tracking-[0.2em] text-sm group">
                    Deep Dive 
                    <span className="w-12 h-[2px] bg-coffee-vivid group-hover:w-20 transition-all"></span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 p-16 bg-white border-2 border-coffee-dark/5 rounded-[3rem] text-center relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-2 h-full bg-coffee-vivid"></div>
           <h3 className="text-3xl font-serif mb-6 text-coffee-dark font-bold italic">The "Fine Robusta" Paradigm</h3>
           <p className="text-lg text-coffee-dark/60 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
             By applying specialty processing methods—selective picking, controlled fermentation, and expert roasting—the Robusta bean transcends its "harsh" reputation.
           </p>
           <div className="flex flex-wrap justify-center gap-6">
             {["Hand-Picked", "Sun-Dried", "Micro-Lots"].map(item => (
               <div key={item} className="flex items-center gap-2 text-coffee-dark font-bold">
                 <svg className="w-5 h-5 text-coffee-vivid" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                 {item}
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default WhyRobusta;