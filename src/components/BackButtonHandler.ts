import { useEffect } from 'react';

interface BackButtonHandlerProps {
    onBack?: ()=> void;
}

const BackButtonHandler: React.FC<BackButtonHandlerProps> = ({ onBack }: BackButtonHandlerProps) => {
    useEffect(() => {
        const handlePopState = (event: Event) => {
            console.log("has pulsado atras, truhan!!!");
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
