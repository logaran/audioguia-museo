import { AppData } from "../types";

const appData: AppData = {
    locals: {
        museumName: {
            es: "Museo Carmen Thyssen Málaga",
            en: "Museo Carmen Thyssen Málaga",
        },
        appName: {
            es: "Audioguía",
            en: "Audioguide",
        },
        startButton: {
            es: "Empezar",
            en: "Start",
        },
        backButton: {
            es: "Volver a la audioguía",
            en: "Back to audioguide",
        },
        shareText: {
            es: "Comparte tus obras favoritas",
            en: "Share your favourite artworks",
        },
    },
    apiUrl: "http://localhost:8000/api/"
};

export default appData; // Asegúrate de que esta línea tenga el punto y coma
