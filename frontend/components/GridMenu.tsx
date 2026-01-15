import React from 'react';

const GridMenu: React.FC = () => {
  const items = [
    {
      title: 'Coffee',
      img: 'https://ik.imagekit.io/btpcp9tvm/GShock/coffee.jpeg',
      link: '/menu'
    },
    {
      title: 'Savory Bites',
      img: 'https://ik.imagekit.io/btpcp9tvm/GShock/savory.jpeg',
      link: '/menu'
    },
    {
      title: 'Desserts',
      img: 'https://ik.imagekit.io/btpcp9tvm/GShock/dessert.jpeg',
      link: '/menu'
    }
  ];

  return (
    <section className="w-full px-3 sm:px-4 md:px-6 lg:px-10 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.link}
            className="relative aspect-square group overflow-hidden rounded-lg md:rounded-xl border border-cream/10 bg-black/10"
          >
            {/* image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-500 flex flex-col items-center justify-center text-center px-4 sm:px-6">
              <h3 className="text-white text-sm sm:text-lg md:text-2xl font-bold uppercase mb-3 sm:mb-5 tracking-wide transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                {item.title}
              </h3>

              <span className="bg-cream text-[#3E2723] px-5 sm:px-7 py-1.5 sm:py-2.5 uppercase font-semibold text-[10px] sm:text-xs tracking-widest transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-100 hover:bg-gold hover:text-white">
                Shop
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default GridMenu;
