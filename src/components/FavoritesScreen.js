import React from 'react';
import ShareComponent from './ShareComponent';
import { useArtworks } from '../context/ArtworksContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const FavoritesScreen = () => {
  const {favorites} = useArtworks();
  const {selectedLanguage} = useLanguage();
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/guide')
  };
  
  return (
    <div className="w-screen h-full flex flex-col items-center justify-start bg-white text-gray-700 dark:bg-gray-900 dark:text-white px-8 py-2">
      <h1 className="text-2xl font-bold mb-4">{selectedLanguage === 'es' ? 'Comparte tus obras favoritas' : 'Share your favourite artworks'}</h1>
      <ul className="h-full w-full max-w-2xl overflow-auto">
        {Object.entries(favorites).map(([name, info]) => (
          <li key={name[selectedLanguage]} className="mb-6 flex items-center">
            <img
              src={`${process.env.PUBLIC_URL}/img/${info.id}${selectedLanguage}.jpg`}
              onError={(e) => {
                e.target.src = `${process.env.PUBLIC_URL}/img/${info.id}.jpg`;
                e.target.onerror = () => {
                  e.target.src = `${process.env.PUBLIC_URL}/img/placeholder.jpg`;
                };
              }}
              alt={name[selectedLanguage]}
              className="w-14 h-14 object-contain rounded-md mr-4"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{name[selectedLanguage]}</h2>
              <ShareComponent
                url={`${process.env.PUBLIC_URL}/img/${info.id}${selectedLanguage}.jpg`}
                onError={(e) => {
                  e.target.src = `${process.env.PUBLIC_URL}/img/${info.id}.jpg`;
                  e.target.onerror = () => {
                    e.target.src = `${process.env.PUBLIC_URL}/img/placeholder.jpg`;
                  };
                }}
                title={`He estado en el Museo Carmen Thyssen Málaga y me ha encantado esta obra`}
              />
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => goBack()}
        className="bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 w-48 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300"
      >
        {selectedLanguage === 'es' ? 'Volver a la Audioguía' : 'Return to audioguide'}
      </button>
    </div>
  );
};

export default FavoritesScreen;
