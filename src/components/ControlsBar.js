import React from 'react';
import { Heart } from 'lucide-react';
import { languages } from './Languages';
import { useLanguage } from '../context/LanguageContext';
import { useArtworks } from '../context/ArtworksContext';
import { useNavigate } from 'react-router-dom';
import { usePlayback } from '../context/PlaybackContext';
import { useFavorites } from '../context/FavoritesContext';

const ControlsBar = () => {

  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const { currentArtwork } = useArtworks();
  const { setIsPlaying } = usePlayback();
  const navigate = useNavigate();
  const { cookies, toggleLike } = useFavorites();

  const switchLang = () => {
    const newLang = selectedLanguage === 'es' ? 'en' : 'es';
    setIsPlaying(false);
    setSelectedLanguage(newLang);
  };

  return (
    <div className="h-16 w-full flex items-center justify-between bg-white dark:bg-gray-800 bg-opacity-80 p-6 z-50">
      <div className="cursor-pointer" onClick={switchLang}>
        <img src={languages[selectedLanguage].flag()} alt={languages[selectedLanguage].name} className="w-8 h-8 rounded-full" />
      </div>
      <button
        onClick={() => {
          navigate('/list');
          setIsPlaying(false)
        }}
        className="bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 w-24 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300"
      >
        AUDIOS
      </button>
      <button onClick={toggleLike} className="text-3xl ml-4">
        <Heart fill={cookies?.likes?.includes(currentArtwork.id) ? 'red' : 'none'} color="gray" size={32} />
      </button>
    </div>
  );
};

export default ControlsBar;
