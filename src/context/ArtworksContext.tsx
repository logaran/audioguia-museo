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
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentArtworkNode, setCurrentArtworkNode] = useState<
    ArtworkNode | undefined
  >(undefined);

  // const apiUrl = "http://guideapi:3030/"; //En casa
  const guideName = "desnudos/";
  const apiUrl = "http://127.0.0.1:3030/" + guideName; //En el Museo

  useEffect(() => {
    let isMounted = true;

    const fetchArtworks = async () => {
      try {
        if (shouldFetch) {
          // Solo se ejecuta si shouldFetch es true
          setLoading(true);
          setError(null); // Reinicia el error antes de cargar
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Error al cargar el JSON");
          }
          const data = await response.json();

          // Validar si los datos tienen la estructura esperada
          if (isMounted) {
            setArtworks(data.artworks || []);
            setExpositionData(data.exposition || null);
            setShouldFetch(false); // Cambia shouldFetch a false para evitar bucles
          }
        }
      } catch (error) {
        if (isMounted) {
          setError("Error fetching artworks data");
          console.error("Error fetching artworks data:", error);
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
  }, [shouldFetch, apiUrl]);

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
      const response = await fetch(`${apiUrl}${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setShouldFetch(true);
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

  const addOrUpdateArtwork = async (formData: FormData): Promise<boolean> => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Error al enviar el formulario:", response.statusText);
        return false;
      }

      const result = await response.json();
      setShouldFetch(true);
      return result.status === "success";
    } catch (error) {
      console.error("Error en la solicitud:", error);
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
        deleteArtwork,
        putArtwork: addOrUpdateArtwork,
      }}
    >
      {children}
    </ArtworksContext.Provider>
  );
};
