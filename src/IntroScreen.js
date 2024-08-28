// Componente Hijo (IntroScreen)
import React from 'react';

const IntroScreen = ({ onSwipe, selectedLanguage, onLanguageSelect }) => {

  const handleLanguageChange = (event) => {
    onLanguageSelect(event.target.value);
  };

  return (
    <div className="h-full flex items-center justify-center bg-black text-white p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a la Audioguía del Museo Carmen Thyssen Málaga</h1>
        <p className="text-lg mb-8">Explora nuestra colección de obras de arte y escucha descripciones y comentarios mientras navegas.</p>
        <div className="mb-4">
          <label className="block text-lg mb-2">Selecciona tu idioma:</label>
          <select 
            value={selectedLanguage} 
            onChange={handleLanguageChange} 
            className="text-black px-4 py-2 rounded"
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="eus">Euskera</option>
            <option value="fr">Francés</option>
            <option value="ge">Alemán</option>
            <option value="it">Italiano</option>
            <option value="nl">Neerlandés</option>
            <option value="da">Danés</option>
            <option value="ru">Ruso</option>
            <option value="jp">Japonés</option>
          </select>
        </div>
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
