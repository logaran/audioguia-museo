import React from 'react';
import { useEffect, useState } from 'react';
import { useArtworks } from '../context/ArtworksContext';
import { useLanguage } from '../context/LanguageContext';
import { useGestures } from '../context/GesturesContext';

const ArtworkImage = () => {
    const {swipeOffset} = useGestures();
    const {selectedLanguage} = useLanguage();
    const {currentArtworkNode } = useArtworks();
    const currentArtwork = currentArtworkNode?.artwork;
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {

        currentArtwork?.id === '100' ? setImageSrc(`${process.env.PUBLIC_URL}/img/${currentArtwork.id}${selectedLanguage}.jpg`) : setImageSrc(`${process.env.PUBLIC_URL}/img/${currentArtwork?.id}.jpg`);

    }, [currentArtwork?.id, selectedLanguage]);

    return (
        <img
            src={imageSrc}
            alt={currentArtwork?.name[selectedLanguage]}
            className="transition-transform h-[50vh] duration-300 object-contain object-top"
            style={{ transform: `translateX(${swipeOffset}px)` }}
        />
    );
};

export default ArtworkImage;