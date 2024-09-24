import React, { useState, useEffect, useRef, useContext } from 'react';
import { useCookies } from 'react-cookie';
import IntroScreen from './components/IntroScreen';
import FavoritesScreen from './components/FavoritesScreen';
import Header from './components/Header';
import ControlsBar from './components/ControlsBar';
import ArtworkInfo from './components/ArtworkInfo';
import ArtworksList from './components/ArtworksList';
import AudioPlayer from './components/AudioPlayer';
import { ArtworksContext } from './context/ArtworksContext';
import { usePlayback } from './context/PlaybackContext';
import BackButtonHandler from './components/BackButtonHandler';


const AudioGuideApp = ({ isMobile }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cookies, setCookie] = useCookies(['likes']);
  const mediaRef = useRef(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [showArtworksList, setShowArtworksList] = useState(false);

  const { artworks, expositionData } = useContext(ArtworksContext);
  const { isPlaying, setIsPlaying } = usePlayback();

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

  const handleBack = () => {
    setShowArtworksList(true);
  }

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
  const activeResourceUrl = `${process.env.PUBLIC_URL}/audios/${selectedLanguage}/${currentArtwork.id}.mp3`;
  const activeBackgroundUrl = `url(${process.env.PUBLIC_URL}/img/${currentArtwork.id}.jpg)`;

  const goBackToGallery = () => {
    setCurrentIndex(0);
    setShowFavorites(false); // Oculta la pantalla de favoritos y vuelve a la audioguía
    setIsPlaying(false); // Opcional: puede empezar a reproducir el audio al volver a la galería
  };

  return (
    <div className="relative h-screen w-full text-black flex flex-col">
      <BackButtonHandler onBack={handleBack} />
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
        <Header />
        {/* Intro */}
        {showIntro && (
          <IntroScreen toggleShowIntro={toggleShowIntro} langSelect={handleLangSelect} selectedLanguage={selectedLanguage} setShowArtworksList={setShowArtworksList} expositionData={expositionData} />
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
          (<>
            <AudioPlayer currentArtwork={currentArtwork} currentIndex={currentIndex} selectedLanguage={selectedLanguage} isMobile={isMobile} ArtworkInfo={ArtworkInfo} mediaRef={mediaRef} activeResourceUrl={activeResourceUrl} artworks={artworks} setShowFavorites={setShowFavorites} setShowIntro={setShowIntro} setCurrentIndex={setCurrentIndex} />

            {/* Barra de control. Visible en el pase de imagenes */}
            {!showFavorites && !showIntro && !showArtworksList && <ControlsBar currentArtwork={currentArtwork} toggleLike={toggleLike} langSelect={handleLangSelect} selectedLanguage={selectedLanguage} cookies={cookies} handleShowArtworks={handleShowArtworksList} />}
          </>
          )}
    </div>
  );
};

export default AudioGuideApp;
