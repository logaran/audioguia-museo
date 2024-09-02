import React from 'react';
import { useEffect } from 'react';

import AudioGuideApp from './AudioGuideApp';


function App() {
  
  useEffect(() => {
    const updateAppHeight = () => {
      const height = window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${height}px`);
    };

    updateAppHeight();
    window.addEventListener('resize', updateAppHeight);

    return () => {
      window.removeEventListener('resize', updateAppHeight);
    };
  }, []);

  return (
    <div className="App app-container">
      <AudioGuideApp />
    </div>
  );
}

export default App;