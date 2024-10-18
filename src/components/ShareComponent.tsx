import React from 'react';
import { Facebook, Twitter, MessageCircle, Send } from 'lucide-react';

interface ShareComponentProps {
    url: string;
    title: string;
}
const ShareComponent: React.FC<ShareComponentProps> = ({ url, title }: ShareComponentProps) => {
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
        }, {
            icon: <Send size={24} />,
            url: `https://t.me/share/url?url=${encodedURL}&text=${encodedTitle}`,
            label: 'Telegram'
        }
    ];

    return (
        <div className="flex space-x-3">
            {shareOptions.map((option, index) => (
                <a
                    key={index}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-200 dark:bg-transparent p-2 rounded hover:bg-gray-300"
                >
                    {option.icon}
                    <span className="hidden sm:inline">{option.label}</span>
                </a>
            ))}

        </div>
    );
};

export default ShareComponent;
