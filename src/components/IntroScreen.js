// Componente Hijo (IntroScreen)
import { languages } from './Languages'; // Importamos el array con idiomas y banderas
import appData from '../appData';

const IntroScreen = ({ toggleShowIntro, langSelect, selectedLanguage, setShowArtworksList, expositionData }) => {

  const handleStartClick = () => {
    toggleShowIntro(false);
    setShowArtworksList(true);
  }

  return (
    <div className="h-full flex items-center justify-center text-white p-8" style={{
      backgroundImage: `url(${expositionData.imageUrl})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <div className="h-full text-center flex flex-col items-center justify-evenly bg-gray-400 p-2 bg-opacity-70">


        <div>
          <h1 className="text-2xl font-chronicle mb-4">{appData.locals.museumName[selectedLanguage]}</h1>
          <h2 className='text-4xl uppercase'>{expositionData.name[selectedLanguage]}</h2>
          <p>{expositionData.description[selectedLanguage]}</p>
          <p>{expositionData.copy[selectedLanguage]}</p>
          <p>{expositionData.date[selectedLanguage]}</p>
          <h3 className="text-2xl mt-8">{appData.locals.appName[selectedLanguage]}</h3>
        </div>


        <div className="mb-4 flex flex-col w-full items-center justify-center cursor-pointer">
          <span className="text-lg mb-2">{selectedLanguage === 'es' ? 'Selecciona idioma' : 'Select language'}</span>
          <div className='flex w-40 justify-evenly items-center z-30'>
            <img src={languages[0].flag} alt={languages[0].name} className={`rounded-full ${selectedLanguage === 'es' ? 'w-12 h-12 border-2 border-white' : 'w-10 h-10'}`} onClick={() => langSelect('es')} />
            <img src={languages[1].flag} alt={languages[1].name} className={`rounded-full ${selectedLanguage === 'en' ? 'w-12 h-12 border-2 border-white' : 'w-10 h-10'}`} onClick={() => langSelect('en')} />
          </div>
        </div>

        <button
          onClick={handleStartClick}
          className="bg-white text-black px-4 py-2 w-24 rounded z-30"
        >
          {selectedLanguage === 'es' ? 'Empezar' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
