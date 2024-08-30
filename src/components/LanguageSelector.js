
import React, { useEffect } from 'react';
import { languages } from './Languages';

const LanguageSelector = ({ handleLangSelect, handlePlaying, artworks, currentIndex, selectedResource }) => {
    useEffect(() => {
        handlePlaying(false); // Pause playback on component mount
    }, [handlePlaying]); // Depend on handlePlaying to ensure the effect is properly triggered

    const currentArtwork = artworks[currentIndex];
    
    // Obtén las claves del recurso seleccionado
    const currentLanguages = Object.keys(currentArtwork[selectedResource]);

    // Filtra los idiomas disponibles
    const filteredLanguages = languages.filter(language => currentLanguages.includes(language.code));
    return (
        <div className="w-full h-full p-2 flex flex-wrap items-center justify-center">
            {filteredLanguages.map(language => (
                <div
                    key={language.code}
                    className="flex flex-col items-center m-4 cursor-pointer"
                    onClick={() => {
                        handleLangSelect(language.code);
                    }}
                >
                    <img src={language.flag} alt={language.name} className="flex flex-col w-16 h-16 rounded-full mb-2" />
                    <span className="text-lg text-gray-600">{language.name}</span>
                </div>
            ))}
        </div>
    );
};

export default LanguageSelector;
