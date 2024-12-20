import React from 'react';

import { languages } from './Languages'; // Importamos el array con idiomas y banderas
import appData from '../config/appConfig';
import ThemeAdaptableImage from './ThemeAdaptableImage';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useArtworks } from '../context/ArtworksContext';

interface IntroScreenProps {
  isDarkMode: boolean;
}

const IntroScreen:React.FC<IntroScreenProps> = ({ isDarkMode }: IntroScreenProps) => {
  const navigate = useNavigate();
  const {selectedLanguage, setSelectedLanguage} = useLanguage();
  const {expositionData} = useArtworks();
  const handleStartClick = () => {
    navigate('/list');
  }

  return (
    <div
      className="h-full flex items-center justify-center p-8 sm:p-2 text-gray-800 bg-white dark:bg-gray-900 overflow-hidden" // Fondos para modo claro y oscuro
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}${expositionData?.imageUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "160%",
      }}
    >
      <div className="h-[80dvh] sm:h-[40dvh] sm:w-[80dvw] text-center flex flex-col sm:flex-row lg:items-center items-center justify-evenly bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-90 p-2 rounded-lg">

        <div className='flex flex-col sm:w-4/5 sm:h-1/2 items-center sm:justify-between gap-2'>
          {/* <h1 className="text-2xl font-chronicle text-gray-900 dark:text-gray-100">{appData.locals.museumName[selectedLanguage]}</h1> */}
        { expositionData &&  <div className='flex flex-col items-center'>
            <h2 className='text-4xl uppercase text-gray-900 dark:text-gray-100'>{expositionData.name[selectedLanguage]}</h2>
            <p className="text-gray-800 dark:text-gray-200">{expositionData.description[selectedLanguage]}</p> {/* Colores de texto */}
            <p className="text-gray-800 dark:text-gray-200">{expositionData.date[selectedLanguage]}</p>
            <p className="text-sm text-gray-800 dark:text-gray-200 mt-3">{expositionData.copy[selectedLanguage]}</p>
            <ThemeAdaptableImage isDarkMode={isDarkMode} />
          </div>}
          <h3 className="text-2xl text-gray-900 dark:text-gray-100">{appData.locals.appName[selectedLanguage] || "Esto no pirula"}</h3>
        </div>

        <div className="mb-4 sm:w-2/5 sm:h-1/2 flex flex-col items-center justify-center sm:justify-between cursor-pointer">
          <span className="text-lg mb-2 text-gray-800 dark:text-gray-200">{selectedLanguage === 'es' ? 'Selecciona idioma' : 'Select language'}</span>
          <div className='flex w-40 justify-evenly items-center z-30'>
            <img
              src={languages.es.flag()}
              alt={languages.es.name}
              title={languages.en.name}
              className={`rounded-full ${selectedLanguage === 'es' ? 'w-12 h-12 border-2 border-gray-800 dark:border-gray-100' : 'w-10 h-10'}`}
              onClick={() => setSelectedLanguage('es')}
            />
            <img
              src={languages.en.flag()}
              alt={languages.en.name}
              title={languages.en.name}
              className={`rounded-full ${selectedLanguage === 'en' ? 'w-12 h-12 border-2 border-gray-800 dark:border-gray-100' : 'w-10 h-10'}`}
              onClick={() => setSelectedLanguage('en')}
            />
          </div>
          <button
            onClick={handleStartClick}
            className="bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 w-24 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300 mt-4"
          >
            {selectedLanguage === 'es' ? 'Empezar' : 'Start'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default IntroScreen;
