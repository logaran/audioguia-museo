import React from 'react';
import { usePlayback } from '../context/PlaybackContext';
import { Play } from 'lucide-react';

const PlayIcon = () => {
  const { isPlaying } = usePlayback();

  return !isPlaying ? (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl z-30">
      <Play color="white" size={64} />
    </div>
  ) : null; // Retorna null si está reproduciendo
};

export default PlayIcon;