import React from 'react';

const ResourceSelector = ({ setResource, selectedResource }) => {
    const selectedResourceName = selectedResource === 'audioUrl' ? ' Audio guía' : selectedResource === 'audiodescriptionUrl' ? 'Audio descripción' : 'Lenguaje de signos';
    return (
        <>

            <div className="flex flex-wrap justify-evenly mb-4">
                <span className='w-full text-lg mb-2'>{selectedResourceName}</span>
                <div className="cursor-pointer" onClick={() => setResource('audioUrl')}>
                    <img src='/icons/ico-audioguia.jpg' alt='audioguía' className={selectedResource === 'audioUrl' ? "w-14 h-14 rounded-full p-2 bg-white border-2 border-cyan-400" : "w-10 h-10 p-2 rounded-full bg-white"} />
                </div>
                <div className="cursor-pointer" onClick={() => setResource('audiodescriptionUrl')}>
                    <img src='/icons/ico-audiodescripcion.jpg' alt='audio descripción' className={selectedResource === 'audiodescriptionUrl' ? "w-14 h-14 rounded-full p-2 bg-white border-2 border-cyan-400" : "w-10 h-10 p-2 rounded-full bg-white"} />
                </div>
                <div className="cursor-pointer" onClick={() => setResource('signLanguageUrl')}>
                    <img src='/icons/ico-signos.jpg' alt='lenguaSignos' className={selectedResource === 'signLanguageUrl' ? "w-14 h-14 rounded-full p-2 bg-white border-2 border-cyan-400" : "w-10 h-10 p-2 rounded-full bg-white"} />
                </div>
            </div>
        </>
    );
};

export default ResourceSelector;
