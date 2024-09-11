import React from 'react';
import appData from '../appData';

const Banner = () => {
  const logo = appData.museumLogo;
  return (
    <div className="flex items-center justify-center bg-white p-6 z-20">
      <img src={logo} alt="Logo del Museo" className="h-full object-contain" />
    </div>
  );
};

export default Banner;
