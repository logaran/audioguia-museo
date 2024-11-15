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
        if (!array_key_exists($id, $guideData['artworks'])) {
            $prev = $artworkData['prev'];
            $next = $artworkData['next'];

            if (!empty($next) && array_key_exists($next, $guideData['artworks'])) {
                $guideData['artworks'][$next]['prev'] = $id;
            }

            if (!empty($prev) && array_key_exists($prev, $guideData['artworks'])) {
                $guideData['artworks'][$prev]['next'] = $id;
            }
        }


        $guideData['artworks'][$id] = $artworkData;

        if (isset($_FILES['imageFileEs']) && $_FILES['imageFileEs']['error'] === UPLOAD_ERR_OK) {
            $imagePathEs = "{$this->dataDir}images/es/{$id}.jpg";
            if (file_exists($imagePathEs)) unlink($imagePathEs);
            if (!move_uploaded_file($_FILES['imageFileEs']['tmp_name'], $imagePathEs)) {
                http_response_code(400);
                echo json_encode(['error' => 'Error al subir el archivo de imagen (es)']);
                exit;
            }
        }

        if (isset($_FILES['imageFileEn']) && $_FILES['imageFileEn']['error'] === UPLOAD_ERR_OK) {
            $imagePathEn = "{$this->dataDir}images/en/{$id}.jpg";
            if (file_exists($imagePathEn)) unlink($imagePathEn);
            if (!move_uploaded_file($_FILES['imageFileEn']['tmp_name'], $imagePathEn)) {
                http_response_code(400);
                echo json_encode(['error' => 'Error al subir el archivo de imagen (en)']);
                exit;
            }
        }

        if (isset($_FILES['audioFileEs']) && $_FILES['audioFileEs']['error'] === UPLOAD_ERR_OK) {
            $audioPathEs = "{$this->dataDir}audios/es/{$id}.mp3";
            if (file_exists($audioPathEs)) unlink($audioPathEs);
            if (!move_uploaded_file($_FILES['audioFileEs']['tmp_name'], $audioPathEs)) {
                http_response_code(400);
                echo json_encode(['error' => 'Error al subir el archivo de audio (es)']);
                exit;
            }
        }

        if (isset($_FILES['audioFileEn']) && $_FILES['audioFileEn']['error'] === UPLOAD_ERR_OK) {
            $audioPathEn = "{$this->dataDir}audios/en/{$id}.mp3";
            if (file_exists($audioPathEn)) unlink($audioPathEn);
            if (!move_uploaded_file($_FILES['audioFileEn']['tmp_name'], $audioPathEn)) {
                http_response_code(400);
                echo json_encode(['error' => 'Error al subir el archivo de audio (en)']);
                exit;
            }
        }

        $this->saveGuideFile($guideName, $guideData);

        echo json_encode(['message' => 'Artwork añadido o actualizado correctamente']);
    }
}
