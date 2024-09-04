import React from 'react';
import { Facebook, Twitter, MessageCircle, CopyIcon } from 'lucide-react'; // Asegúrate de tener estos iconos o usa otros

const ShareComponent = ({ url, title }) => {
    const encodedURL = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareOptions = [
        {
            icon: <Facebook size={24} />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
            label: 'Facebook'
        },
        {
            icon: <Twitter size={24} />,
            url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`,
            label: 'Twitter'
        },
        {
            icon: <MessageCircle size={24} />,
            url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedURL}`,
            label: 'WhatsApp'
        }
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        alert('Enlace copiado al portapapeles');
    };

    return (
        <div className="flex space-x-4">
            {shareOptions.map((option, index) => (
                <a
                    key={index}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gray-200 p-2 rounded hover:bg-gray-300"
                >
                    {option.icon}
                    <span className="hidden sm:inline">{option.label}</span>
                </a>
            ))}
            <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 bg-gray-200 p-2 rounded hover:bg-gray-300"
            >
                <CopyIcon size={24} />
                <span className="hidden sm:inline">Copiar enlace</span>
            </button>
        </div>
    );
};

export default ShareComponent;
