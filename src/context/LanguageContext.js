import React, {createContext, useContext, useState} from "react";

const LanguageContext = createContext();

export const useLanguage = ()=> (useContext(LanguageContext));

export const LanguageProvider = ({children}) => {
    const [selectedLanguage, setSelectedLanguage] = useState('es');

    return (
        <LanguageContext.Provider value={{selectedLanguage, setSelectedLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}