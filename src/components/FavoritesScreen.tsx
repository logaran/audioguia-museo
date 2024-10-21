import React from "react";
import ShareComponent from "./ShareComponent";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const FavoritesScreen: React.FC = () => {
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

      <ul className="h-full w-full border-3 overflow-auto">
        {favorites.map((favorite) => {
          const shareUrl = `${window.location.origin}/guide/?id=${favorite.artwork.id}`;
          const fallbackImageUrl = `${process.env.PUBLIC_URL}/img/${favorite.artwork.id}.jpg`;
          const placeholderUrl = `${process.env.PUBLIC_URL}/img/placeholder.jpg`;

          return (
            <li
              key={favorite.artwork.id}
              className="mb-6 w-full flex items-center justify-between"
            >
              <img
                src={shareUrl}
                onError={({ currentTarget }) => {
                  currentTarget.src = fallbackImageUrl;
                  currentTarget.onerror = () => {
                    currentTarget.src = placeholderUrl;
                  };
                }}
                alt={favorite.artwork.name[selectedLanguage]}
                title={favorite.artwork.name[selectedLanguage]}
                className="w-14 h-14 object-contain rounded-md mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {favorite.artwork.name[selectedLanguage]}
                </h2>
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
