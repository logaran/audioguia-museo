import React from 'react';
import Banner from './Banner';

interface HeaderProps {
  isDarkMode: boolean
}

const Header: React.FC<HeaderProps> = ({ isDarkMode }) => (
  <header className="relative z-10">
    <Banner isDarkMode={isDarkMode} />
  </header>
);

export default Header;
