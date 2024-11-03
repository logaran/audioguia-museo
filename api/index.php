<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


require_once './controllers/GuideController.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($uri, '/'));
$guideName = $segments[0] ?? null;

if (!$guideName) {
    http_response_code(400);
    echo json_encode(['error' => 'No se especificó el nombre de la guía.']);
    exit;
}
$dataDir = "./data/guides/{$guideName}/";
$dataFile = "{$dataDir}{$guideName}.json";

$guide = json_decode(file_get_contents($dataFile));

if (!$guide) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al leer el archivo de guía.']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'DELETE':
        $id = basename((parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));
        $controller = new GuideController($dataDir);
        $result = $controller->deleteArtwork($id, $guideName);

        if ($result) {
            http_response_code(204);
            echo json_encode(['message' => 'Obra eliminada con éxito']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Obra no encontrada']);
        }
        exit;
    case 'POST':
        $controller = new GuideController($dataDir);
        $result = $controller->addOrUpdateArtwork($guideName);
}
echo json_encode($guide);
