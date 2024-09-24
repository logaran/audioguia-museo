import React, { useEffect, useState } from 'react';

const ThemeAdaptableImage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const handleChange = (e) => {
            setIsDarkMode(e.matches);
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleChange);

        setIsDarkMode(mediaQuery.matches);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return (
        <img
            src={isDarkMode ? `${process.env.PUBLIC_URL}/img/colaboratorLogoDark.png` : `${process.env.PUBLIC_URL}/img/colaboratorLogoLight.png`}
            className="max-w-28 mix-blend-multiply"
            alt="Logo de entidad colaboradora"
        />
    );
};

export default ThemeAdaptableImage;
