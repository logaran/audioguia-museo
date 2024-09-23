import React, { useState, useEffect } from 'react';
import AudioGuideApp from './AudioGuideApp';
import { ArtworksProvider } from './context/ArtworksContext';
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
        <AudioGuideApp isMobile={isMobile} />
      </ArtworksProvider>
    </div>
  );
}

export default App;
