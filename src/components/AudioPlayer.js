import React from "react";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const AudioPlayer = ({ currentArtwork, currentIndex, showIntro, setShowIntro, showFavorites, artworks, setShowFavorites, setCurrentIndex, selectedLanguage, isMobile, isPlaying, ArtworkInfo, mediaRef, activeResourceUrl, setIsPlaying }) => {

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const isSwipe = useRef(false);
    const [swipeOffset, setSwipeOffset] = useState(0);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        setSwipeOffset(0);
        isSwipe.current = false;
      };
    
      const handleTouchMove = (e) => {
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
            handleSwipe('left');
          } else if (touchEndX.current - touchStartX.current > 50) {
            handleSwipe('right');
          }
        } else {
          togglePlayPause();
        }
        setSwipeOffset(0);
      };
    
      const handleSwipe = (direction) => {
        if (direction === 'right') {
          if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
          } else if (showIntro) {
            setShowIntro(false);
          } else if (showFavorites) {
            setShowFavorites(false);
          }
        } else if (direction === 'left') {
          if (currentIndex < artworks.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else if (!showFavorites) {
            setShowFavorites(true);
          }
        }
      };
    
      const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
      };

    return (
        <div className="relative h-full flex flex-col justify-between">
            <div className="relative h-full flex flex-col sm:flex-row sm:justify-evenly items-center justify-evenly w-auto pt-3">
                <ArtworkInfo artwok={currentArtwork} selectedLanguage={selectedLanguage} />

                {/* Controles de reproducción y pase de obras*/}
                <>
                    {/*Play*/}
                    <div
                        className={`absolute inset-0 flex h-full flex-col justify-between p-4 z-30 transition duration-300 ${isPlaying ? 'pointer-events-auto' : 'bg-black bg-opacity-60 pointer-events-auto'
                            }`}
                        onTouchStart={isMobile ? handleTouchStart : null}
                        onTouchMove={isMobile ? handleTouchMove : null}
                        onTouchEnd={isMobile ? handleTouchEnd : null}
                        onClick={!isMobile ? togglePlayPause : null}
                    >

                        {!isPlaying && (
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl z-30">
                                <Play color="white" size={64} />
                            </div>
                        )}
                    </div>

                    {/*Flechas*/}
                    {currentIndex !== 0 && (
                        <button
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl z-30"
                            onClick={() => handleSwipe('right')}
                        >
                            <ChevronLeft size={48} />
                        </button>
                    )}
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl z-30"
                        onClick={() => handleSwipe('left')}
                    >
                        <ChevronRight size={48} />
                    </button>
                </>

                <img
                    src={currentArtwork.imageUrl[selectedLanguage]}
                    alt={currentArtwork.name}
                    className="transition-transform h-[50vh] duration-300 object-contain"
                    style={{ transform: `translateX(${swipeOffset}px)` }}
                />


            </div>

            <audio
                ref={mediaRef}
                src={activeResourceUrl}
                onEnded={() => setIsPlaying(false)}
            />


        </div>
    );
};

export default AudioPlayer;