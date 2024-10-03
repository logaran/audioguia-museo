import React, { useState, useEffect, useRef, useContext } from 'react';
import { useCookies } from 'react-cookie';
import IntroScreen from './IntroScreen';
import FavoritesScreen from './FavoritesScreen';
import Header from './Header';
import ControlsBar from './ControlsBar';
import ArtworkInfo from './ArtworkInfo';
import ArtworksList from './ArtworksList';
import AudioPlayer from './AudioPlayer';
import { ArtworksContext } from '../context/ArtworksContext';
import { useAnalytics } from '../context/AnaliticsContext';
import { usePlayback } from '../context/PlaybackContext';
import { Routes, Route, useNavigate } from 'react-router-dom';

const AudioGuideApp = ({ isMobile, isDarkMode }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cookies, setCookie] = useCookies(['likes']);
  const mediaRef = useRef(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const { isPlaying, setIsPlaying } = usePlayback();
  const { artworks, expositionData } = useContext(ArtworksContext);
  const { trackEvent, analyticsEvents } = useAnalytics();
  const navigate = useNavigate();

  useEffect(() => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);


  const handleLangSelect = (language) => {
    if (isPlaying) setIsPlaying(false);
    setSelectedLanguage(language);
  };

  const handleShowArtworksList = (show) => {
    if (show) {
      setIsPlaying(false);
      navigate('/list');

    } else {
      setIsPlaying(true);
      navigate('/');
    }
  }

  const toggleShowIntro = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    navigate('/intro');
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
      trackEvent(analyticsEvents.FAVORITE_MARK(currentArtwork.name[selectedLanguage]));
    }
    setCookie('likes', newLikes, { path: '/' });
  };


  if (artworks.length === 0) return <div>Cargando...</div>;

  const currentArtwork = artworks[currentIndex];
  const favoriteArtworks = artworks.filter(artwork => cookies.likes?.[artwork.name.es]);
  const activeResourceUrl = `${process.env.PUBLIC_URL}/audios/${selectedLanguage}/${currentArtwork.id}.mp3`;
  const activeBackgroundUrl = `url(${process.env.PUBLIC_URL}/img/${currentArtwork.id}.jpg)`;

  const goBackToGallery = () => {
    setCurrentIndex(0);
    setShowFavorites(false); // Oculta la pantalla de favoritos y vuelve a la audioguía
    setIsPlaying(false); // Opcional: puede empezar a reproducir el audio al volver a la galería
  };

  return (

    <div className="relative h-screen w-full text-black dark:text-white flex flex-col">
      <Routes>
        <Route path="*" element={<AudioGuideApp />} />
        <Route path="/intro" element={<IntroScreen toggleShowIntro={toggleShowIntro} langSelect={handleLangSelect} selectedLanguage={selectedLanguage} expositionData={expositionData} isDarkMode={isDarkMode} />} />
        <Route path="/list" element={<ArtworksList artworks={artworks} setIndex={setCurrentIndex} showList={handleShowArtworksList} selectedLanguage={selectedLanguage} />} />
      </Routes>
      <div
        className="absolute h-100 inset-0 bg-cover bg-center filter blur-md -z-10"
        style={{
          backgroundImage: activeBackgroundUrl,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7, // Ajusta la opacidad aquí
        }}
      />

      {/* Cabecera con logo del Museo */}
      <Header isDarkMode={isDarkMode} />
       {/* Favoritos (Outro) */}
      {showFavorites && (
        <FavoritesScreen favoriteArtworks={favoriteArtworks} onBack={goBackToGallery} selectedLanguage={selectedLanguage} />
      )}
 
      {/* Player */}
      {!showFavorites &&
        (<>
          <AudioPlayer currentArtwork={currentArtwork} currentIndex={currentIndex} selectedLanguage={selectedLanguage} isMobile={isMobile} isPlaying={isPlaying} ArtworkInfo={ArtworkInfo} mediaRef={mediaRef} activeResourceUrl={activeResourceUrl} setIsPlaying={setIsPlaying} artworks={artworks} setShowFavorites={setShowFavorites} setCurrentIndex={setCurrentIndex} />

          {/* Barra de control. Visible en el pase de imagenes */}
          {!showFavorites && <ControlsBar currentArtwork={currentArtwork} toggleLike={toggleLike} langSelect={handleLangSelect} selectedLanguage={selectedLanguage} cookies={cookies} handleShowArtworks={handleShowArtworksList} />}

        </>
        )}

    </div>
  );
};

export default AudioGuideApp;