import React, {createContext, useContext, useState} from "react";
import { LanguageCodes, LanguageContextValue } from "../types";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const useLanguage = ()=> {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error ("LanguageContext debe usarse dentro de un LanguageContextProvider");
    }
    return context;
}

export const LanguageProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCodes>('es');

    return (
        <LanguageContext.Provider value={{selectedLanguage, setSelectedLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}