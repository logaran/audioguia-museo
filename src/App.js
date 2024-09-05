import React from 'react';
import { useState, useEffect } from 'react';
import AudioGuideApp from './AudioGuideApp';


function App() {
  
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);   


    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App" style={{ height:   
      viewportHeight }}>
      <AudioGuideApp />
    </div>
  );
}

export default App;