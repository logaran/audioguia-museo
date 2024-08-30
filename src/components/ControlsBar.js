import React from 'react';
import { Heart } from 'lucide-react';
import { languages } from './Languages';

const ControlsBar = ({ currentArtwork, toggleLike, toggleShowLangSelector, selectedLanguage, cookies }) => {
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="absolute inset-x-0 bottom-0 h-16 flex items-center justify-between bg-black bg-opacity-70 z-20 p-6">
      <div className="cursor-pointer" onClick={() => toggleShowLangSelector()}>
        <img src={currentLanguage.flag} alt={currentLanguage.name} className="w-8 h-8 rounded-full" />
      </div>
      <button onClick={toggleLike} className="text-3xl ml-4">
        <Heart fill={cookies.likes?.[currentArtwork.name.es] ? 'red' : 'none'} color="white" size={32} />
      </button>
    </div>
  );
};

export default ControlsBar;
