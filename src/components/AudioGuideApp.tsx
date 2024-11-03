import React, { useState } from "react";

import IntroScreen from "./IntroScreen";
import FavoritesScreen from "./FavoritesScreen";
import Header from "./Header";
import ArtworksList from "./ArtworksList";
import AudioPlayer from "./AudioPlayer";
import { Routes, Route, Navigate } from "react-router-dom";
import { AudioGuideAppProps } from "../types";
import { useArtworks } from "../context/ArtworksContext";

const AudioGuideApp = ({
  isMobile,
  isDarkMode,
  isAdmin,
}: AudioGuideAppProps) => {
  const { loading } = useArtworks();
  const [isEditMode, setIsEditMode] = useState(false);
  
  const handleEditMode = (editMode: boolean) => {
    setIsEditMode(editMode);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full text-black dark:text-white flex flex-col">
      {isMobile && <Header isDarkMode={isDarkMode} />}
      {isAdmin && (
        <div className="absolute left-4 top-4 text-red-600 z-50">
          Modo Administrador
        </div>
      )}
      <Routes>
        <Route
          path="/guide"
          element={<AudioPlayer isMobile={isMobile} isAdmin={isAdmin} />}
        />
        <Route
          path="/intro"
          element={<IntroScreen isDarkMode={isDarkMode} />}
        />
        <Route path="/list" element={<ArtworksList isAdmin={isAdmin} isEditMode={isEditMode} setIsEditMode={handleEditMode}/>} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="*" element={<Navigate to="/intro" />} />
      </Routes>
    </div>
  );
};

export default AudioGuideApp;
