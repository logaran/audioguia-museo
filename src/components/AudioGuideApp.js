import React, { useEffect, useRef } from 'react';

import IntroScreen from './IntroScreen';
import FavoritesScreen from './FavoritesScreen';
import Header from './Header';
import ArtworkInfo from './ArtworkInfo';
import ArtworksList from './ArtworksList';
import AudioPlayer from './AudioPlayer';
import { useArtworks } from '../context/ArtworksContext';
import { usePlayback } from '../context/PlaybackContext';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AudioGuideApp = ({ isMobile, isDarkMode }) => {

  const { selectedLanguage } = useLanguage();
  const { isPlaying, setIsPlaying } = usePlayback();
  const { artworks, cookies, currentArtwork, setCurrentIndex } = useArtworks();
  const mediaRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    }
  }, [isPlaying]);


  const handleShowArtworksList = (show) => {
    if (show) {
      setIsPlaying(false);
      navigate('/list');

    } else {
      setIsPlaying(true);
      navigate('/artworks');
    }
  }


  if (artworks.length === 0) return <div>Cargando...</div>;

  if (!currentArtwork) return (<div>Cargando...</div>);
  const activeResourceUrl = `${process.env.PUBLIC_URL}/audios/${selectedLanguage}/${currentArtwork.id}.mp3`;
  const activeBackgroundUrl = `url(${process.env.PUBLIC_URL}/img/${currentArtwork.id}.jpg)`;

  const goBackToGallery = () => {
    setCurrentIndex(0);
    setIsPlaying(false);

  };

  return (

    <div className="relative h-screen w-full text-black dark:text-white flex flex-col">
      {/* Cabecera con logo del Museo */}
      <Header isDarkMode={isDarkMode} />
      <Routes>
        <Route path="/guide" element={<AudioPlayer isMobile={isMobile} ArtworkInfo={ArtworkInfo} mediaRef={mediaRef} activeResourceUrl={activeResourceUrl} setIsPlaying={setIsPlaying}  />} />
        <Route path="/intro" element={<IntroScreen isDarkMode={isDarkMode} />} />
        <Route path="/list" element={<ArtworksList artworks={artworks} setIndex={setCurrentIndex} showList={handleShowArtworksList} selectedLanguage={selectedLanguage} />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="*" element={<Navigate to="/intro" />} />
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

    </div>
  );
};

export default AudioGuideApp;