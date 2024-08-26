import React, { useState, useEffect, useRef } from 'react';
import { Heart, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useCookies } from 'react-cookie';
import IntroScreen from './IntroScreen';
import FavoritesScreen from './FavoritesScreen';
import Banner from './Banner'; // Asegúrate de importar el banner

const AudioGuideApp = () => {
  const [artworks, setArtworks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cookies, setCookie] = useCookies(['likes']);
  const audioRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwipe = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);

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
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const currentArtwork = artworks[currentIndex];
    const newLikes = { ...cookies.likes };
    if (newLikes[currentArtwork.name]) {
      delete newLikes[currentArtwork.name];
    } else {
      newLikes[currentArtwork.name] = true;
    }
    setCookie('likes', newLikes, { path: '/' });
  };


  if (artworks.length === 0) return <div>Cargando...</div>;

  const currentArtwork = artworks[currentIndex];
  const favoriteArtworks = artworks.filter(artwork => cookies.likes?.[artwork.name]);

  return (
    <div className="relative h-screen w-screen bg-white text-black flex flex-col">
      <Banner />
      <div className="relative flex-grow overflow-auto">
        {showIntro && <IntroScreen onSwipe={handleSwipe} />}
        {showFavorites && !showIntro && (
          <FavoritesScreen favoriteArtworks={favoriteArtworks} onSwipe={handleSwipe} />
        )}
        {!showIntro && !showFavorites && (
          <>
            <div
              className="absolute inset-0 flex items-center justify-center"

            >
              <img
                src={currentArtwork.imageUrl}
                alt={currentArtwork.name}
                className="h-full w-full object-contain transition-transform duration-300"
                style={{ transform: `translateX(${swipeOffset}px)` }}
              />
            </div>

            <div
              className={`absolute inset-0 flex flex-col justify-between p-4 transition duration-300 ${isPlaying ? 'pointer-events-auto' : 'bg-black bg-opacity-60 pointer-events-auto'
                }`}
              onTouchStart={isMobile ? handleTouchStart : null}
              onTouchMove={isMobile ? handleTouchMove : null}
              onTouchEnd={isMobile ? handleTouchEnd : null}
              onClick={!isMobile ? togglePlayPause : null}
            >
              <div style={{ pointerEvents: 'none' }}>
                <h2 className="text-2xl font-bold">{currentArtwork.name}</h2>
                <p className="text-sm">{currentArtwork.description}</p>
              </div>

              {!isPlaying && (
                <div className="flex items-center justify-center h-full">
                  <Play color="white" size={64} />
                </div>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-16 flex items-center justify-end bg-black bg-opacity-70 z-20 p-6">

              <button onClick={toggleLike} className="text-3xl ml-4">
                <Heart
                  fill={cookies.likes?.[currentArtwork.name] ? 'red' : 'none'}
                  color="white"
                  size={32}
                />
              </button>

            </div>

            <audio
              ref={audioRef}
              src={currentArtwork.audioUrl}
              onEnded={() => setIsPlaying(false)}
            />
            {!isMobile && (
              <>
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20"
                  onClick={() => handleSwipe('right')}
                >
                  <ChevronLeft size={48} />
                </button>
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20"
                  onClick={() => handleSwipe('left')}
                >
                  <ChevronRight size={48} />
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AudioGuideApp;
