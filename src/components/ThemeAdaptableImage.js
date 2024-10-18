const ThemeAdaptableImage = ({isDarkMode}) => {
   
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
