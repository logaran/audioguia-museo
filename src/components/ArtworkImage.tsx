import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useGestures } from "../context/GesturesContext";
import { Artwork } from "../types";
import appData from "../config/appConfig";

interface ArtworkImageProps {
  currentArtwork?: Artwork;
}

const ArtworkImage = ({ currentArtwork }: ArtworkImageProps) => {
  const { swipeOffset } = useGestures();
  const { selectedLanguage } = useLanguage();
  const [timeStamp] = useState(new Date().getTime());
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const apiUrl = appData.apiUrl;
  const baseDir = apiUrl + '/data/';
  useEffect(() => {
    if (currentArtwork) {
      const imageUrl = `${baseDir}guides/desnudos/images/${selectedLanguage}/${currentArtwork.id}.jpg?ts=${timeStamp}`;
      setImageSrc(imageUrl);
    }
  }, [currentArtwork, selectedLanguage, timeStamp, baseDir]);

  const handleError = () => {
    const fallbackUrl = `${baseDir}guides/desnudos/images/es/${currentArtwork && currentArtwork.id}.jpg?ts=${timeStamp}`;
    setImageSrc(fallbackUrl);
  };

  return (
    <img
      src={imageSrc || undefined} // Cargar imagen o fallback
      alt={currentArtwork && (currentArtwork.name[selectedLanguage] || "Imagen por defecto")}
      className="max-w-full max-h-full transition-transform duration-300 object-top m-auto"
      style={{ transform: `translateX(${swipeOffset}px)` }}
      onError={handleError} // Manejar error de carga
    />
  );
};

export default ArtworkImage;
