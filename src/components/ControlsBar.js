import React from 'react';
import { Heart } from 'lucide-react';
import { languages } from './Languages';

const ControlsBar = ({ currentArtwork, toggleLike, langSelect, selectedLanguage, cookies, handleShowArtworks }) => {
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  // Cambia el idioma a través de la función langSelect
  const switchLang = () => {
    const newLang = selectedLanguage === 'es' ? 'en' : 'es';
    langSelect(newLang); // Llama a la función para cambiar el idioma
  };

  return (
    <div className="h-16 w-full flex items-center justify-between bg-white dark:bg-gray-800 bg-opacity-80 p-6 z-50">
      <div className="cursor-pointer" onClick={switchLang}>
        <img src={currentLanguage.flag} alt={currentLanguage.name} className="w-8 h-8 rounded-full" />
      </div>
      <button
        onClick={() => handleShowArtworks(true)}
        className="bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 w-24 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300"
      >
        AUDIOS
      </button>
      <button onClick={toggleLike} className="text-3xl ml-4">
        <Heart fill={cookies.likes?.[currentArtwork.name.es] ? 'red' : 'none'} color="gray" size={32} />
      </button>
    </div>
  );
};

export default ControlsBar;
