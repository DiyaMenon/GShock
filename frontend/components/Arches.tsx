import React from 'react';
import Video892 from './Video-892.mp4';
import Video516 from './Video-516.mp4'
import Video637 from './Video-637.mp4'
const Arches: React.FC = () => {
  const arches = [
    {
      video: Video516,
      desc: 'From fresh pizzas to crispy potato wedges we serve hot!!'
    },
    {
      video: Video892,
      desc: 'Enjoy Robusta beans at Rabuste'
    },
    {
      video: Video637,
      desc: 'Grab and Go service for hustlers'
    }
  ];

  return (
    <section className="bg-[#3E2723] py-24 text-cream">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-oswald font-bold uppercase mb-6">Highlights </h2>
        <p className="max-w-xl mx-auto opacity-80 mb-8">
          
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-4 max-w-7xl mx-auto">
        {arches.map((item, i) => (
          <a key={i} href="#" className="group relative w-full md:w-1/3 aspect-[3/4] overflow-hidden rounded-t-[10rem]">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            >
              <source src={item.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col justify-end p-8 text-center">
              <h3 className="text-md font-oswald uppercase mb-2">{item.desc}</h3>
            
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Arches;