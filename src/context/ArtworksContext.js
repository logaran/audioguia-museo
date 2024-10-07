// ArtworksContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const ArtworksContext = createContext();
export const useArtworks = () => { return useContext(ArtworksContext) };

export const ArtworksProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const [expositionData, setExpositionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentArtwork, setCurrentartwork] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchArtworks = async () => {
      try {
        setLoading(true);
        setError(null); // Reinicia el error antes de cargar
        const response = await fetch(`${process.env.PUBLIC_URL}/guides/desnudos.json`);
        if (!response.ok) {
          throw new Error('Error al cargar el JSON');
        }
        const data = await response.json();

        // Validar si los datos tienen la estructura esperada
        if (isMounted) {
          setArtworks(data.artworks || []); // Asegura que artworks sea un array
          setExpositionData(data.exposition || null);
        }
      } catch (error) {
        if (isMounted) {
          setError('Error fetching artworks data');
          console.error('Error fetching artworks data:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
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
    <ArtworksContext.Provider value={{ artworks, currentArtwork, currentIndex, setCurrentIndex, expositionData, loading, error }}>
      {children}
    </ArtworksContext.Provider>
  );
};
