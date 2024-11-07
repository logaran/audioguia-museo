import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useGestures } from "../context/GesturesContext";
import { ArtworkNode } from "../types";

interface ArtworkImageProps {
  currentArtwork?: ArtworkNode;
}

const ArtworkImage = ({ currentArtwork }: ArtworkImageProps) => {
  const { swipeOffset } = useGestures();
  const { selectedLanguage } = useLanguage();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const apiUrl = 'http://127.0.0.1/3030'
  useEffect(() => {
    if (currentArtwork) {
      const imageUrl = `${apiUrl}/api/data/guides/desnudos/images/${selectedLanguage}/${currentArtwork['artwork'].id}.jpg`;
      setImageSrc(imageUrl);
      console.log("Accediendo a la url: " +imageUrl );
    }
  }, [currentArtwork, selectedLanguage]);

  const handleError = () => {
    const fallbackUrl = `${process.env.PUBLIC_URL}/api/data/guides/desnudos/images/es/${currentArtwork && currentArtwork['artwork'].id}.jpg`;
    setImageSrc(fallbackUrl);
  };

  return (
    <img
      src={imageSrc || undefined} // Cargar imagen o fallback
      alt={currentArtwork && (currentArtwork['artwork'].name[selectedLanguage] || "Imagen por defecto")}
      className="max-w-full max-h-full transition-transform duration-300 object-top m-auto"
      style={{ transform: `translateX(${swipeOffset}px)` }}
      onError={handleError} // Manejar error de carga
    />
  );
};

export default ArtworkImage;
