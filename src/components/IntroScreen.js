// Componente Hijo (IntroScreen)
import { languages } from './Languages'; // Importamos el array con idiomas y banderas

const IntroScreen = ({ toggleShowIntro, langSelect, selectedLanguage }) => {

  // Encontramos el idioma seleccionado en el array de idiomas

  return (
    <div className="h-full flex items-center justify-center bg-intro text-white p-8">
      <div className="h-full text-center flex flex-col items-center justify-evenly bg-gray-400 p-2 bg-opacity-70">
        <h1 className="text-2xl font-chronicle mb-4">Audioguía del Museo Carmen Thyssen Málaga</h1>

        <div className="mb-4 flex flex-col w-full items-center justify-center cursor-pointer">
          <span className="text-lg mb-2">Selecciona Idioma</span>
          <div className='flex w-40 justify-evenly items-center'> 
            <img src={languages[0].flag} alt={languages[0].name} className={`rounded-full ${selectedLanguage === 'es' ? 'w-12 h-12 border-2 border-white' : 'w-10 h-10'}`} onClick={()=>langSelect('es')} />
            <img src={languages[1].flag} alt={languages[1].name} className={`rounded-full ${selectedLanguage === 'en' ? 'w-12 h-12 border-2 border-white' : 'w-10 h-10'}`} onClick={()=>langSelect('en')} />
          </div>
        </div>

        <button
          onClick={() => toggleShowIntro()}
          className="bg-white text-black px-4 py-2 w-24 rounded"
        >
          Empezar
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
