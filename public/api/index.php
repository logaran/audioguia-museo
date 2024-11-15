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

$guideName = $segments[1] ?? null;
$dataDir = "./data/guides/{$guideName}/";


if (!$guideName) {
    http_response_code(400);
    echo json_encode(['error' => 'No se especificó el nombre de la guía.']);
    exit;
}

if (!file_exists("{$dataDir}{$guideName}.json")) {
    http_response_code(404);
    echo json_encode([
        'error' => 'Guía no encontrada.',
        'guideName' => $guideName,
        'dataDir'=>$dataDir
    ]);
    exit;
}

$controller = new GuideController($dataDir);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $guide = $controller->getGuide($guideName);
        if ($guide) {
            echo json_encode($guide);
        } else {
            http_response_code(404);
            echo json_encode([
                'error' => 'Guía no encontrada.',
                'guideName' => $guideName,
                'dataDir'=>$dataDir
            ]);
        }
        exit;

    case 'DELETE':
        $id = basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
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
        $controller->addOrUpdateArtwork($guideName);
        exit;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        exit;
}
