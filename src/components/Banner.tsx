import React from 'react';
interface BannerProps {
  isDarkMode: boolean
}

const Banner: React.FC<BannerProps> = ({ isDarkMode }) => {
  const apiUrl = 'http://127.0.0.1:3030/api/data/';
  const logo = isDarkMode ? apiUrl + '/logo.svg' : apiUrl + '/logo.svg';
  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-900 p-6 z-20">
      <img src={logo} alt="Logo del Museo" className="object-contain" />
    </div>
  );
};

export default Banner;
