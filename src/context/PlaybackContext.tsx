import React, { createContext, useContext, useState } from "react";
import { PlayBackContextValue } from "../types";

const PlaybackContext = createContext<PlayBackContextValue | undefined>(
  undefined
);

export const usePlayback = () => {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error(
      "usePlayBack ha de ejecutarse dentro de un PlayBackProvider"
    );
  }
  return context;
};

export const PlaybackProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      return !prev;
    });
  };

  return (
    <PlaybackContext.Provider
      value={{ isPlaying, setIsPlaying, togglePlayPause }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};
