import React from 'react';
import { Share2, ShoppingCart, ExternalLink } from 'lucide-react';

const FavoritesScreen = ({ favoriteArtworks, onSwipe }) => {
  return (
    <div className="w-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Obras Favoritas</h1>
      <ul className="h-full w-full max-w-2xl">
        {favoriteArtworks.map(artwork => (
          <li key={artwork.name} className="mb-6 flex items-center">
            <img 
              src={artwork.imageUrl} 
              alt={artwork.name} 
              className="w-20 h-20 object-cover rounded-md mr-4" 
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{artwork.name}</h2>
              <div className="flex items-center mt-2 space-x-4">
                <button className="text-white">
                  <Share2 size={24} />
                </button>
                <button className="text-white">
                  <ShoppingCart size={24} />
                </button>
                <a 
                  href={artwork.pageUrl} 
                  className="text-white" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={24} />
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSwipe('right')} 
        className="mt-8 bg-white text-black px-4 py-2 rounded"
      >
        Volver a la Audioguía
      </button>
    </div>
  );
};

export default FavoritesScreen;
