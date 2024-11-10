import React, { useRef, useEffect, useState } from "react";
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

const AudioPlayer = ({ isMobile, isDarkMode }: AudioPlayerProps) => {
  const { handleSwipe, handleTouchEnd, handleTouchMove, handleTouchStart } =
    useGestures();
  const { isPlaying, togglePlayPause, setIsPlaying } = usePlayback();
  const { selectedLanguage } = useLanguage();
  const { currentArtworkNode, setCurrentArtworkNode, artworks } = useArtworks();
  const navigate = useNavigate();
  const [activeBackgroundUrl, setActiveBackground] = useState<
    string | undefined
  >(undefined);
  const [activeResourceUrl, setActiveResourceUrl] = useState<
    string | undefined
  >(undefined);
  const mediaRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);

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
    if (currentArtworkNode && selectedLanguage) {
      setActiveResourceUrl(
        `http://guideapi:3030/api/data/guides/desnudos/audios/${selectedLanguage}/${currentArtworkNode?.artwork.id}.mp3`
      );
    }
  }, [currentArtworkNode, selectedLanguage]);

  useEffect(() => {
    const checkAudioUrl = async () => {
      if (activeResourceUrl) {
        try {
          const response = await fetch(activeResourceUrl, { method: "HEAD" });
          if (response.ok) {
            setIsValidUrl(true);
          } else {
            setIsValidUrl(false);
          }
        } catch (error) {
          setIsValidUrl(false);
          console.error(error);
        }
      }
    };
    checkAudioUrl();
  }, [activeResourceUrl]);
  useEffect(() => {
    const setBackground = async () => {
      if (currentArtworkNode && selectedLanguage) {
        const englishBackgroundUrl = `http://guideapi:3030/api/data/guides/desnudos/images/en/${
          currentArtworkNode.artwork.id
        }.jpg?ts=${new Date().getTime()}`;
        const spanishBackgroundUrl = `http://guideapi:3030/api/data/guides/desnudos/images/es/${
          currentArtworkNode.artwork.id
        }.jpg?ts=${new Date().getTime()}`;

        try {
          // Intenta cargar la imagen en inglés
          const response = await fetch(englishBackgroundUrl, {
            method: "HEAD",
          });

          if (response.ok && selectedLanguage === "en") {
            setActiveBackground(englishBackgroundUrl);
          } else {
            // Si la imagen en inglés no existe, usa la imagen en español
            setActiveBackground(spanishBackgroundUrl);
          }
        } catch (error) {
          // En caso de error, también usa la imagen en español
          setActiveBackground(spanishBackgroundUrl);
        }
      }
    };

    setBackground();
  }, [currentArtworkNode, selectedLanguage]);

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
      {activeBackgroundUrl && (
        <div
          className="absolute inset-0 filter blur-md -z-10"
          style={{
            backgroundImage: `url(${activeBackgroundUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.7, // Ajusta la opacidad aquí
          }}
        />
      )}
      <div className="relative h-full flex flex-col sm:flex-row sm:justify-evenly items-center justify-start w-auto pt-3">
        <div className="self-start sm:self-auto">
          <ArtworkInfo artwork={currentArtworkNode} isDarkMode={isDarkMode} />
        </div>
        {/* Controles de reproducción y pase de obras*/}
        <>
          {/*Play*/}
          {isValidUrl && (<div
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
          </div>)}

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
        <div className="h-72">
          <ArtworkImage currentArtwork={currentArtworkNode?.artwork} />
        </div>
      </div>

      {isValidUrl && (
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
