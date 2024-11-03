import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useGestures } from "../context/GesturesContext";
import { Artwork } from "../types";

interface ArtworkImageProps {
  currentArtwork?: Artwork;
}

const ArtworkImage = ({ currentArtwork }: ArtworkImageProps) => {
  const { swipeOffset } = useGestures();
  const { selectedLanguage } = useLanguage();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  
  useEffect(() => {
    if (currentArtwork) {
      
      const imageUrl = `${process.env.PUBLIC_URL}/img/${selectedLanguage}/${currentArtwork.id}.jpg`;
      setImageSrc(imageUrl);
    }
  }, [currentArtwork, selectedLanguage]);

  const handleError = () => {
    const fallbackUrl = `${process.env.PUBLIC_URL}/img/es/${currentArtwork?.id}.jpg`;
    setImageSrc(fallbackUrl);
  };

  return (
    <img
      src={imageSrc || undefined} // Cargar imagen o fallback
      alt={currentArtwork?.name[selectedLanguage] || "Imagen por defecto"}
      className="max-w-full max-h-full transition-transform duration-300 object-top m-auto"
      style={{ transform: `translateX(${swipeOffset}px)` }}
      onError={handleError} // Manejar error de carga
    />
  );
};

export default ArtworkImage;
