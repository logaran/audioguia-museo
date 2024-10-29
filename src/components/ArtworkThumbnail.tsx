import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { Heart, CircleX } from "lucide-react";
import { useArtworks } from "../context/ArtworksContext";
import { Artwork, LanguageCodes } from "../types";
import ArtworkInfo from "./ArtworkInfo";

interface ArtworkThumbnailProps {
  artwork: Artwork | undefined;
  selectedLanguage: LanguageCodes;
  selectedId: string;
  isAdmin: boolean;
}
const ArtworkThumbnail = ({
  artwork,
  selectedLanguage,
  selectedId,
  isAdmin,
}: ArtworkThumbnailProps) => {
  const navigate = useNavigate();
  const { cookies } = useFavorites();
  const { artworks, setCurrentArtworkNode, deleteArtwork } = useArtworks();

  const handleClick = () => {
    setCurrentArtworkNode(artworks[selectedId]);
    navigate(`/guide/?id=${selectedId}`);
  };

  const handleDeleteClick = (id: string) => {
    deleteArtwork(id);
  };

  return (
    <div
      className="relative w-full md:[width:calc(50%-0.3rem)] lg:[width:calc(33%-0.2rem)] flex items-center p-4 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      {/* Miniatura */}
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/img/${artwork?.id}${selectedLanguage}.jpg`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `${process.env.PUBLIC_URL}/img/${artwork?.id}.jpg`;
            target.onerror = () => {
              target.src = `${process.env.PUBLIC_URL}/img/placeholder.jpg`;
            };
          }}
          alt={artwork?.name[selectedLanguage]}
          className="w-16 h-16 object-scale-down rounded mr-4"
        />
      </div>
      <ArtworkInfo artwork={artwork} />
      {artwork?.id && cookies?.likes?.includes(artwork.id) && (
        <div className="absolute bottom-1 right-1">
          <Heart fill="pink" />
        </div>
      )}

      {isAdmin && (
        <div className="absolute top-1 right-1">
          <CircleX
            fill="red"
            onClick={() => artwork?.id && handleDeleteClick(artwork.id)}
          />
        </div>
      )}
    </div>
  );
};

export default ArtworkThumbnail;
