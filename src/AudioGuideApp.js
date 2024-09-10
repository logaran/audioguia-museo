import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useCookies } from 'react-cookie';
import IntroScreen from './components/IntroScreen';
import FavoritesScreen from './components/FavoritesScreen';
import Header from './components/Header';
import ControlsBar from './components/ControlsBar';
import ArtworkInfo from './components/ArtworkInfo';
import ArtworksList from './components/ArtworksList';


const AudioGuideApp = ({ isMobile }) => {
  const [artworks, setArtworks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cookies, setCookie] = useCookies(['likes']);
  const mediaRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwipe = useRef(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [showArtworksList, setShowArtworksList] = useState(false);
  const [expositionData, setExpositionData] = useState(null);


  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch('/guides/modernidad.json');
        if (!response.ok) {
          throw new Error('Error al cargar el JSON');
        }
        const data = await response.json();
        setArtworks(data.artworks);
        setExpositionData(data.exposition);
      } catch (error) {
        console.error('Error fetching artworks data:', error);
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

  const handleLangSelect = (language) => {
    if (isPlaying) setIsPlaying(false);
    setSelectedLanguage(language);
  };

  const handleShowArtworksList = (show) => {
    if (show) {
      setIsPlaying(false);
      setShowArtworksList(true);
    } else {
      setIsPlaying(true);
      setShowArtworksList(false);
    }
  }

  const toggleShowIntro = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
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
  const activeResourceUrl = currentArtwork['audioUrl'][selectedLanguage];

  const goBackToGallery = () => {
    setCurrentIndex(0);
    setShowFavorites(false); // Oculta la pantalla de favoritos y vuelve a la audioguía
    setIsPlaying(false); // Opcional: puede empezar a reproducir el audio al volver a la galería
  };

  return (
    <div className="relative h-screen w-full text-black flex flex-col">



      <div
        className="absolute h-100 inset-0 bg-cover bg-center filter blur-md -z-10"
        style={{
          backgroundImage: `url(${currentArtwork.imageUrl[selectedLanguage]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8, // Ajusta la opacidad aquí
        }}
      />


      {/* Cabecera con logo del Museo */}
      <Header />
      {/* Intro */}
      {showIntro && (
        <IntroScreen toggleShowIntro={toggleShowIntro} langSelect={handleLangSelect} selectedLanguage={selectedLanguage} setShowArtworksList={setShowArtworksList} expositionData={expositionData}/>
      )}
      {/* Favoritos (Outro) */}
      {showFavorites && !showIntro && (
        <FavoritesScreen favoriteArtworks={favoriteArtworks} onBack={goBackToGallery} selectedLanguage={selectedLanguage} />
      )}
      {/* Listado de obras */}
      {showArtworksList && (
        <ArtworksList artworks={artworks} setIndex={setCurrentIndex} showList={handleShowArtworksList} selectedLanguage={selectedLanguage} />
      )}


      {/* Player */}
      {!showIntro && !showFavorites &&
        (
          <div className="relative h-full flex flex-col justify-between">
            <div className="relative h-full flex flex-col sm:flex-row sm:justify-evenly items-center justify-evenly w-auto pt-3">
              <ArtworkInfo artwok={currentArtwork} selectedLanguage={selectedLanguage} />

              {/* Controles de reproducción y pase de obras*/}
              <>
                {/*Play*/}
                <div
                  className={`absolute inset-0 flex h-full flex-col justify-between p-4 z-30 transition duration-300 ${isPlaying ? 'pointer-events-auto' : 'bg-black bg-opacity-60 pointer-events-auto'
                    }`}
                  onTouchStart={isMobile ? handleTouchStart : null}
                  onTouchMove={isMobile ? handleTouchMove : null}
                  onTouchEnd={isMobile ? handleTouchEnd : null}
                  onClick={!isMobile ? togglePlayPause : null}
                >

                  {!isPlaying && (
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl z-30">
                      <Play color="white" size={64} />
                    </div>
                  )}
                </div>

                {/*Flechas*/}
                {currentIndex !== 0 && (
                  <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl z-30"
                    onClick={() => handleSwipe('right')}
                  >
                    <ChevronLeft size={48} />
                  </button>
                )}
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl z-30"
                  onClick={() => handleSwipe('left')}
                >
                  <ChevronRight size={48} />
                </button>
              </>

              <img
                src={currentArtwork.imageUrl[selectedLanguage]}
                alt={currentArtwork.name}
                className="transition-transform h-[50vh] duration-300 object-contain"
                style={{ transform: `translateX(${swipeOffset}px)` }}
              />


            </div>

            <audio
              ref={mediaRef}
              src={activeResourceUrl}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Barra de control. Visible en el pase de imagenes */}
            {!showFavorites && !showIntro && !showArtworksList && <ControlsBar currentArtwork={currentArtwork} toggleLike={toggleLike} langSelect={handleLangSelect} selectedLanguage={selectedLanguage} cookies={cookies} handleShowArtworks={handleShowArtworksList} />}



          </div>
        )}
      {/* Advertencia en modo escritorio 
      {!isMobile && (
        <div className='absolute inset-0 h-full w-full flex items-center justify-center text-4xl text-white bg-black bg-opacity-60 z-20'>
          <span className='p-10 text-center'>{selectedLanguage==='es' ? 'Esta aplicación funciona mejor en modo vertical.' : 'This application works better in portraid mode'}</span>
        </div>

      )}
        */}

    </div>
  );
};

export default AudioGuideApp;
