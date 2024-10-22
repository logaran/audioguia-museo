import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePlayback } from "../context/PlaybackContext";
import ArtworkImage from "./ArtworkImage";
import PlayIcon from "./PlayIcon";
import ControlsBar from "./ControlsBar";
import ArtworkInfo from "./ArtworkInfo";
import { useLanguage } from "../context/LanguageContext";
import { useArtworks } from "../context/ArtworksContext";
import { useGestures } from "../context/GesturesContext";
import BackButtonHandler from "./BackButtonHandler";
import { useNavigate, useLocation } from "react-router-dom";
import { AudioPlayerProps } from "../types";
import Banner from "./Banner";

const AudioPlayer = ({ isMobile }: AudioPlayerProps) => {
  const { handleSwipe, handleTouchEnd, handleTouchMove, handleTouchStart } =
    useGestures();
  const { isPlaying, togglePlayPause, setIsPlaying } = usePlayback();
  const { selectedLanguage } = useLanguage();
  const { currentArtworkNode, setCurrentArtworkNode, artworks } = useArtworks();
  const navigate = useNavigate();
  const activeBackgroundUrl = `url(${process.env.PUBLIC_URL}/img/${currentArtworkNode?.artwork.id}.jpg)`;
  const mediaRef = useRef<HTMLAudioElement | null>(null);
  const activeResourceUrl = `${process.env.PUBLIC_URL}/audios/${selectedLanguage}/${currentArtworkNode?.artwork.id}.mp3`;
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id") || "100";
    if (id in artworks) {
      setCurrentArtworkNode(artworks[id]);
    } else {
      setCurrentArtworkNode(artworks["100"]);
    }
  }, [location.search, artworks, setCurrentArtworkNode]);

  const handleBackButton = () => {
    console.log("Esto pirula!");
    navigate("/list", { replace: true });
  };

  useEffect(() => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="relative flex flex-col flex-1 justify-between">
      <BackButtonHandler onBack={handleBackButton} />
      <div
        className="absolute inset-0 filter blur-md -z-10"
        style={{
          backgroundImage: activeBackgroundUrl,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.7, // Ajusta la opacidad aquí
        }}
      />
      <div className="relative h-full flex flex-col sm:flex-row sm:justify-evenly items-center justify-start w-auto pt-3">
        <ArtworkInfo />
     
        {/* Controles de reproducción y pase de obras*/}
        <>
          {/*Play*/}
          <div
            className={`absolute inset-0 flex h-full flex-col justify-between p-4 z-30 transition duration-300 ${
              isPlaying
                ? "pointer-events-auto"
                : "bg-black bg-opacity-30 pointer-events-auto"
            }`}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
            onClick={!isMobile ? togglePlayPause : undefined}
          >
            <PlayIcon />
          </div>

          {/*Flechas*/}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl z-30"
            onClick={() => handleSwipe("right")}
          >
            <ChevronLeft size={48} />
          </button>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl z-30"
            onClick={() => handleSwipe("left")}
          >
            <ChevronRight size={48} />
          </button>
        </>

        <ArtworkImage />
      </div>

      {activeResourceUrl && (
        <audio
          ref={mediaRef}
          src={activeResourceUrl}
          onEnded={() => setIsPlaying(false)}
        />
      )}
      <ControlsBar />
    </div>
  );
};

export default AudioPlayer;
