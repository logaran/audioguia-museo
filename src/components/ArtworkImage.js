import { useState, useEffect } from 'react';

const ArtworkImage = ({ currentArtwork, selectedLanguage, swipeOffset }) => {
    const [imageSrc, setImageSrc] = useState('');
    
    useEffect(() => {
        const updateImageSrc = () => {
            const languageImage = `${process.env.PUBLIC_URL}/img/${currentArtwork.id}${selectedLanguage}.jpg`;
            const defaultImage = `${process.env.PUBLIC_URL}/img/${currentArtwork.id}.jpg`;
    
            // Primero, intenta con la imagen del idioma
            setImageSrc(languageImage);
    
            // Cargar la imagen de idioma y manejar errores secuencialmente
            const img = new Image();
            img.src = languageImage;
    
            img.onerror = () => {
                // Si falla la imagen con idioma, intentar con la imagen por defecto
                setImageSrc(defaultImage);
    
                const fallbackImg = new Image();
                fallbackImg.src = defaultImage;
    
                fallbackImg.onerror = () => {
                    // Si también falla la imagen por defecto, mostrar el placeholder
                    setImageSrc(`${process.env.PUBLIC_URL}/img/placeholder.jpg`);
                };
            };
        };
        
        updateImageSrc();
    }, [currentArtwork.id, selectedLanguage]);

    return <img
        src={imageSrc}
        alt={currentArtwork.name[selectedLanguage]}
        onError={(e) => {
            e.target.src = `${process.env.PUBLIC_URL}/img/${currentArtwork.id}.jpg`;
            e.target.onerror = () => {
                e.target.src = `${process.env.PUBLIC_URL}/img/placeholder.jpg`;
            }
        }}
        className="transition-transform h-[50vh] duration-300 object-contain"
        style={{ transform: `translateX(${swipeOffset}px)` }
        } />;
};

export default ArtworkImage;
