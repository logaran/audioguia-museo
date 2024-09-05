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
    <div className="h-16 w-full flex items-center justify-between bg-black bg-opacity-70 z-40 p-6">
      <div className="cursor-pointer" onClick={switchLang}>
        <img src={currentLanguage.flag} alt={currentLanguage.name} className="w-8 h-8 rounded-full" />
      </div>
      <button
        onClick={() => handleShowArtworks(true)}
        className="bg-white text-black px-4 py-2 rounded"
      >
        AUDIOS
      </button>
      <button onClick={toggleLike} className="text-3xl ml-4">
        <Heart fill={cookies.likes?.[currentArtwork.name.es] ? 'red' : 'none'} color="white" size={32} />
      </button>
    </div>
  );
};

export default ControlsBar;
