import React from "react";

import IntroScreen from "./IntroScreen";
import FavoritesScreen from "./FavoritesScreen";
import Header from "./Header";
import ArtworksList from "./ArtworksList";
import AudioPlayer from "./AudioPlayer";
import { Routes, Route, Navigate } from "react-router-dom";
import { AudioGuideAppProps } from "../types";
import { useArtworks } from "../context/ArtworksContext";

const AudioGuideApp = ({ isMobile, isDarkMode }: AudioGuideAppProps) => {
  const { loading } = useArtworks();

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin">
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-screen w-full text-black dark:text-white flex flex-col">
      <Header isDarkMode={isDarkMode} />

      <Routes>
        <Route path="/guide" element={<AudioPlayer isMobile={isMobile} />} />
        <Route
          path="/intro"
          element={<IntroScreen isDarkMode={isDarkMode} />}
        />
        <Route path="/list" element={<ArtworksList />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="*" element={<Navigate to="/intro" />} />
      </Routes>
    </div>
  );
};

export default AudioGuideApp;
