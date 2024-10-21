import React from "react";
import { Facebook, Twitter, MessageCircle, Send } from "lucide-react";

interface ShareComponentProps {
  url: string;
  title: string;
}
const ShareComponent: React.FC<ShareComponentProps> = ({
  url,
  title,
}: ShareComponentProps) => {

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        console.error("Error al compartir: ", error);
      }
    } else {
      console.log("Compartir no esta soportado en tu navegador");
    }
  };
  return (
    <div className="flex space-x-3">
      <button
        onClick={handleShare}
        className="flex items-center bg-gray-200 dark:bg-transparent p-2 rounded hover:bg-gray-300"
      >
        <Send size={24} />
        <span className="hidden xs:inline">Compartir</span>
      </button>
    </div>
  );
};

export default ShareComponent;
