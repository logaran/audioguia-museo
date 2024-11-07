import React from "react";

import { useLanguage } from "../context/LanguageContext";
import { ArtworkNode } from "../types";

interface ArtworkInfoProps {
  artwork: ArtworkNode | undefined;
  isDarkMode: boolean;
}

const ArtworkInfo = ({artwork, isDarkMode}: ArtworkInfoProps) => {
  
  const {selectedLanguage} = useLanguage();
  return (
    <div
      className="w-full p-4 z-50"
      style={{ pointerEvents: "none" }}
    >
      <p className="text-sm">{artwork && artwork['artwork'].description}</p>
      <p className={`text-md ${isDarkMode ? 'text-gray-50':'text-gray-900'} font-bold`}>{artwork && (artwork['artwork'].author || "")}</p>
      <p
        className={`${isDarkMode ? 'text-gray-50':'text-gray-900'} text-xl font-bold min-h-[4.5rem]`}
      >
        <span className="italic">{artwork && (artwork['artwork'].name[selectedLanguage] || "")}</span>
        {artwork && artwork['artwork'].date ? `, ${artwork['artwork'].date}` : ""}
      </p>
    </div>
  );
};

export default ArtworkInfo;
