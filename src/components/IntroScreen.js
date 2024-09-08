// Componente Hijo (IntroScreen)
import { languages } from './Languages'; // Importamos el array con idiomas y banderas

const IntroScreen = ({ toggleShowIntro, langSelect, selectedLanguage, setShowArtworksList }) => {

  const handleStartClick = () => {
    toggleShowIntro(false);
    setShowArtworksList(true);
  }

  return (
    <div className="h-full flex items-center justify-center bg-intro text-white p-8">
      <div className="h-full text-center flex flex-col items-center justify-evenly bg-gray-400 p-2 bg-opacity-70">
        {selectedLanguage === 'es' ?

          <div>
            <h1 className="text-2xl font-chronicle mb-4">Museo Carmen Thyssen Málaga</h1>
            <h2 className='text-4xl uppercase'>Modernidad Latente</h2>
            <p>Vanguardistas y renovadores en la figuración española (1920-1970).</p>
            <p>Colección Telefónica</p>
            <p>Del 16 de marzo al 08 de septiembre de 2024</p>
            <h3 className="text-2xl mt-8">Audioguía</h3>
          </div>
          :
          <div>
            <h1 className="text-2xl font-chronicle mb-4">Museo Carmen Thyssen Málaga</h1>
            <h2 className='text-4xl uppercase'>Latent Modernity</h2>
            <p>Avant-garde and Innovative Painters in Spanish Figurative Art (1920–1970).</p>
            <p>Telefónica Collection</p>
            <p>From March 16 to September 08, 2024</p>
            <h3 className="text-2xl mt-8">Audioguide</h3>
          </div>
         
         }

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
          {selectedLanguage === 'es'? 'Empezar' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
