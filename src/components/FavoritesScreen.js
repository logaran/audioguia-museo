import React from 'react';
import ShareComponent from './ShareComponent';

const FavoritesScreen = ({ favoriteArtworks, onBack, selectedLanguage }) => {
  return (
    <div className="w-screen h-full flex flex-col items-center justify-start bg-white text-gray-700 px-8 py-2">
      <h1 className="text-2xl font-bold mb-4">{selectedLanguage === 'es' ? 'Comparte tus obras favoritas' : 'Share your favourite artworks'}</h1>
      <ul className="h-full w-full max-w-2xl overflow-auto">
        {favoriteArtworks.map(artwork => (
          <li key={artwork.name[selectedLanguage]} className="mb-6 flex items-center">
            <img 
              src={artwork.imageUrl[selectedLanguage]} 
              alt={artwork.name[selectedLanguage]} 
              className="w-14 h-14 object-cover rounded-md mr-4" 
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{artwork.name[selectedLanguage]}</h2>
              <ShareComponent
                url={artwork.imageUrl[selectedLanguage]}
                title={`He estado en el Museo Carmen Thyssen Málaga y me ha encantado esta obra`} 
                />
            </div>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onBack()} 
        className="mt-6 mb-4 bg-gray-200 text-black px-4 py-2 rounded z-30"
      >
        {selectedLanguage === 'es' ? 'Volver a la Audioguía' : 'Return to audioguide'}
      </button>
    </div>
  );
};

export default FavoritesScreen;
