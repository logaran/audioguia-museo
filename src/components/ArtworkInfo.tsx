import React from "react";
import { Artwork, LanguageCodes } from "../types";

interface ArtworkInfoProps {
    artwork: Artwork;
    selectedLanguage: LanguageCodes;
}

const ArtworkInfo = ({ artwork, selectedLanguage }: ArtworkInfoProps) => {

    return (

        <div className="w-full sm:w-1/2 p-4 z-50 truncate" style={{ pointerEvents: 'none' }}>
            <p className="text-sm">{artwork.description}</p>
            <p className="text-md text-gray-900 font-bold">{artwork.author || ''}</p>
            <p className="text-gray-900 font-bold"
                style={{fontSize: "clamp(0.5rem, 5.5vw, 1.5rem)"}}>
                <span className="italic">{artwork.name[selectedLanguage] || ''}</span>
                {artwork.date ? `, ${artwork.date}` : ''}
            </p>

        </div>
    )
}

export default ArtworkInfo;