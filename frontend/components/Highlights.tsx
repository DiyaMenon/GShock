import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Play } from 'lucide-react';

interface Reel {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
}

const Highlights: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

  const THEME = {
    espresso: '#3E2723',
    bronze: '#966328',
    gold: '#D99A46',
    cream: '#FFFCF2',
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/reels/active`);
      setReels(response.data || []);
    } catch (error) {
      console.error('Failed to fetch reels:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-6" style={{ backgroundColor: THEME.cream }}>
        <div className="container mx-auto text-center">
          <p style={{ color: THEME.espresso }}>Loading highlights...</p>
        </div>
      </section>
    );
  }

  if (reels.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6" style={{ backgroundColor: THEME.cream }}>
      <div className="container mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-oswald font-bold mb-4 uppercase tracking-tight" style={{ color: THEME.espresso }}>
            Highlights
          </h2>
          <p className="text-lg" style={{ color: THEME.bronze }}>
            Featuring the best moments from Rabuste
          </p>
        </div>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reels.map((reel, index) => (
            <div
              key={reel._id}
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
              onMouseEnter={() => setPlayingIndex(index)}
              onMouseLeave={() => setPlayingIndex(null)}
            >
              {/* VIDEO */}
              <video
                src={reel.videoUrl}
                controls={playingIndex === index}
                muted={playingIndex !== index}
                loop
                className="w-full h-full object-cover"
                onMouseEnter={() => playingIndex === index && (document.querySelector(`video[src="${reel.videoUrl}"]`) as HTMLVideoElement)?.play()}
              />

              {/* OVERLAY */}
              {playingIndex !== index && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <Play
                    size={48}
                    className="text-white group-hover:scale-110 transition-transform"
                    fill="currentColor"
                  />
                </div>
              )}

              {/* INFO */}
              {playingIndex !== index && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                  <h3 className="font-bold text-lg mb-1">{reel.title}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2">{reel.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
