<?php

class GuideController
{
    private $dataDir;
    public function __construct(string $dataDir)
    {
        $this->dataDir = rtrim($dataDir, '/') . '/';
    }

    private function readGuideFile(string $guideName): ?array
    {
        $filePath = "{$this->dataDir}{$guideName}.json";

        if (!file_exists($filePath)) {
            return null;
        }

        $data = file_get_contents($filePath);
        return json_decode($data, true) ?: null;
    }

    private function saveGuideFile(string $guideName, array $guideData): void
    {
        $filePath = "{$this->dataDir}{$guideName}.json";
        error_log(json_encode($guideData, JSON_PRETTY_PRINT));
        file_put_contents($filePath, json_encode($guideData, JSON_PRETTY_PRINT));
    }

    // Listar todas las guías
    public function listGuides(): array
    {
        $guides = [];
        foreach (glob($this->dataDir . '*.json') as $filepath) {
            $guide = json_decode(file_get_contents($filepath), true);
            if ($guide) {
                $guides[] = $guide;
            }
        }
        return $guides;
    }

    public function getGuide(string $guideName): ?array
    {
        return $this->readGuideFile($guideName);
    }


    // Eliminar obra de la guía

    public function deleteArtwork($id, string $guideName): bool
    {
        $guideData = $this->readGuideFile($guideName);
        $oldImageFileEs = "{$this->dataDir}images/es/{$id}.jpg";
        $oldImageFileEn = "{$this->dataDir}images/en/{$id}.jpg";
        $oldAudioFileEs = "{$this->dataDir}audios/es/{$id}.mp3";
        $oldAudioFileEn = "{$this->dataDir}audios/en/{$id}.mp3";
    
        // Inicializar los flags de eliminación
        $artworkDeleted = true;
        $filesDeleted = true;
    
        if (!isset($guideData['artworks'][$id])) {
            return false;
        }
    
        $artworkToDelete = $guideData['artworks'][$id];
        $prevId = $artworkToDelete['prev'];
        $nextId = $artworkToDelete['next'];
    
        // Actualizar las relaciones de los artworks vecinos
        if ($prevId !== null && isset($guideData['artworks'][$prevId])) {
            $guideData['artworks'][$prevId]['next'] = $nextId;
        }
    
        if ($nextId !== null && isset($guideData['artworks'][$nextId])) {
            $guideData['artworks'][$nextId]['prev'] = $prevId;
        }
    
        // Eliminar el artwork
        unset($guideData['artworks'][$id]);
        $artworkDeleted = true;  // Si llegamos aquí es porque el artwork fue eliminado de la estructura
    
        // Eliminar los archivos asociados si existen
        if (file_exists($oldAudioFileEs)) {
            if (!unlink($oldAudioFileEs)) {
                $filesDeleted = false;
            }
        }
        if (file_exists($oldAudioFileEn)) {
            if (!unlink($oldAudioFileEn)) {
                $filesDeleted = false;
            }
        }
        if (file_exists($oldImageFileEs)) {
            if (!unlink($oldImageFileEs)) {
                $filesDeleted = false;
            }
        }
        if (file_exists($oldImageFileEn)) {
            if (!unlink($oldImageFileEn)) {
                $filesDeleted = false;
            }
        }
    
        // Guardar el archivo de guía después de la eliminación
        if ($artworkDeleted && $filesDeleted) {
            $this->saveGuideFile($guideName, $guideData);
            return true; // Ambas eliminaciones fueron exitosas
        }
    
        return false; // Algún paso falló, ya sea la eliminación del artwork o de los archivos
    }
    

    public function addOrUpdateArtwork(string $guideName): void
    {
        $artworkJson = $_POST['artwork'];
        $artworkData = json_decode($artworkJson, true);

        if (!$artworkData) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos de Artwork no válidos']);
            exit;
        }

        $guideData = $this->readGuideFile($guideName);
        $id = $artworkData['artwork']['id'] ?? null;

        if ($id === null) {
            http_response_code(400);
            echo json_encode(['error' => 'ID de Artwork no proporcionado']);
            exit;
        }

        $existingArtwork = $guideData[$id] ?? null;
        if ($existingArtwork) {
            $prevId = $existingArtwork['prev'];
            $nextId = $existingArtwork['next'];
        }
        
        $guideData['artworks'][$id] = $artworkData;
        $this->saveGuideFile($guideName, $guideData);

        echo json_encode(['message' => 'Artwork añadido o actualizado correctamente']);
    }
}
