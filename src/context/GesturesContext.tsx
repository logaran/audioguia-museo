import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { usePlayback } from "./PlaybackContext";
import { useArtworks } from "./ArtworksContext";
import { Direction, GesturesContextValue } from "../types";

const GesturesContext = createContext<GesturesContextValue | undefined>(
  undefined
);
export const useGestures = () => {
  const context = useContext(GesturesContext);
  if (!context) {
    throw new Error("useGestures debe usarse dentro de un GesturesProvider");
  }
  return context;
};

export const GesturesProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwipe = useRef(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const { togglePlayPause, setIsPlaying } = usePlayback();
  const { next, prev, currentArtworkNode } = useArtworks();
  const navigate = useNavigate();

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setSwipeOffset(0);
    isSwipe.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    const offset = touchEndX.current - touchStartX.current;
    setSwipeOffset(offset);
    if (Math.abs(offset) > 10) {
      isSwipe.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (isSwipe.current) {
      if (touchStartX.current - touchEndX.current > 50) {
        handleSwipe("left");
      } else if (touchEndX.current - touchStartX.current > 50) {
        handleSwipe("right");
      }
    } else {
      togglePlayPause();
    }
    setSwipeOffset(0);
  };

  const handleSwipe = (direction: Direction) => {
    const newArtworkNode = currentArtworkNode;
    if (direction === "right") {
      if (!newArtworkNode?.prev) {
        navigate("/intro");
      } else {
        const newArtworkId = prev();
        navigate(`/guide/?id=${newArtworkId}`);
        setIsPlaying(false);
      }
    } else if (direction === "left") {
      if (!newArtworkNode?.next) {
        navigate("/favorites");
      } else {
        const newArtworkId = next();
        navigate(`/guide/?id=${newArtworkId}`);
        setIsPlaying(false);
      }
    }
  };

  return (
    <GesturesContext.Provider
      value={{
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleSwipe,
        swipeOffset,
      }}
    >
      {children}
    </GesturesContext.Provider>
  );
};
