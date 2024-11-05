import React, {useEffect}from "react";
import ArtworkThumbnail from "./ArtworkThumbnail";
import { useArtworks } from "../context/ArtworksContext";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
interface ArtworkListProps {
  isAdmin: boolean;
  isEditMode: boolean;
  setIsEditMode: (editMode: boolean)=>void;
  isDarkMode: boolean;
}
const ArtworksList = ({ isAdmin, isEditMode, setIsEditMode, isDarkMode }: ArtworkListProps) => {
  const { artworks } = useArtworks();
  const { selectedLanguage } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobamos si artworks está vacío y navegamos a "/intro"
    if (Object.keys(artworks).length === 0) {
      navigate("/intro");
    }
  }, [artworks, navigate]);
  
  return (
    <div className="flex w-full justify-center flex-wrap gap-2 overflow-auto p-2 bg-white dark:bg-gray-800 z-40">
      {Object.keys(artworks).map((id) => {
        const artworkNode = artworks[id];
        return (
          <ArtworkThumbnail
            key={id}
            artwork={artworkNode.artwork}
            selectedLanguage={selectedLanguage}
            selectedId={artworkNode.artwork.id}
            isAdmin={isAdmin}
            isEditMode= {isEditMode}
            setIsEditMode = {setIsEditMode}
            isDarkMode={isDarkMode}
          />
        );
      })}
    </div>
  );
};

export default ArtworksList;
