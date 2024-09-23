// ArtworksContext.js
import React, { createContext, useState, useEffect } from "react";

export const ArtworksContext = createContext();

export const ArtworksProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const [expositionData, setExpositionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Control para evitar actualizaciones en componentes desmontados

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

  return (
    <ArtworksContext.Provider value={{ artworks, expositionData, loading, error }}>
      {children}
    </ArtworksContext.Provider>
  );
};
