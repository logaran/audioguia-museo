import React, { createContext, useEffect, useContext } from "react";
import ReactGA from "react-ga4";
import { AnalitycsContextValue, AnalyticsEvent } from "../types";

const AnalyticsContext = createContext<AnalitycsContextValue | undefined>(
  undefined
);


export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics debe usarse dentro de un AnalyticsProvider");
  }
  return context;
};

interface AnalyticsProviderProps extends React.PropsWithChildren<{}> {
  trackingId?: string;
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
  const trackEvent = (event: AnalyticsEvent) => {
    if (!trackingId) return;
    ReactGA.event(event); // Envía el evento a GA4
  };
  const analyticsEvents = {
    FAVORITE_MARK: (itemName: string) => ({
      eventName: "Artwork Liked",
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


