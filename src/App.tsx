import React, { useState, useEffect } from "react";
import AudioGuideApp from "./components/AudioGuideApp";
import { ArtworksProvider } from "./context/ArtworksContext";
import { AnalyticsProvider } from "./context/AnaliticsContext";
import { PlaybackProvider } from "./context/PlaybackContext";
import { LanguageProvider } from "./context/LanguageContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { GesturesProvider } from "./context/GesturesContext";
import { useLocation } from "react-router-dom";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token: string | null = queryParams.get("admin");

    if (token === "esto-pirula") {
      setIsAdmin(true);
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize(); // Inicializa al cargar
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div style={{ height: "100dvh", width: "100dvw" }}>
      <AnalyticsProvider trackingId={trackingId}>
        <LanguageProvider>
          <ArtworksProvider>
            <FavoritesProvider>
              <PlaybackProvider>
                <GesturesProvider>
                  <AudioGuideApp
                    isMobile={isMobile}
                    isDarkMode={isDarkMode}
                    isAdmin={isAdmin}
                  />
                </GesturesProvider>
              </PlaybackProvider>
            </FavoritesProvider>
          </ArtworksProvider>
        </LanguageProvider>
      </AnalyticsProvider>
    </div>
  );
}

export default App;
