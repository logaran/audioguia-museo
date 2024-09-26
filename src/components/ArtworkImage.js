import { useEffect, useState } from 'react';

const ArtworkImage = ({ currentArtwork, selectedLanguage, swipeOffset }) => {

    const [ imageSrc, setImageSrc ] = useState('');
    useEffect(() => {

        currentArtwork.id === '100' ? setImageSrc(`${process.env.PUBLIC_URL}/img/${currentArtwork.id}${selectedLanguage}.jpg`) : setImageSrc(`${process.env.PUBLIC_URL}/img/${currentArtwork.id}.jpg`);

    }, [currentArtwork.id, selectedLanguage]);

    return (
        <img
            src={imageSrc}
            alt={currentArtwork.name[selectedLanguage]}
            className="transition-transform h-[50vh] duration-300 object-contain"
            style={{ transform: `translateX(${swipeOffset}px)` }}
        />
    );
};

export default ArtworkImage;