import React, { useState, useEffect } from 'react';
import AudioGuideApp from './AudioGuideApp';
import { ArtworksProvider } from './context/ArtworksContext';
import { PlaybackProvider } from './context/PlaybackContext';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize(); // Inicializa al cargar
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='h-screen w-screen'>
      <ArtworksProvider>
        <PlaybackProvider>
          <AudioGuideApp isMobile={isMobile} />
        </PlaybackProvider>
      </ArtworksProvider>
    </div>
  );
}

export default App;
