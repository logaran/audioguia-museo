import { useEffect } from 'react';

const BackButtonHandler = ({ onBack }) => {
    useEffect(() => {
        const handlePopState = (event) => {
            // Llama a la función onBack cuando se detecta un evento popstate
            if (onBack) {
                onBack();
            }
        };

        window.addEventListener('popstate', handlePopState);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [onBack]);

    return null; // Este componente no necesita renderizar nada
};

export default BackButtonHandler;
