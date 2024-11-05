import React, { useState } from "react";
import { CircleX, Edit, Plus } from "lucide-react";
import { useArtworks } from "../context/ArtworksContext";
import { Artwork } from "../types";
import { useNavigate } from "react-router-dom";
import ArtworkForm from "./ArtworkForm";

interface AdminControlsProps {
  artwork: Artwork | undefined;
  isEditMode: boolean;
  setIsEditMode: (editMode: boolean) => void;
}
const AdminControls = ({
  artwork,
  isEditMode,
  setIsEditMode,
}: AdminControlsProps) => {
  const { deleteArtwork, putArtwork: addOrUpdateArtwork } = useArtworks();
  const navigate = useNavigate();
  const [showArtworkForm, setShowArtworkForm] = useState(false);

  const handleDeleteClick = (
    event: React.MouseEvent<SVGSVGElement>,
    id: string
  ) => {
    event.stopPropagation();
    deleteArtwork(id);
    navigate("/list");
  };

  const handleEditClick = (
    event: React.MouseEvent<SVGSVGElement>,
    id: string
  ) => {
    event.stopPropagation();
    setIsEditMode(true);
    setShowArtworkForm(true);
  };

  return (
    <>
      {!isEditMode && (
        <div className="absolute flex gap-1 bottom-1 right-1 p-1 border border-cyan-300 rounded-md z-50">
          <Edit
            className="hover:text-blue-300 transition duration-200"
            onClick={(e) => artwork && handleEditClick(e, artwork.id)}
          />
          <Plus className="hover:text-green-600 transition duration-200" />
          <CircleX
            className="hover:text-red-600 transition duration-200"
            onClick={(e) => artwork?.id && handleDeleteClick(e, artwork.id)}
          />
        </div>
      )}
      {showArtworkForm && artwork && (
        <ArtworkForm
          onSubmit={addOrUpdateArtwork}
          existingArtwork={artwork}
          setIsEditMode={setIsEditMode}
          setShowArtworkForm={setShowArtworkForm}
        />
      )}
    </>
  );
};

export default AdminControls;
