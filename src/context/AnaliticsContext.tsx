import React, { createContext, useEffect, useContext } from "react";
import ReactGA from "react-ga4";
import { AnalitycsContextValue } from "../types";

const AnalyticsContext = createContext<AnalitycsContextValue | undefined>(
  undefined
);

interface AnalyticsProviderProps extends React.PropsWithChildren<{}> {
  trackingId: string;
}

export const AnalyticsProvider = ({
  trackingId,
  children,
}: AnalyticsProviderProps) => {
  useEffect(() => {
    if (!trackingId) {
      console.warn("Google Analytics tracking ID is not defined.");
      return;
    }

    ReactGA.initialize(trackingId);

    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
  }, [trackingId]);

  const trackPageView = (path: string) => {
    if (!trackingId) return;
    ReactGA.send({ hitType: "pageview", page: path });
  };

  // Función para rastrear eventos personalizados
  const trackEvent = (eventName: string, params: Record<string,string>) => {
    if (!trackingId) return;
    ReactGA.event(eventName, params); // Envía el evento a GA4
  };
  const analyticsEvents = {
    FAVORITE_MARK: (itemName: string) => ({
      category: "Audioguide",
      action: "Liked",
      label: itemName,
      timestamp: new Date().toISOString(),
    }),
  };

  return (
    <AnalyticsContext.Provider
      value={{ trackPageView, trackEvent, analyticsEvents }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useAnalytics = () => {
  return useContext(AnalyticsContext);
};
