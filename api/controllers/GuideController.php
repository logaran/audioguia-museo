<?php

class GuideController
{
    private $dataDir = __DIR__ . '/../data/guides/';
    private $filename = 'desnudos.json';

    private function readGuideFile(): mixed
    {
        $filePath = "{$this->dataDir}{$this->filename}";
        if (!file_exists(filename: $filePath)) {
            return null;
        }
        $data = file_get_contents(filename: $filePath);
        return json_decode(json: $data, associative: true) ?: null;
    }

    private function saveGuideFile(array $guideData): void
    {
        $filePath = "{$this->dataDir}{$this->filename}";
        error_log(json_encode($guideData, JSON_PRETTY_PRINT));
        file_put_contents($filePath, json_encode($guideData, JSON_PRETTY_PRINT));
    }

    // Listar todas las guías
    public function listGuides(): array
    {
        $guides = [];
        foreach (glob(pattern: $this->dataDir . '*.json') as $filepath) {
            $guide = json_decode(file_get_contents($filepath), true);
            if ($guide) {
                $guides[] = $guide;
            }
        }
        return $guides;
    }

    // Eliminar obra de la guía

    public function deleteArtwork($id): bool
    {
        $guideData = $this->readGuideFile();
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

        $this->saveGuideFile($guideData);
        return true;
    }

}
