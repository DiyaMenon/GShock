import React from 'react';

interface BlockProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
  title: string;
  text: string;
  link: string;
}

interface DoubleSplitProps {
  left: BlockProps;
  right: BlockProps;
}

const SingleBlock: React.FC<BlockProps> = ({
  mediaUrl,
  mediaType,
  title,
  text,
  link,
}) => {
  return (
    <div className="relative w-full h-[40vh] sm:h-[55vh] lg:h-[75vh] xl:h-[80vh] overflow-hidden group rounded-lg md:rounded-xl">
      {/* MEDIA */}
      <div className="absolute inset-0 z-0">
        {mediaType === 'video' ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={mediaUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-300" />
      </div>

      {/* CONTENT */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-6 lg:p-10 text-cream">
        <h2 className="text-lg sm:text-2xl lg:text-5xl font-oswald font-bold uppercase mb-2 sm:mb-3 leading-tight">
          {title}
        </h2>

        <p className="max-w-lg text-xs sm:text-sm lg:text-lg mb-3 sm:mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 leading-relaxed">
          {text}
        </p>

        <a
          href={link}
          className="w-fit text-gold text-[10px] sm:text-xs lg:text-base font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
};

const DoubleSplit: React.FC<DoubleSplitProps> = ({ left, right }) => {
  return (
    <section className="w-full bg-cream py-8 sm:py-12 lg:py-20">
      {/* FLUID CONTAINER */}
      <div className="mx-auto w-full px-3 sm:px-6 md:px-10 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
          <SingleBlock {...left} />
          <SingleBlock {...right} />
        </div>
      </div>
    </section>
  );
};

export default DoubleSplit;
