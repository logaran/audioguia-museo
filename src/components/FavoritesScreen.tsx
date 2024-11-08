import React from "react";
import ShareComponent from "./ShareComponent";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import ArtworkImage from "./ArtworkImage";
import ArtworkInfo from './ArtworkInfo';

interface ArtworkInfoProps {
  isDarkMode: boolean;
}
const FavoritesScreen: React.FC<ArtworkInfoProps> = ({isDarkMode}:ArtworkInfoProps) => {
  const { selectedLanguage } = useLanguage();
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const goBack = () => {
    navigate("/list");
  };

  return (
    <div className="w-screen h-full flex flex-col items-center justify-start bg-white text-gray-700 dark:bg-gray-900 dark:text-white px-8 py-2">
      <h1 className="text-2xl font-bold mb-4">
        {selectedLanguage === "es"
          ? "Comparte tus obras favoritas"
          : "Share your favourite artworks"}
      </h1>

      <ul className="flex w-full justify-center flex-wrap gap-2 overflow-auto p-2 bg-white dark:bg-gray-800 z-40">
        {favorites.map((favorite) => {
          const shareUrl = `${window.location.origin}/guide/?id=${favorite.artwork.id}`;

          return (
            <li
              key={favorite.artwork.id}
              className="h-48 w-full md:[width:calc(50%-0.3rem)] lg:[width:calc(33%-0.2rem)] overflow-x-auto flex items-center p-4 border border-gray-300 rounded cursor-pointer hover:bg-gray-100}"
            >
              <div className="w-36 h-36">
                <ArtworkImage currentArtwork={favorite.artwork} />
              </div>
              <ArtworkInfo artwork={favorite} isDarkMode={isDarkMode}/>
              <div className="flex-1">
                <ShareComponent
                  url={shareUrl}
                  title={`He estado en el Museo Carmen Thyssen Málaga y me ha encantado esta obra`}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => goBack()}
        className="bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 w-48 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300"
      >
        {selectedLanguage === "es"
          ? "Volver a la Audioguía"
          : "Return to audioguide"}
      </button>
    </div>
  );
};

export default FavoritesScreen;
