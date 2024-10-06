import React from "react";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePlayback } from "../context/PlaybackContext";
import ArtworkImage from "./ArtworkImage";
import PlayIcon from "./PlayIcon";
import ControlsBar from "./ControlsBar";
import ArtworkInfo from "./ArtworkInfo";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useArtworks } from "../context/ArtworksContext";

const AudioPlayer = ({ isMobile, mediaRef, activeResourceUrl }) => {

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwipe = useRef(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const { isPlaying, togglePlayPause, setIsPlaying } = usePlayback();
  const { selectedLanguage } = useLanguage();
  const { artworks, currentArtwork, currentIndex, setCurrentIndex } = useArtworks();
  const navigate = useNavigate();

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
    let newIndex = currentIndex;

    if (direction === 'right') {
      if (currentIndex === 0) {
        navigate('/intro');
      } else {
        newIndex--;
        setCurrentIndex(newIndex);
        setIsPlaying(false);
      }
    } else if (direction === 'left') {
      if (currentIndex === artworks.length - 1) {
        navigate('/favorites')
      } else {
        newIndex++;
        setCurrentIndex(newIndex);
        setIsPlaying(false);
      }
    }
  };


  return (

    <div className="relative h-full flex flex-col justify-between">
      <div className="relative h-full flex flex-col sm:flex-row sm:justify-evenly items-center justify-evenly w-auto pt-3">
        <ArtworkInfo artwok={currentArtwork} selectedLanguage={selectedLanguage} />

        {/* Controles de reproducción y pase de obras*/}
        <>
          {/*Play*/}
          <div
            className={`absolute inset-0 flex h-full flex-col justify-between p-4 z-30 transition duration-300 ${isPlaying ? 'pointer-events-auto' : 'bg-black bg-opacity-30 pointer-events-auto'
              }`}
            onTouchStart={isMobile ? handleTouchStart : null}
            onTouchMove={isMobile ? handleTouchMove : null}
            onTouchEnd={isMobile ? handleTouchEnd : null}
            onClick={!isMobile ? togglePlayPause : null}
          >
            <PlayIcon />
          </div>

          {/*Flechas*/}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl z-30"
            onClick={() => handleSwipe('right')}
          >
            <ChevronLeft size={48} />
          </button>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl z-30"
            onClick={() => handleSwipe('left')}
          >
            <ChevronRight size={48} />
          </button>
        </>

        <ArtworkImage currentArtwork={currentArtwork} selectedLanguage={selectedLanguage} swipeOffset={swipeOffset} />


      </div>

      {activeResourceUrl && (<audio
        ref={mediaRef}
        src={activeResourceUrl}
        onEnded={() => setIsPlaying(false)}
      />)}
      <ControlsBar currentArtwork={currentArtwork} selectedLanguage={selectedLanguage} />

    </div>

  );
};

export default AudioPlayer;