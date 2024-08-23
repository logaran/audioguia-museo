import React, { useState, useEffect, useRef } from 'react';
import { Heart, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useCookies } from 'react-cookie';

const AudioGuideApp = () => {
  const [artworks, setArtworks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cookies, setCookie] = useCookies(['likes']);
  const audioRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwipe = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1); // Estado para el nivel de zoom

  useEffect(() => {
    const fetchArtworks = async () => {
      const localData = localStorage.getItem('artworks');

      if (localData) {
        setArtworks(JSON.parse(localData));
      } else {
        try {
          const response = await fetch('http://localhost:3001/api/artworks');
          const data = await response.json();
          setArtworks(data);
          localStorage.setItem('artworks', JSON.stringify(data));
        } catch (error) {
          console.error('Error fetching artworks:', error);
        }
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    const savedZoomLevel = sessionStorage.getItem('zoomLevel'); // Recuperar nivel de zoom guardado
    if (savedZoomLevel) {
      setZoomLevel(parseFloat(savedZoomLevel)); // Establecer el nivel de zoom
    }

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
    if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'left' && currentIndex < artworks.length - 1) {
      setCurrentIndex(currentIndex + 1);
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

  const zoomIn = () => {
    const newZoomLevel = Math.min(3, zoomLevel + 0.1); // Aumentar el nivel de zoom
    setZoomLevel(newZoomLevel);
    sessionStorage.setItem('zoomLevel', newZoomLevel);
  };

  const zoomOut = () => {
    const newZoomLevel = Math.max(1, zoomLevel - 0.1); // Disminuir el nivel de zoom
    setZoomLevel(newZoomLevel);
    sessionStorage.setItem('zoomLevel', newZoomLevel);
  };

  if (artworks.length === 0) return <div>Cargando...</div>;

  const currentArtwork = artworks[currentIndex];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }} // Aplica el zoom a la imagen
      >
        <img
          src={currentArtwork.imageUrl}
          alt={currentArtwork.name}
          className="h-full w-full object-contain transition-transform duration-300"
          style={{ transform: `translateX(${swipeOffset}px)` }}
        />
      </div>

      {/* Control Div */}
      <div
        className={`absolute inset-0 flex flex-col justify-between p-4 transition duration-300 ${
          isPlaying ? 'pointer-events-auto' : 'bg-black bg-opacity-60 pointer-events-auto'
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

      {/* Barra inferior con controles */}
      <div className="absolute inset-x-0 bottom-0 h-16 flex items-center justify-between bg-black bg-opacity-70 z-20 p-6">
        <div className="flex items-center">
          <button onClick={zoomOut} className="text-3xl mr-4 text-white">-</button>
          <button onClick={zoomIn} className="text-3xl text-white">+</button>
        </div>
        <div className="flex items-center">
          <button onClick={toggleLike} className="text-3xl ml-4">
            <Heart
              fill={cookies.likes?.[currentArtwork.name] ? 'red' : 'none'}
              color="white"
              size={32}
            />
          </button>
          {/* Aquí se pueden agregar más iconos */}
        </div>
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
    </div>
  );
};

export default AudioGuideApp;
