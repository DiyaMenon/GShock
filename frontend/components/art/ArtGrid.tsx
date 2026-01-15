import React from 'react';
import { Artwork } from './types';
import ArtCard from './ArtCard';

interface ArtGridProps {
  artworks: Artwork[];
}

const ArtGrid: React.FC<ArtGridProps> = ({ artworks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 md:gap-y-16 lg:gap-y-20 bg-cream">
      {artworks.map((art) => (
        <ArtCard key={art.id} artwork={art} />
      ))}
    </div>
  );
};

export default ArtGrid;
