import React, { useState, useEffect } from 'react';
import AudioGuideApp from './components/AudioGuideApp';
import { ArtworksProvider } from './context/ArtworksContext';
import { AnalyticsProvider } from './context/AnaliticsContext';
import { PlaybackProvider } from './context/PlaybackContext';
import { LanguageProvider } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';


function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const trackingId = process.env.REACT_APP_GA_TRACKING_ID;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize(); // Inicializa al cargar
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);


  return (
    <div className='h-screen w-screen'>
      <AnalyticsProvider trackingId={trackingId} >
        <LanguageProvider>
          <ArtworksProvider>
            <FavoritesProvider>
              <PlaybackProvider>
                <AudioGuideApp isMobile={isMobile} isDarkMode={isDarkMode} />
              </PlaybackProvider>
            </FavoritesProvider>
          </ArtworksProvider>
        </LanguageProvider>
      </AnalyticsProvider>
    </div>
  );
}

export default App;
