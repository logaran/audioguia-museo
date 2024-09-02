import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useCookies } from 'react-cookie';
import IntroScreen from './components/IntroScreen';
import FavoritesScreen from './components/FavoritesScreen';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import ControlsBar from './components/ControlsBar';


const AudioGuideApp = () => {
  const [artworks, setArtworks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cookies, setCookie] = useCookies(['likes']);
  const mediaRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwipe = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedResource, setSelectedResource] = useState('audioUrl');

  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    appHeight();
    window.addEventListener('resize', appHeight);

    return () => {
      window.removeEventListener('resize', appHeight);
    };
  }, []);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch('/artworks.json');
        if (!response.ok) {
          throw new Error('Error al cargar el JSON');
        }
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error('Error fetching artworks from JSON:', error);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);
  
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setSwipeOffset(0);
    isSwipe.current = false;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    const offset = touchEndX.current - touchStartX.current;
    setSwipeOffset(offset);
    if (Math.abs(offset) > 10) {
      isSwipe.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (isSwipe.current) {
      if (touchStartX.current - touchEndX.current > 50) {
        handleSwipe('left');
      } else if (touchEndX.current - touchStartX.current > 50) {
        handleSwipe('right');
      }
    } else {
      togglePlayPause();
    }
    setSwipeOffset(0);
  };

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (showIntro) {
        setShowIntro(false);
      } else if (showFavorites) {
        setShowFavorites(false);
      }
    } else if (direction === 'left') {
      if (currentIndex < artworks.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (!showFavorites) {
        setShowFavorites(true);
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handlePlaying = (state) => {
    setIsPlaying(state);
  };

  const handleLangSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
  };

  const toggleShowLangSelector = () => {
    setShowLanguageSelector(!showLanguageSelector)
  };

  const toggleShowIntro = () => {
    setIsPlaying(false);
    setCurrentIndex(2);
    setShowIntro(!showIntro);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const currentArtwork = artworks[currentIndex];
    const newLikes = { ...cookies.likes };
    if (newLikes[currentArtwork.name.es]) {
      delete newLikes[currentArtwork.name.es];
    } else {
      newLikes[currentArtwork.name.es] = true;
    }
    setCookie('likes', newLikes, { path: '/' });
  };


  if (artworks.length === 0) return <div>Cargando...</div>;

  const currentArtwork = artworks[currentIndex];
  const favoriteArtworks = artworks.filter(artwork => cookies.likes?.[artwork.name.es]);
  const activeResourceUrl = currentArtwork[selectedResource][selectedLanguage]
    ? currentArtwork[selectedResource][selectedLanguage]
    : currentArtwork[selectedResource]['es'];

   const goBackToGallery = () => {
    setCurrentIndex(0);
    setShowFavorites(false); // Oculta la pantalla de favoritos y vuelve a la audioguía
    setIsPlaying(false); // Opcional: puede empezar a reproducir el audio al volver a la galería
  };

  return (
    <div className="relative h-screen w-screen bg-white text-black flex flex-col">
      {/* Modal selector idioma */}
      {showLanguageSelector && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
          <LanguageSelector
            handleLangSelect={handleLangSelect}
            handlePlaying={handlePlaying}
            artworks={artworks}
            currentIndex={currentIndex}
            selectedResource={selectedResource} />
        </div>
      )}

      <Header />
      {/* Fondo desaturado y con blur en modo móvil */}
      {isMobile && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-md"
          style={{
            backgroundImage: `url(${currentArtwork.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.6, // Ajusta la opacidad aquí
          }}
        />
      )}

      {!isMobile && (
        <div className='absolute inset-0 h-full w-full flex items-center justify-center text-4xl text-white bg-black bg-opacity-80 z-50'>
          <span className='p-10 text-center'>Esta aplicación funciona mejor en dispositivo movil en modo retrato.</span>
        </div>

      )}
      <div className="relative flex-grow overflow-auto">
        {showIntro && (
          <IntroScreen toggleShowIntro={toggleShowIntro} selectedLanguage={selectedLanguage} toggleShowLangSelector={toggleShowLangSelector} handlePlaying={handlePlaying} setSelectedResource={setSelectedResource} selectedResource={selectedResource} />
        )}
        {showFavorites && !showIntro && (
          <FavoritesScreen favoriteArtworks={favoriteArtworks} onBack={goBackToGallery} selectedLanguage={selectedLanguage} />
        )}

        {/* Pase de obras */}
        {!showIntro && !showFavorites && (
          <>
            {selectedResource !== 'signLanguageUrl' &&
              <div
                className="flex h-full items-center justify-center"

              >
                <img
                  src={currentArtwork.imageUrl}
                  alt={currentArtwork.name}
                  className={`object-contain transition-transform duration-300 ${!isMobile ? 'max-h-[60vh] max-w-[60vw]' : 'h-96 w-full object-cover'}`}
                  style={{ transform: `translateX(${swipeOffset}px)` }}
                />
              </div>
            }

            <div
              className={`absolute inset-0 flex flex-col justify-between p-4 z-20 transition duration-300 ${isPlaying ? 'pointer-events-auto' : 'bg-black bg-opacity-60 pointer-events-auto'
                }`}
              onTouchStart={isMobile ? handleTouchStart : null}
              onTouchMove={isMobile ? handleTouchMove : null}
              onTouchEnd={isMobile ? handleTouchEnd : null}
              onClick={!isMobile ? togglePlayPause : null}
            >
              <div style={{ pointerEvents: 'none' }}>
                <h2 className="text-2xl text-gray-700 font-bold">{currentArtwork.name[selectedLanguage]}</h2>
                <p className="text-sm">{currentArtwork.description}</p>
              </div>

              {!isPlaying && (
                <div className="flex items-center justify-center h-full">
                  <Play color="white" size={64} />
                </div>
              )}
            </div>

            <ControlsBar
              currentArtwork={currentArtwork}
              toggleLike={toggleLike}
              toggleShowLangSelector={toggleShowLangSelector}
              selectedLanguage={selectedLanguage}
              cookies={cookies}
              toggleShowIntro={toggleShowIntro}
            />

            {selectedResource === 'signLanguageUrl'
              ?
              <div className="flex items-center justify-center h-full">
                <video
                  preload
                  ref={mediaRef}
                  src={activeResourceUrl}
                  onEnded={()=>setIsPlaying(false)}
                  className={`object-contain transition-transform duration-300 ${!isMobile ? 'max-h-[60vh] max-w-[60vw]' : 'h-96 w-full object-cover'}`}
                  style={{ transform: `translateX(${swipeOffset}px)`}}
                />
              </div>
              :
              <audio
                ref={mediaRef}
                src={activeResourceUrl}
                onEnded={() => setIsPlaying(false)}
              />}

            <>
              {currentIndex !== 0 && (
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl z-40"
                  onClick={() => handleSwipe('right')}
                >
                  <ChevronLeft size={48} />
                </button>
              )}
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl z-40"
                onClick={() => handleSwipe('left')}
              >
                <ChevronRight size={48} />
              </button>
            </>

          </>
        )}
      </div>
    </div>
  );
};

export default AudioGuideApp;
