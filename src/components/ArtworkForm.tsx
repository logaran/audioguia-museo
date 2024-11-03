import React, { useState, useEffect } from "react";
import { Artwork } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { Check, Edit } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

interface ArtworkFormProps {
  existingArtwork?: Artwork; // Objeto de la obra existente para editar
  onSubmit: (formData: FormData) => void; // Callback para manejar el envío
  setIsEditMode: (editMode: boolean) => void;
  setShowArtworkForm: (show: boolean) => void;
}

const ArtworkForm: React.FC<ArtworkFormProps> = ({
  existingArtwork,
  onSubmit,
  setIsEditMode,
  setShowArtworkForm,
}) => {
  const { selectedLanguage } = useLanguage();
  // Estado para los campos del formulario
  const [nameEs, setNameEs] = useState(
    existingArtwork ? existingArtwork.name.es : ""
  );
  const [nameEn, setNameEn] = useState(
    existingArtwork ? existingArtwork.name.en : ""
  );
  const [author, setAuthor] = useState(
    existingArtwork ? existingArtwork.author : ""
  );
  const [date, setDate] = useState(existingArtwork ? existingArtwork.date : "");
  const [description, setDescription] = useState(
    existingArtwork ? existingArtwork.description : ""
  );
  const [imageFileEs, setImageFileEs] = useState<File | null>(null);
  const [imageFileEn, setImageFileEn] = useState<File | null>(null);
  const [previewEs, setPreviewEs] = useState<string | null>(
    existingArtwork
      ? `${process.env.PUBLIC_URL}/img/es/${existingArtwork.id}.jpg`
      : null
  );
  const [previewEn, setPreviewEn] = useState<string | null>(
    existingArtwork
      ? `${process.env.PUBLIC_URL}/img/en/${existingArtwork.id}.jpg`
      : null
  );
  const [audioFileEs, setAudioFileEs] = useState<File | null>(null);
  const [audioFileEn, setAudioFileEn] = useState<File | null>(null);
  const [audioPreviewEs, setAudioPreviewEs] = useState<string | null>(
    `${process.env.PUBLIC_URL}/audios/es/${existingArtwork?.id}.mp3`
  );
  const [audioPreviewEn, setAudioPreviewEn] = useState<string | null>(
    `${process.env.PUBLIC_URL}/audios/en/${existingArtwork?.id}.mp3`
  );

  useEffect(() => {
    setPreviewEs(
      imageFileEs
        ? URL.createObjectURL(imageFileEs)
        : `/img/es/${existingArtwork?.id}.jpg`
    );
    setAudioPreviewEs(
      audioFileEs
        ? URL.createObjectURL(audioFileEs)
        : `${process.env.PUBLIC_URL}/audios/es/${existingArtwork?.id}.mp3`
    );
    setPreviewEn(
      imageFileEn
        ? URL.createObjectURL(imageFileEn)
        : `/img/en/${existingArtwork?.id}.jpg`
    );
    setAudioPreviewEn(
      audioFileEn
        ? URL.createObjectURL(audioFileEn)
        : `${process.env.PUBLIC_URL}/audios/en/${existingArtwork?.id}.mp3`
    );
  }, [
    selectedLanguage,
    imageFileEn,
    imageFileEs,
    audioFileEn,
    audioFileEs,
    existingArtwork,
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    selectedLanguage === "es" ? setImageFileEs(file) : setImageFileEn(file);
  };

  const handleImageClick = () => {
    document.getElementById("imageUpload")?.click(); // Abre el selector de archivos
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    selectedLanguage === "es" ? setAudioFileEs(file) : setAudioFileEn(file);
  };

  const handleAudioClick = () => {
    document.getElementById("audioUpload")?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const artwork: Artwork = {
      name: {
        es: nameEs,
        en: nameEn,
      },
      author,
      date,
      description,
      id: existingArtwork ? existingArtwork.id : Date.now().toString(), // Generar un nuevo ID si es una nueva obra
    };

    const formData = new FormData();
    formData.append("artwork", JSON.stringify(artwork));
    if (imageFileEs) formData.append("imageFileEs", imageFileEs);
    if (imageFileEn) formData.append("imageFileEn", imageFileEn);
    if (audioFileEs) formData.append("audioFileEs", audioFileEs);
    if (audioFileEn) formData.append("audioFileEn", audioFileEn);
    
    onSubmit(formData);
    setIsEditMode(false);
    setShowArtworkForm(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute inset-0 bg-white flex space-y-1 p-1 gap-1.5 rounded-sm z-50"
    >
      <div className="flex flex-col flex-grow space-y-1">
        {selectedLanguage === "es" && (
          <input
            className="p-0.5 rounded-md border border-gray-400"
            type="text"
            placeholder="Nombre (es)"
            value={nameEs}
            onChange={(e) => setNameEs(e.target.value)}
            required
          />
        )}
        {selectedLanguage === "en" && (
          <input
            className="p-0.5 rounded-md border border-gray-400"
            type="text"
            placeholder="Name (en)"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            required
          />
        )}
        <input
          className="p-0.5 rounded-md border border-gray-400"
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          className="p-0.5 rounded-md border border-gray-400"
          type="text"
          placeholder="Fecha"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          className="p-0.5 rounded-md border border-gray-400"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioChange}
          id="audioUpload"
          style={{ display: "none" }}
        />
        <div className="flex">
          <audio className="h-8" controls src={selectedLanguage === 'es' ? audioPreviewEs || undefined : audioPreviewEn || undefined} />
          <button
            type="button"
            onClick={handleAudioClick}
            className="change-audio-btn"
          >
            <Edit stroke="lightgrey" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between items-center p-2">
        <div className="relative w-14 rounded">
          <input
            type="file"
            accept="image/jpg"
            onChange={handleFileChange}
            id="imageUpload"
            style={{ display: "none" }}
          />
          <img
            src={selectedLanguage === 'es' ? previewEs || undefined : previewEn || undefined }
            alt="Vista previa"
            className=""
            onClick={handleImageClick}
          />
          <Edit stroke="lightgrey" className="absolute bottom-1 right-1" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center rounded-full">
            <LanguageSwitcher />
          </div>
          <button type="submit" className="bg-green-500 text-white rounded">
            <Check />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ArtworkForm;
