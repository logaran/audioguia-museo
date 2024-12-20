import React from "react";
import { Heart } from "lucide-react";
import { useArtworks } from "../context/ArtworksContext";
import { useNavigate } from "react-router-dom";
import { usePlayback } from "../context/PlaybackContext";
import { useFavorites } from "../context/FavoritesContext";
import LanguageSwitcher from "./LanguageSwitcher";

const ControlsBar = () => {
  const { currentArtworkNode } = useArtworks();
  const { setIsPlaying } = usePlayback();
  const navigate = useNavigate();
  const { cookies, toggleLike } = useFavorites();
  const currentArtwork = currentArtworkNode?.artwork;

  return (
    <div className="h-16 w-full flex items-center justify-between bg-white dark:bg-gray-800 bg-opacity-80 p-6 z-50">
      <div className="w-8 h-8 rounded-full">
        <LanguageSwitcher />
      </div>
      <button
        onClick={() => {
          navigate("/list");
          setIsPlaying(false);
        }}
        className="bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 w-24 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300"
      >
        AUDIOS
      </button>
      {currentArtwork && (
        <button onClick={toggleLike} className="text-3xl ml-4">
          <Heart
            fill={cookies?.likes?.includes(currentArtwork.id) ? "red" : "none"}
            color="gray"
            size={32}
          />
        </button>
      )}
    </div>
  );
};

export default ControlsBar;
