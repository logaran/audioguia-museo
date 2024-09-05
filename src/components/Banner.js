import React from 'react';
import logoMuseo from '../logo-museo.svg'; // Ajusta la ruta si es necesario

const Banner = () => {
  return (
    <div className="flex items-center justify-center bg-white p-6 z-20">
      <img src={logoMuseo} alt="Logo del Museo" className="h-full object-contain" />
    </div>
  );
};

export default Banner;
