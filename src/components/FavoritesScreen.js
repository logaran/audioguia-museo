import React from 'react';
import ShareComponent from './ShareComponent';

const FavoritesScreen = ({ favoriteArtworks, onBack, selectedLanguage }) => {
  return (
    <div className="w-screen h-full flex flex-col items-center justify-start bg-white text-gray-700 px-8 py-2">
      <h1 className="text-2xl font-bold mb-4">Comparte tus obras Favoritas</h1>
      <ul className="h-full w-full max-w-2xl overflow-auto">
        {favoriteArtworks.map(artwork => (
          <li key={artwork.name[selectedLanguage]} className="mb-6 flex items-center">
            <img 
              src={artwork.imageUrl} 
              alt={artwork.name[selectedLanguage]} 
              className="w-20 h-20 object-cover rounded-md mr-4" 
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{artwork.name[selectedLanguage]}</h2>
              <ShareComponent
                url={artwork.imageUrl}
                title={`He estado en el Museo Carmen Thyssen Málaga y me ha encantado esta obra`} 
                />
            </div>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onBack()} 
        className="mt-6 mb-4 bg-gray-200 text-black px-4 py-2 rounded"
      >
        Volver a la Audioguía
      </button>
    </div>
  );
};

export default FavoritesScreen;
