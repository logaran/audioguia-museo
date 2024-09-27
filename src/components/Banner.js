import React from 'react';
import appData from '../config/appData';

const Banner = () => {
  const logo = appData.museumLogo;
  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-900 p-6 z-20">
      <img src={logo} alt="Logo del Museo" className="h-full object-contain" />
    </div>
  );
};

export default Banner;
