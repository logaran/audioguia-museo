<?php

class GuideController
{
    private $dataDir = __DIR__ . '/../data/guides/';

    private function readGuideFile(string $filename): mixed
    {
        $filePath = $this->dataDir . $filename;
        if (!file_exists($filePath)) {
            return null;
        }
        $data = file_get_contents($filePath);
        return json_decode($data, true) ?: null;
    }

    private function saveGuideFile(string $filename, array $guideData): void
    {
        $filePath = $this->dataDir . $filename;
        file_put_contents($filePath, json_encode($guideData, JSON_PRETTY_PRINT));
    }

    // Crear una nueva guía
    public function createGuide(string $name, array $guideData): array
    {
        $filename = uniqid() . '.json';
        $guideData['id'] = uniqid();
        $guideData['name'] = $name;
        $this->saveGuideFile($filename, $guideData);
        return $guideData;
    }

    // Editar una guía
    public function editGuide(string $id, array $updatedData): mixed
    {
        $filename = $id . '.json';
        $guide = $this->readGuideFile($filename);
        if ($guide) {
            $guide = array_merge($guide, $updatedData);
            $this->saveGuideFile($filename, $guide);
            return $guide;
        }
        return null; // Guía no encontrada
    }

    // Borrar una guía
    public function deleteGuide(string $id): bool
    {
        $filename = $id . '.json';
        $filePath = $this->dataDir . $filename;
        if (file_exists($filePath)) {
            unlink($filePath);
            return true;
        }
        return false; // Guía no encontrada
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

    // Obtener una guía por ID
    public function getGuide(string $id): mixed
    {
        $filename = $id . '.json';
        return $this->readGuideFile($filename);
    }
}
