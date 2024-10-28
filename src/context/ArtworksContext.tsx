// ArtworksContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { ArtworkNode, ArtworksContextValue, ExpositionData } from "../types";

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
  const [artworks, setArtworks] = useState<{ [key: string]: ArtworkNode }>({});
  const [expositionData, setExpositionData] = useState<ExpositionData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentArtworkNode, setCurrentArtworkNode] = useState<
    ArtworkNode | undefined
  >(undefined);
  const apiUrl = "http://127.0.0.1:3030/";

  useEffect(() => {
    let isMounted = true;

    const fetchArtworks = async () => {
      try {
        setLoading(true);
        setError(null); // Reinicia el error antes de cargar
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error al cargar el JSON");
        }
        const data = await response.json();

        // Validar si los datos tienen la estructura esperada
        if (isMounted) {
          setArtworks(data.artworks || {});
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
    if (Object.keys(artworks).length > 0) {
      const firstArtworkNode = artworks[Object.keys(artworks)[0]];
      setCurrentArtworkNode(firstArtworkNode);
    }
  }, [artworks]);

  const next = () => {
    if (currentArtworkNode?.next) {
      const nextNode = artworks[currentArtworkNode.next];
      setCurrentArtworkNode(nextNode);
      return currentArtworkNode.next;
    } else {
      return null;
    }
  };

  const prev = () => {
    if (currentArtworkNode?.prev) {
      const prevNode = artworks[currentArtworkNode.prev];
      setCurrentArtworkNode(prevNode);
      return currentArtworkNode.prev;
    } else {
      return null;
    }
  };

  const deleteArtwork = async (id: string) => {
    try {
      const response = await fetch(`apiUrl/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setArtworks(data);
        return true;
      } else {
        const errorData = await response.json();
        console.error("Error de red: " + errorData);
        return false;
      }
    } catch (error) {
      console.error("Error de red: " + error);
      return false;
    }
  };

  return (
    <ArtworksContext.Provider
      value={{
        artworks,
        currentArtworkNode,
        setCurrentArtworkNode,
        expositionData,
        next,
        prev,
        loading,
        error,
        deleteArtwork
      }}
    >
      {children}
    </ArtworksContext.Provider>
  );
};
