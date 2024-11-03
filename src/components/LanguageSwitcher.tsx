import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { usePlayback } from "../context/PlaybackContext";
import { languages } from "./Languages";

const LanguageSwitcher = ()=>{
  const {selectedLanguage, setSelectedLanguage} = useLanguage();
  const {setIsPlaying} = usePlayback();
  
  const switchLang = () => {
    const newLang = selectedLanguage === "es" ? "en" : "es";
    setIsPlaying(false);
    setSelectedLanguage(newLang);
  };

    return (
        <div className="cursor-pointer" onClick={switchLang}>
        <img
          src={languages[selectedLanguage].flag()}
          alt={languages[selectedLanguage].name}
        />
      </div> 
    )
}

export default LanguageSwitcher;