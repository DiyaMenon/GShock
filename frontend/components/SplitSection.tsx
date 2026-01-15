import React from 'react';

interface SplitSectionProps {
  alignment: 'left' | 'right' | 'center';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  title: string;
  svgTitle?: string;
  text: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor?: string;
  theme?: 'light' | 'dark';
}

const SplitSection: React.FC<SplitSectionProps> = ({
  alignment,
  mediaUrl,
  mediaType,
  title,
  svgTitle,
  text,
  ctaText,
  ctaLink,
  backgroundColor = 'bg-cream',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-cream' : 'text-[#3E2723]';
  const bgColor = isDark ? 'bg-[#3E2723]' : backgroundColor;

  const MediaComponent = () => (
    <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[85vh] overflow-hidden group rounded-xl md:rounded-2xl md:rounded-3xl">
      {mediaType === 'video' ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        >
          <source src={mediaUrl} type="video/mp4" />
        </video>
      ) : (
        <img
          src={mediaUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
    </div>
  );

  const ContentComponent = () => (
    <div className={`flex flex-col justify-center ${textColor}`}>
      {svgTitle ? (
        <img src={svgTitle} alt={title} className="w-full max-w-xs sm:max-w-md mb-6 sm:mb-8" />
      ) : (
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-oswald font-bold uppercase mb-4 sm:mb-6 leading-tight">
          {title}
        </h2>
      )}

      <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl opacity-90">
        {text}
      </p>

      <a
        href={ctaLink}
        className={`inline-block w-fit border-2 px-6 sm:px-8 py-2 sm:py-3 font-bold uppercase tracking-widest text-xs sm:text-sm transition-colors duration-300 ${
          isDark
            ? 'border-cream text-cream hover:bg-cream hover:text-[#3E2723]'
            : 'border-[#3E2723] text-[#3E2723] hover:bg-[#3E2723] hover:text-cream'
        }`}
      >
        {ctaText}
      </a>
    </div>
  );

  return (
    <section className={`w-full ${bgColor} pt-6 pb-6 md:pt-10 md:pb-10`}>
      {/* FLUID CONTAINER — SAME AS DoubleSplit */}
      <div className="mx-auto w-full px-3 sm:px-6 md:px-10 xl:px-16 2xl:px-24">
        <div className="flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 md:gap-12">
          {/* MEDIA */}
          <div
            className={`w-full md:w-1/2 ${
              alignment === 'right' ? 'md:order-2' : ''
            }`}
          >
            <MediaComponent />
          </div>

          {/* CONTENT */}
          <div
            className={`w-full md:w-1/2 flex ${
              alignment === 'right' ? 'md:order-1' : ''
            }`}
          >
            <ContentComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitSection;
