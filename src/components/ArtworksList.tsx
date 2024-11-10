import React, { useEffect } from "react";
import ArtworkThumbnail from "./ArtworkThumbnail";
import { useArtworks } from "../context/ArtworksContext";
import { useLanguage } from "../context/LanguageContext";
interface ArtworkListProps {
  isAdmin: boolean;
  isEditMode: boolean;
  setIsEditMode: (editMode: boolean) => void;
  isDarkMode: boolean;
}
const ArtworksList = ({
  isAdmin,
  isEditMode,
  setIsEditMode,
  isDarkMode,
}: ArtworkListProps) => {
  const { artworks, addOrUpdateArtwork } = useArtworks();
  const { selectedLanguage } = useLanguage();

  useEffect(() => {
    const generateUUID = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };
    if (Object.keys(artworks).length === 0) {
      const newId = generateUUID();
      const newArtwork = {
        name: {
          es: "",
          en: "",
        },
        author: "",
        date: "",
        description: "",
        id: newId,
      };
      const newArtworkData = {
        artwork: newArtwork,
        prev: null,
        next: null,
      };
      const formData = new FormData();
      formData.append("artwork" ,JSON.stringify(newArtworkData));
      addOrUpdateArtwork(formData);
    }
  }, [artworks, addOrUpdateArtwork]);

  return (
    <div className="flex w-full justify-center flex-wrap gap-2 overflow-auto p-2 bg-white dark:bg-gray-800 z-40">
      {(() => {
        // Encuentra el primer elemento en la lista (donde `prev` es `null`)
        let currentId: string | undefined = Object.keys(artworks).find(
          (id) => artworks[id].prev === null
        );
        const elements = [];

        // Itera sobre los elementos en el orden de la lista doblemente enlazada
        while (currentId) {
          const artworkNode = artworks[currentId];
          elements.push(
            <ArtworkThumbnail
              key={currentId}
              artwork={artworkNode}
              artworks={artworks}
              selectedLanguage={selectedLanguage}
              selectedId={artworkNode.artwork.id}
              isAdmin={isAdmin}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              isDarkMode={isDarkMode}
            />
          );
          // Avanza al siguiente nodo
          currentId = artworkNode.next || undefined;
        }

        return elements;
      })()}
    </div>
  );
};

export default ArtworksList;
