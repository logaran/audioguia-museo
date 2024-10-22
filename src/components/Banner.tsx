import React from 'react';
interface BannerProps {
  isDarkMode: boolean
}

const Banner: React.FC<BannerProps> = ({ isDarkMode }) => {

  const logo = isDarkMode ? process.env.PUBLIC_URL + '/img/logo-dark.svg' : process.env.PUBLIC_URL + '/img/logo.svg';
  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-900 p-6 z-20">
      <img src={logo} alt="Logo del Museo" className="object-contain" />
    </div>
  );
};

export default Banner;
