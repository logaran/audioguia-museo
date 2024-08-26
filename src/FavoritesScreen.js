import React from 'react';

const FavoritesScreen = ({ favoriteArtworks, onSwipe }) => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Obras Favoritas</h1>
      <ul className="list-disc list-inside mb-8">
        {favoriteArtworks.map(artwork => (
          <li key={artwork.name} className="mb-4">
            <h2 className="text-xl font-semibold">{artwork.name}</h2>
            <p>{artwork.description}</p>
            <div className="mt-2">
              <a href="#" className="text-blue-400 underline">Más información</a>
            </div>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSwipe('right')} 
        className="bg-white text-black px-4 py-2 rounded"
      >
        Volver a la Galería
      </button>
    </div>
  );
};

export default FavoritesScreen;
