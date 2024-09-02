// Componente Hijo (IntroScreen)
import { languages } from './Languages'; // Importamos el array con idiomas y banderas
import ResourceSelector from './ResourceSelector';



const IntroScreen = ({ toggleShowIntro, selectedLanguage, setSelectedResource, selectedResource, toggleShowLangSelector }) => {
  
  // Encontramos el idioma seleccionado en el array de idiomas
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="h-full flex items-center justify-center bg-intro text-white p-8">
        <div className="h-full text-center flex flex-col justify-evenly bg-gray-400 p-2 bg-opacity-70">
          <h1 className="text-4xl font-chronicle mb-4">Bienvenido a la Audioguía del Museo Carmen Thyssen Málaga</h1>

          <ResourceSelector setResource={setSelectedResource} selectedResource={selectedResource} />

          {/* Texto y Icono para cambiar el idioma */}
          <div className="mb-4 flex flex-col items-center justify-center cursor-pointer" onClick={toggleShowLangSelector}>
            <span className="text-lg mb-2">Cambiar idioma</span>
            <img src={currentLanguage.flag} alt={currentLanguage.name} className="w-10 h-10 rounded-full" />
          </div>

          <button
            onClick={() => toggleShowIntro()}
            className="bg-white text-black px-4 py-2 rounded"
          >
            Empezar
          </button>
        </div>
    </div>
  );
};

export default IntroScreen;
