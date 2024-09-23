import React from 'react';

const ArtworkThumbnail = ({ artwork, selectedLanguage, setIndex, showList, selectedIndex }) => {
    const handleClick = (index) => {
        setIndex(selectedIndex);
        showList(false);
    }
    return (
        <div
            className="flex items-center p-4 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
            onClick={handleClick}
        >
            <img src={`${process.env.PUBLIC_URL}/img/${artwork.id}${selectedLanguage}.jpg`} 
            onError={(e) => {
              e.target.src = `${process.env.PUBLIC_URL}/img/${artwork.id}.jpg`;
              e.target.onerror = () => {
                e.target.src = `${process.env.PUBLIC_URL}/img/placeholder.jpg`;
              };
            }} alt={artwork.name[selectedLanguage]} className="w-16 h-16 rounded mr-4" /> {/* Miniatura */}
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{artwork.name[selectedLanguage]}</h3> {/* Título */}
                <p className="text-lg text-gray-600">{artwork.description}</p> {/* Descripción */}
            </div>
        </div>
    );
};

export default ArtworkThumbnail;
