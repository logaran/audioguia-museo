// ArtworksContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { Artwork, ArtworksContextValue, ExpositionData } from "../types";

const ArtworksContext = createContext<ArtworksContextValue | undefined>(
  undefined
);
export const useArtworks = () => {
  const context = useContext(ArtworksContext);
  if (!context) {
    throw new Error("useArtworks debe estar dentro de un ArtworksProvider");
  }
  return context;
};

export const ArtworksProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [expositionData, setExpositionData] = useState<ExpositionData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentArtwork, setCurrentartwork] = useState<Artwork | undefined>(
    undefined
  );

  useEffect(() => {
    let isMounted = true;

    const fetchArtworks = async () => {
      try {
        setLoading(true);
        setError(null); // Reinicia el error antes de cargar
        const response = await fetch(
          `${process.env.PUBLIC_URL}/guides/desnudos.json`
        );
        if (!response.ok) {
          throw new Error("Error al cargar el JSON");
        }
        const data = await response.json();

        // Validar si los datos tienen la estructura esperada
        if (isMounted) {
          setArtworks(data.artworks || []); // Asegura que artworks sea un array
          setExpositionData(data.exposition || null);
        }
      } catch (error) {
        if (isMounted) {
          setError("Error fetching artworks data");
          console.error("Error fetching artworks data:", error);
        }
      } finally {
        if (isMounted) {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      }
    };

    fetchArtworks();

    // Cleanup function para evitar actualizaciones de estado si el componente se desmonta
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const newArtwork = artworks[currentIndex];
    setCurrentartwork(newArtwork);
  }, [currentIndex, artworks]);

  return (
    <ArtworksContext.Provider
      value={{
        artworks,
        currentArtwork,
        currentIndex,
        setCurrentIndex,
        expositionData,
        loading,
        error,
      }}
    >
      {children}
    </ArtworksContext.Provider>
  );
};
