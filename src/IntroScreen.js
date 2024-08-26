import React from 'react';

const IntroScreen = ({ onSwipe }) => {
  return (
    <div className="h-full flex items-center justify-center bg-black text-white p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a la Audioguía del Museo Carmen Thyssen Málaga</h1>
        <p className="text-lg mb-8">Explora nuestra colección de obras de arte y escucha descripciones y comentarios mientras navegas.</p>
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
