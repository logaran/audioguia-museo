import React from 'react';

const Banner = ({ isDarkMode }) => {
  
  const logo = isDarkMode ? process.env.PUBLIC_URL + '/img/logo-dark.svg' : process.env.PUBLIC_URL + '/img/logo.svg';
  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-900 p-6 z-20">
      <img src={logo} alt="Logo del Museo" className="h-full object-contain" />
    </div>
  );
};

export default Banner;
