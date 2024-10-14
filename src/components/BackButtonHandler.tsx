import { useEffect } from 'react';

interface BackButtonHandlerProps {
    onBack?: ()=> void;
}

const BackButtonHandler: React.FC<BackButtonHandlerProps> = ({ onBack }: BackButtonHandlerProps) => {
    useEffect(() => {
        const handlePopState = (event: Event) => {
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
