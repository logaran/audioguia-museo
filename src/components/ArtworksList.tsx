import React from "react";
import ArtworkThumbnail from "./ArtworkThumbnail";
import { useArtworks } from "../context/ArtworksContext";
import { useLanguage } from "../context/LanguageContext";

const ArtworksList = () => {
  const { artworks } = useArtworks();
  const { selectedLanguage } = useLanguage();

  return (
    <div>
      <div className="flex w-full flex-wrap gap-2 overflow-auto absolute inset-0 p-2 bg-white dark:bg-gray-800 z-50">
        {Object.keys(artworks).map((id) => {
            const artworkNode = artworks[id];
          return (
            <ArtworkThumbnail
              key={id}
              artwork={artworkNode.artwork}
              selectedLanguage={selectedLanguage}
              selectedId={artworkNode.artwork.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ArtworksList;
