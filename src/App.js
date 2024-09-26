import React, { useState, useEffect } from 'react';
import AudioGuideApp from './components/AudioGuideApp';
import { ArtworksProvider } from './context/ArtworksContext';
import { AnalyticsProvider } from './context/AnaliticsContext';
import { PlaybackProvider } from './context/PlaybackContext';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const trackingId = process.env.REACT_APP_GA_TRACKING_ID;

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
      <AnalyticsProvider trackingId={trackingId} >
        <PlaybackProvider>
          <ArtworksProvider>
            <AudioGuideApp isMobile={isMobile} />
          </ArtworksProvider>
        </PlaybackProvider>
      </AnalyticsProvider>
    </div>
  );
}

export default App;
