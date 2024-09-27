import React, { useEffect, useState } from 'react';

const ThemeAdaptableImage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e) => {
            setIsDarkMode(e.matches);
        };

        // Inicializar el estado con la preferencia actual
        setIsDarkMode(mediaQuery.matches);
        
        // Agregar el listener
        mediaQuery.addEventListener('change', handleChange);

        // Cleanup listener on unmount
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return (
        <img
            src={isDarkMode 
                ? `${process.env.PUBLIC_URL}/img/ColaboratorLogoDark.png` 
                : `${process.env.PUBLIC_URL}/img/ColaboratorLogoLight.png`}
            className="max-w-28 transition-all duration-300" // Agregar transición
            alt="Logo de entidad colaboradora"
        />
    );
};

export default ThemeAdaptableImage;
