import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePlayback } from "../context/PlaybackContext";
import ArtworkImage from "./ArtworkImage";
import PlayIcon from "./PlayIcon";
import ControlsBar from "./ControlsBar";
import ArtworkInfo from "./ArtworkInfo";
import { useLanguage } from "../context/LanguageContext";
import { useArtworks } from "../context/ArtworksContext";
import { useGestures } from "../context/GesturesContext";
import BackButtonHandler from "./BackButtonHandler";
import { useNavigate } from "react-router-dom";
import { AudioPlayerProps } from "../types";

const AudioPlayer = ({ isMobile, mediaRef, activeResourceUrl }: AudioPlayerProps) => {
  
  const {handleSwipe, handleTouchEnd, handleTouchMove, handleTouchStart, swipeOffset} = useGestures();
  const { isPlaying, togglePlayPause, setIsPlaying } = usePlayback();
  const { selectedLanguage } = useLanguage();
  const { currentArtwork } = useArtworks();
  const navigate = useNavigate();

  const handleBackButton = ()=>{
    navigate('/list');
  }

  return (

    <div className="relative h-full flex flex-col justify-between">
      <BackButtonHandler onBack={handleBackButton}/>
      <div className="relative h-full flex flex-col sm:flex-row sm:justify-evenly items-center justify-start w-auto pt-3">
        <ArtworkInfo artwork={currentArtwork} selectedLanguage={selectedLanguage} isPlaying={isPlaying}/>

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