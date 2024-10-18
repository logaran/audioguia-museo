import React from 'react';
import Banner from './Banner';

const Header = ({ isDarkMode }) => (
  <header className="relative z-10">
    <Banner isDarkMode={isDarkMode}/>
  </header>
);

export default Header;
