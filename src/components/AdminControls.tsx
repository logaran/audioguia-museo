import React from "react";
import { CircleX } from "lucide-react";
import { useArtworks } from "../context/ArtworksContext";
import { Artwork } from '../types';

interface AdminControlsProps {
    artwork: Artwork | undefined,
}
const AdminControls = ({artwork}: AdminControlsProps) =>{
    const {deleteArtwork} = useArtworks();
    const handleDeleteClick = (event: React.MouseEvent<SVGSVGElement> ,id: string) => {
        event.stopPropagation();
        deleteArtwork(id);
      };
    
    return (
        <div className="absolute top-1 right-1 p-1 border-2 rounded-md">
        <CircleX
          fill="grey"
          onClick={(e) => artwork?.id && handleDeleteClick(e, artwork.id)}
        />
      </div>
    )
}

export default AdminControls;