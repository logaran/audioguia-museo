import React from 'react';
import { useEffect, useState } from 'react';
import { Artwork, LanguageCodes } from '../types';

interface ArtworkImageProps {
    currentArtwork: Artwork;
    selectedLanguage: LanguageCodes;
    swipeOffset: number;
};
const ArtworkImage = ({ currentArtwork, selectedLanguage, swipeOffset }: ArtworkImageProps) => {

    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {

        currentArtwork.id === '100' ? setImageSrc(`${process.env.PUBLIC_URL}/img/${currentArtwork.id}${selectedLanguage}.jpg`) : setImageSrc(`${process.env.PUBLIC_URL}/img/${currentArtwork.id}.jpg`);

    }, [currentArtwork.id, selectedLanguage]);

    return (
        <img
            src={imageSrc}
            alt={currentArtwork.name[selectedLanguage]}
            className="transition-transform h-[50vh] duration-300 object-contain object-top"
            style={{ transform: `translateX(${swipeOffset}px)` }}
        />
    );
};

export default ArtworkImage;