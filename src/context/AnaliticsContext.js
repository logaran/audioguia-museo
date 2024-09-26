import React, { createContext, useEffect, useContext } from 'react';
import ReactGA from 'react-ga4'; // Usamos 'react-ga4' para GA4

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ trackingId, children }) => {
    useEffect(() => {
        if (!trackingId) {
            console.warn("Google Analytics tracking ID is not defined.");
            return;
        }

        // Inicializar Google Analytics 4
        ReactGA.initialize(trackingId);

        // Registrar la vista de la página inicial (opcional)
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
        
    }, [trackingId]);

    // Función para rastrear vistas de página
    const trackPageView = (path) => {
        if (!trackingId) return;
        ReactGA.send({ hitType: 'pageview', page: path });
    };

    // Función para rastrear eventos personalizados
    const trackEvent = (eventName, params) => {
        if (!trackingId) return;
        ReactGA.event(eventName, params); // Envía el evento a GA4
    };

    return (
        <AnalyticsContext.Provider value={{ trackPageView, trackEvent }}>
            {children}
        </AnalyticsContext.Provider>
    );
};

// Hook para usar el contexto en otros componentes
export const useAnalytics = () => {
    return useContext(AnalyticsContext);
};
