// Componente LanguageSelector
import React from 'react';
import { languages } from './Languages'; // Importamos el array con idiomas y banderas

const LanguageSelector = ({ setSelectedLanguage, onClose, setIsPlaying }) => {
    setIsPlaying(false);
    return (
        <div className="w-full h-full p-2 flex flex-wrap items-center justify-center">
            {languages.map(language => (
                <div
                    key={language.code}
                    className="flex flex-col items-center m-4 cursor-pointer"
                    onClick={() => {
                        setSelectedLanguage(language.code);
                        onClose(); // Cerrar selector al seleccionar idioma
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
