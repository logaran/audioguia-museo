import React, { useState, useEffect } from 'react';
import AudioGuideApp from './components/AudioGuideApp';
import { ArtworksProvider } from './context/ArtworksContext';
import { AnalyticsProvider } from './context/AnaliticsContext';

const trackingId = process.env.REACT_APP_GA_TRACKING_ID;

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
      <AnalyticsProvider trackingId={trackingId} >
        <ArtworksProvider>
          <AudioGuideApp isMobile={isMobile} />
        </ArtworksProvider>
      </AnalyticsProvider>
    </div>
  );
}

export default App;
