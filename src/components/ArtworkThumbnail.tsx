import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { Heart } from "lucide-react";
import { useArtworks } from "../context/ArtworksContext";
import { ArtworkNode, LanguageCodes } from "../types";
import ArtworkInfo from "./ArtworkInfo";
import AdminControls from "./AdminControls";
import ArtworkImage from "./ArtworkImage";

interface ArtworkThumbnailProps {
  artwork: ArtworkNode | undefined;
  selectedLanguage: LanguageCodes;
  selectedId: string;
  isAdmin: boolean;
  isEditMode: boolean;
  setIsEditMode: (editMode: boolean) => void;
  isDarkMode: boolean;
}
const ArtworkThumbnail = ({
  artwork,
  selectedId,
  isAdmin,
  isEditMode,
  setIsEditMode,
  isDarkMode
}: ArtworkThumbnailProps) => {
  const navigate = useNavigate();
  const { cookies } = useFavorites();
  const { artworks, setCurrentArtworkNode } = useArtworks();

  const handleClick = () => {
    if (!isEditMode) {
      setCurrentArtworkNode(artworks[selectedId]);
      navigate(`/guide/?id=${selectedId}`);
    }
  };

  return (
    <div
      className={`relative w-full md:[width:calc(50%-0.3rem)] lg:[width:calc(33%-0.2rem)] overflow-x-auto flex items-center p-4 border border-gray-300 rounded cursor-pointer hover:bg-gray-100} `}
      onClick={handleClick}
    >
      {/* Miniatura */}
      <div className="w-16 h-16 object-scale-down rounded mr-4">
        <ArtworkImage currentArtwork={artwork} />
      </div>
      <ArtworkInfo artwork={artwork} isDarkMode={isDarkMode} />
      {artwork && artwork['artwork'].id && cookies?.likes?.includes(artwork['artwork'].id) && (
        <div className="absolute top-1 right-1">
          <Heart fill="pink" />
        </div>
      )}

      {isAdmin && (
        <div className="absolute inset-0 w-full h-full">
          <AdminControls
            artwork={artwork}
            setIsEditMode={setIsEditMode}
            isEditMode={isEditMode}
          />
        </div>
      )}
    </div>
  );
};

export default ArtworkThumbnail;
