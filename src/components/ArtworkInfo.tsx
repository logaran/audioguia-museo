import React from "react";

import { useLanguage } from "../context/LanguageContext";
import { Artwork } from "../types";

interface ArtworkInfoProps {
  artwork: Artwork | undefined;
}

const ArtworkInfo = ({artwork}: ArtworkInfoProps) => {
  
  const {selectedLanguage} = useLanguage();
  return (
    <div
      className="w-full p-4 z-50"
      style={{ pointerEvents: "none" }}
    >
      <p className="text-sm">{artwork?.description}</p>
      <p className="text-md text-gray-900 font-bold">{artwork?.author || ""}</p>
      <p
        className="text-gray-900 text-xl font-bold min-h-[4.5rem]"
      >
        <span className="italic">{artwork?.name[selectedLanguage] || ""}</span>
        {artwork?.date ? `, ${artwork.date}` : ""}
      </p>
    </div>
  );
};

export default ArtworkInfo;
