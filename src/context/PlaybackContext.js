import React, { createContext, useContext, useState } from "react";

const PlaybackContext = createContext();

export const usePlayback = ()=>{
    return useContext(PlaybackContext);
}

export const PlaybackProvider = ({ children })=>{
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = ()=>{
        setIsPlaying((prev) => {
            return !prev});
    };

    return (
        <PlaybackContext.Provider value={{ isPlaying, setIsPlaying, togglePlayPause }} >
            {children}
        </PlaybackContext.Provider>
    )
}