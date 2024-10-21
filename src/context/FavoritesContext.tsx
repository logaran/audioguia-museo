import React, { createContext, useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { useAnalytics } from "./AnaliticsContext";
import { useArtworks } from "./ArtworksContext";
import { useLanguage } from "./LanguageContext";
import { ArtworkNode, FavoritesContextValue } from '../types';

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe estar dentro de un FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentArtworkNode, artworks } = useArtworks();
  const [cookies, setCookie] = useCookies(["likes"]);
  const { trackEvent, analyticsEvents } = useAnalytics();
  const { selectedLanguage } = useLanguage();
  const [favorites, setFavorites] = useState<ArtworkNode[]>([]);
  const currentArtwork = currentArtworkNode?.artwork;
  
  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!currentArtwork) {
      console.warn("No hay obra de arte seleccionada.");
      return;
    }

    const currentLikes = cookies.likes ? [...cookies.likes] : [];
    let updatedLikes;

    if (currentLikes.includes(currentArtwork.id)) {
      updatedLikes = currentLikes.filter((id) => id !== currentArtwork.id);
    } else {
      updatedLikes = [...currentLikes, currentArtwork.id];
      trackEvent(
        analyticsEvents.FAVORITE_MARK(
          currentArtwork.name[selectedLanguage] || "Obra desconocida"
        )
      );
    }

    setCookie("likes", updatedLikes, { path: "/" });
  };

  useEffect(() => {
    if (cookies.likes) {
      const artworksArray = Object.values(artworks);
      const favorites = artworksArray.filter((artwork) =>
        cookies.likes.includes(artwork.artwork.id)
      );
      setFavorites(favorites);
    }
  }, [cookies.likes, artworks]);

  return (
    <FavoritesContext.Provider value={{ favorites, cookies, toggleLike }}>
      {children}
    </FavoritesContext.Provider>
  );
};
