import React from 'react';

const ResourceSelector = ({ setResource, selectedResource }) => {
    return (
        <>
            <span className='text-lg mb-2'>Selecciona tu guía</span>

            <div className="flex justify-around mb-4">
                <div className="mb-4 flex flex-col items-center justify-center cursor-pointer" onClick={() => setResource('audioUrl')}>
                    <img src='/icons/audio-guia.png' alt='audioguía' className={selectedResource === 'audioUrl' ? "w-14 h-14 rounded-full p-2 bg-green-600" : "w-10 h-10 p-2 rounded-full bg-white"} />
                </div>
                <div className="mb-4 flex flex-col items-center justify-center cursor-pointer" onClick={() => setResource('audiodescriptionUrl')}>
                    <img src='/icons/audio-descripcion.png' alt='audio descripción' className={selectedResource === 'audiodescriptionUrl' ? "w-14 h-14 rounded-full p-2 bg-green-600" : "w-10 h-10 p-2 rounded-full bg-white"} />
                </div>
                <div className="mb-4 flex flex-col items-center justify-center cursor-pointer" onClick={() => setResource('signLanguageUrl')}>
                    <img src='/icons/lengua-signos.png' alt='lenguaSignos' className={selectedResource === 'signLanguageUrl' ? "w-14 h-14 rounded-full p-2 bg-green-600" : "w-10 h-10 p-2 rounded-full bg-white"} />
                </div>
            </div>
        </>
    );
};

export default ResourceSelector;
