import React, { useEffect, useRef } from 'react';

const AudioProgressBar = ({ audioRef, isPlaying, duration, currentTime, onSeek }) => {
    const progressBarRef = useRef(null);

    useEffect(() => {
        // Actualizar la barra de progreso cuando cambie el tiempo actual
        if (progressBarRef.current) {
            progressBarRef.current.value = (currentTime / duration) * 100;
        }
    }, [currentTime, duration]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        // Calcular el nuevo tiempo en función del valor del slider
        const newTime = (value / 100) * duration;
        onSeek(newTime); // Llamar a la función onSeek para actualizar el tiempo del audio
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="range"
                ref={progressBarRef}
                min="0"
                max="100"
                onChange={handleInputChange}
                className="w-full"
                style={{ appearance: 'none' }} // Estilo personalizado para la barra
            />
            <div className="flex justify-between w-full text-xs">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
};

// Función para formatear el tiempo en formato MM:SS
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default AudioProgressBar;
