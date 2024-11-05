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
       
        if(!isset($guideData['artworks'][$id])) {
            return false;
        }

        $artworkToDelete = $guideData['artworks'][$id];
        $prevId = $artworkToDelete['prev'];
        $nextId = $artworkToDelete['next'];

        if ($prevId !== null && isset($guideData['artworks'][$prevId])) {
            $guideData['artworks'][$prevId]['next'] = $nextId;
        }
    
        if ($nextId !== null && isset($guideData['artworks'][$nextId])) {
            $guideData['artworks'][$nextId]['prev'] = $prevId;
        }

        unset($guideData['artworks'][$id]);

        $this->saveGuideFile($guideName, $guideData);
        return true;
    }

    public function addOrUpdateArtwork(string $guideName): void
    {
        $artworkJson = $_POST['artwork'];
        $artworkData = json_decode($artworkJson, true);

        if(!$artworkData) {
            http_response_code(400);
            echo json_encode(['error'=> 'Datos de Artwork no válidos']);
            exit;
        }

        $guideData = $this->readGuideFile($guideName);
        $id = $artworkData['id'] ?? null;

        if ($id === null) {
            http_response_code(400);
            echo json_encode(['error' => 'ID de Artwork no proporcionado']);
            exit;
        }
        $guideData['artworks'][$id]['artwork'] = $artworkData;
        $this->saveGuideFile($guideName,$guideData);
        
        echo json_encode(['message' => 'Artwork añadido o actualizado correctamente']);
    }

}
