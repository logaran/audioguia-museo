import React, { useState } from "react";
import { CircleX, Edit, Plus } from "lucide-react";
import { useArtworks } from "../context/ArtworksContext";
import { ArtworkNode } from "../types";
import { useNavigate } from "react-router-dom";
import ArtworkForm from "./ArtworkForm";

interface AdminControlsProps {
  artwork: ArtworkNode | undefined;
  artworks: { [key: string]: ArtworkNode };
  isEditMode: boolean;
  setIsEditMode: (editMode: boolean) => void;
}
const AdminControls = ({
  artwork,
  isEditMode,
  setIsEditMode,
}: AdminControlsProps) => {
  const { deleteArtwork, addOrUpdateArtwork } = useArtworks();
  const navigate = useNavigate();
  const [showArtworkForm, setShowArtworkForm] = useState(false);

  const handleDeleteClick = (
    event: React.MouseEvent<SVGSVGElement>,
    id: string
  ) => {
    event.stopPropagation();
    if (artwork?.next || artwork?.prev ) {
      deleteArtwork(id);
    }
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

  const handleAddClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    const generateUUID = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };

    const newId = generateUUID();
    const newArtwork = {
      name: {
        es: "",
        en: "",
      },
      author: "",
      date: "",
      description: "",
      id: newId,
    };

    const newArtworkData = {
      artwork: newArtwork,
      prev: artwork?.artwork.id,
      next: artwork?.next,
    };

    const formData = new FormData();
    formData.append("artwork", JSON.stringify(newArtworkData));
    addOrUpdateArtwork(formData);
  };
  return (
    <>
      {!isEditMode && (
        <div className="absolute flex gap-1 bottom-1 right-1 p-1 border border-cyan-300 rounded-md z-50">
          <Edit
            className="hover:text-blue-300 transition duration-200"
            onClick={(e) =>
              artwork && handleEditClick(e, artwork["artwork"].id)
            }
          />
          <Plus
            className="hover:text-green-600 transition duration-200"
            onClick={(e) => handleAddClick(e)}
          />
          <CircleX
            className="hover:text-red-600 transition duration-200"
            onClick={(e) =>
              artwork &&
              artwork["artwork"].id &&
              handleDeleteClick(e, artwork["artwork"].id)
            }
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
