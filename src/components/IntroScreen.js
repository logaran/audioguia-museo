// Componente Hijo (IntroScreen)
import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { languages } from './Languages'; // Importamos el array con idiomas y banderas

const IntroScreen = ({ onSwipe, selectedLanguage, onLanguageSelect, setIsPlaying }) => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const handleLanguageSelect = (languageCode) => {
    onLanguageSelect(languageCode); // Establece el idioma seleccionado en el padre
    setShowLanguageSelector(false); // Cierra el modal de selección de idiomas
  };

  // Encontramos el idioma seleccionado en el array de idiomas
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="h-full flex items-center justify-center bg-black text-white p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a la Audioguía del Museo Carmen Thyssen Málaga</h1>
        <p className="text-lg mb-8">Explora nuestra colección de obras de arte y escucha descripciones y comentarios mientras navegas.</p>

        {/* Texto y Icono para cambiar el idioma */}
        <div className="mb-4 flex flex-col items-center justify-center cursor-pointer" onClick={() => setShowLanguageSelector(true)}>
          <span className="text-lg mb-2">Cambiar idioma</span>
          <img src={currentLanguage.flag} alt={currentLanguage.name} className="w-10 h-10 rounded-full" />
        </div>

        {/* Modal de selección de idiomas */}
        {showLanguageSelector && (
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
            <LanguageSelector 
              setSelectedLanguage={handleLanguageSelect}
              setIsPlaying={setIsPlaying}
              onClose={() => setShowLanguageSelector(false)}
            />
          </div>
        )}

        <p className="text-lg mb-4">Desliza a la izquierda o derecha para alternar entre diferentes obras. Toca para comenzar.</p>
        <button 
          onClick={() => onSwipe('right')} 
          className="bg-white text-black px-4 py-2 rounded"
        >
          Empezar
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
